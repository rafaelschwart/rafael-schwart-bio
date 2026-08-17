"""
Rebuild the site favicon: the `rs` monogram on an ink plate.

Paper letters in IBM Plex Mono Bold — the site's technical voice, the same face
as the `rs · v03-story` version stamps — sitting above the signal-blue rule that
runs under headings throughout the design system. It replaced Lovable's default
gradient heart, which had nothing to do with the site.

Writes per-size artwork rather than downscaling one master: at 16 and 24px the
signal rule costs more legibility than it adds meaning, so those frames drop it
and set the letters larger. Pillow's ICO writer collapses `append_images` to a
single frame, so the container is written by hand — a plain ICONDIR plus one
ICONDIRENTRY per size, with PNG payloads (supported by every current browser).

Outputs:
    public/favicon.ico          16 / 24 / 32 / 48 / 64 / 128 / 256
    public/apple-touch-icon.png 180
    public/icon-512.png         512

Run with system Python (needs Pillow). The IBM Plex Mono Bold TTF is fetched
from the IBM/plex repo on first run and cached next to this script.

    python scripts/build_favicon.py
"""

import io
import os
import ssl
import struct
import urllib.request

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "IBMPlexMono-Bold.ttf")
FONT_URL = (
    "https://raw.githubusercontent.com/IBM/plex/master/packages/plex-mono/"
    "fonts/complete/ttf/IBMPlexMono-Bold.ttf"
)

# Straight from src/index.css
PAPER = (245, 243, 236)
INK = (10, 10, 10)
SIGNAL = (54, 100, 255)

ICO_SIZES = [16, 24, 32, 48, 64, 128, 256]
COMPACT_AT = 24  # at or below this, drop the rule and enlarge the letters


def ensure_font() -> str:
    if os.path.exists(FONT_PATH):
        return FONT_PATH
    ssl._create_default_https_context = ssl._create_unverified_context
    req = urllib.request.Request(FONT_URL, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=60).read()
    if data[:4] not in (b"\x00\x01\x00\x00", b"true", b"OTTO"):
        raise SystemExit("downloaded font is not a TTF — check FONT_URL")
    with open(FONT_PATH, "wb") as fh:
        fh.write(data)
    return FONT_PATH


def mark(size: int, compact: bool = False) -> Image.Image:
    """One frame, rendered 8x and downsampled so the letterforms stay clean."""
    ss = size * 8
    im = Image.new("RGB", (ss, ss), INK)
    d = ImageDraw.Draw(im)

    scale = 0.72 if compact else 0.60
    centre_y = 0.50 if compact else 0.44

    font = ImageFont.truetype(ensure_font(), int(ss * scale))
    left, top, right, bottom = d.textbbox((0, 0), "rs", font=font)
    d.text(
        (ss * 0.50 - (right + left) / 2, ss * centre_y - (bottom + top) / 2),
        "rs",
        font=font,
        fill=PAPER,
    )

    if not compact:
        d.rectangle([ss * 0.22, ss * 0.735, ss * 0.78, ss * 0.815], fill=SIGNAL)

    return im.resize((size, size), Image.LANCZOS)


def write_ico(path: str) -> None:
    pngs = []
    for size in ICO_SIZES:
        buf = io.BytesIO()
        mark(size, compact=size <= COMPACT_AT).convert("RGBA").save(buf, "PNG", optimize=True)
        pngs.append(buf.getvalue())

    out = struct.pack("<HHH", 0, 1, len(ICO_SIZES))  # reserved, type=icon, count
    offset = 6 + 16 * len(ICO_SIZES)
    for size, payload in zip(ICO_SIZES, pngs):
        dim = 0 if size == 256 else size  # 0 means 256 in the ICO header
        out += struct.pack("<BBBBHHII", dim, dim, 0, 0, 1, 32, len(payload), offset)
        offset += len(payload)
    out += b"".join(pngs)

    with open(path, "wb") as fh:
        fh.write(out)


def main() -> None:
    public = os.path.join(ROOT, "public")
    ico = os.path.join(public, "favicon.ico")

    write_ico(ico)
    mark(180).save(os.path.join(public, "apple-touch-icon.png"), "PNG", optimize=True)
    mark(512).save(os.path.join(public, "icon-512.png"), "PNG", optimize=True)

    frames = sorted(Image.open(ico).info["sizes"])
    print("favicon.ico        ", frames, os.path.getsize(ico) // 1024 + 1, "KB")
    for name in ("apple-touch-icon.png", "icon-512.png"):
        p = os.path.join(public, name)
        print(f"{name:19}", Image.open(p).size, os.path.getsize(p) // 1024 + 1, "KB")


if __name__ == "__main__":
    main()
