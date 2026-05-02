"""Vectorize Rafael_Schwart_Profile.pdf into Pinecone serverless index `rafaels-bio`.

Uses Pinecone's integrated embedding (multilingual-e5-large hosted server-side):
  - Create index with model attached
  - Upsert raw text records via `upsert_records` (server embeds for us)
  - No need to manage embedding dimensions or run a model locally

API key: read from PINECONE_API_KEY env var. NEVER hardcoded.
"""
import os
import re
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
from pinecone import Pinecone
from pinecone.exceptions import NotFoundException
from pypdf import PdfReader

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

PDF_PATH = PROJECT_ROOT / "profile" / "Rafael_Schwart_Profile.pdf"
INDEX_NAME = "rafaels-bio"
NAMESPACE = "Biography"
EMBED_MODEL = "multilingual-e5-large"

API_KEY = os.environ.get("PINECONE_API_KEY")
if not API_KEY:
    sys.exit("PINECONE_API_KEY not set — add it to .env in the project root")


def extract_pages(pdf_path: Path) -> list[str]:
    reader = PdfReader(str(pdf_path))
    return [p.extract_text() or "" for p in reader.pages]


def chunk_text(full_text: str, target_words: int = 220) -> list[dict]:
    """Split into ~target_words chunks at paragraph/section boundaries.

    multilingual-e5-large has a 512-token input limit; ~220 words ≈ 300 tokens
    leaves headroom for the e5 'passage:' prefix.
    """
    # Normalize whitespace
    text = re.sub(r"\n{3,}", "\n\n", full_text)
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]

    chunks, current, current_words = [], [], 0
    current_section = "Cover"

    section_re = re.compile(r"^(Professional Summary|Mission|Contact|Education|"
                            r"Experience.*|Skills|Certifications|Side Projects.*|"
                            r"Professional References|Employment Verification|"
                            r"Resume|Live Website Sections|About this document)",
                            re.IGNORECASE)

    for para in paragraphs:
        # Track section headers for metadata
        first_line = para.split("\n", 1)[0].strip()
        m = section_re.match(first_line)
        if m and len(first_line) < 80:
            # Flush current chunk before starting a new section
            if current:
                chunks.append({"section": current_section, "text": "\n\n".join(current)})
                current, current_words = [], 0
            current_section = m.group(1)

        words = len(para.split())
        if current_words + words > target_words and current:
            chunks.append({"section": current_section, "text": "\n\n".join(current)})
            current, current_words = [], 0
        current.append(para)
        current_words += words

    if current:
        chunks.append({"section": current_section, "text": "\n\n".join(current)})

    return chunks


def main() -> None:
    print(f"Reading {PDF_PATH.name} ...")
    pages = extract_pages(PDF_PATH)
    full_text = "\n\n".join(pages)
    print(f"  {len(pages)} pages, {len(full_text):,} chars")

    chunks = chunk_text(full_text)
    print(f"  Chunked into {len(chunks)} segments")

    pc = Pinecone(api_key=API_KEY)

    # Create the integrated-embedding index if missing
    existing = [idx.name for idx in pc.list_indexes()]
    if INDEX_NAME in existing:
        print(f"Index '{INDEX_NAME}' already exists — reusing")
    else:
        print(f"Creating index '{INDEX_NAME}' with model '{EMBED_MODEL}' ...")
        pc.create_index_for_model(
            name=INDEX_NAME,
            cloud="aws",
            region="us-east-1",
            embed={
                "model": EMBED_MODEL,
                "field_map": {"text": "text"},
            },
        )
        # Wait until ready
        while True:
            desc = pc.describe_index(INDEX_NAME)
            if desc.status.get("ready"):
                break
            print("  ...waiting for index to be ready")
            time.sleep(3)
        print("  Index ready")

    index = pc.Index(INDEX_NAME)

    records = []
    for i, c in enumerate(chunks):
        records.append({
            "_id": f"profile-chunk-{i:03d}",
            "text": c["text"],
            "section": c["section"],
            "source": "Rafael_Schwart_Profile.pdf",
            "chunk_index": i,
            "word_count": len(c["text"].split()),
        })

    print(f"Upserting {len(records)} records to namespace '{NAMESPACE}' ...")
    # Pinecone upsert_records caps batch size; we're well under it
    BATCH = 96
    for i in range(0, len(records), BATCH):
        batch = records[i:i + BATCH]
        index.upsert_records(NAMESPACE, batch)
        print(f"  upserted {i + len(batch)}/{len(records)}")

    # Wait for vector visibility
    print("Waiting for vectors to be indexed ...")
    target = len(records)
    for _ in range(30):
        stats = index.describe_index_stats()
        ns_count = stats.get("namespaces", {}).get(NAMESPACE, {}).get("vector_count", 0)
        if ns_count >= target:
            break
        time.sleep(2)
    print(f"  Namespace '{NAMESPACE}' vector count: {ns_count}")

    # Smoke-test query
    print("\nSmoke test — searching: 'Where did Rafael work on AR optical devices?'")
    results = index.search(
        namespace=NAMESPACE,
        query={
            "inputs": {"text": "Where did Rafael work on AR optical devices?"},
            "top_k": 3,
        },
        fields=["section", "text"],
    )
    for hit in results.result.hits:
        section = hit.fields.get("section", "?")
        snippet = hit.fields.get("text", "")[:200].replace("\n", " ")
        print(f"  [{hit._score:.3f}] {section} — {snippet}...")

    print("\nDone.")
    print(f"  Index:     {INDEX_NAME}")
    print(f"  Namespace: {NAMESPACE}")
    print(f"  Records:   {target}")
    print(f"  Model:     {EMBED_MODEL} (1024 dim, hosted by Pinecone)")


if __name__ == "__main__":
    main()
