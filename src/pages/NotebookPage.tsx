import { Notebook } from "@/components/notebook/Notebook"

/**
 * Local design iteration — the "field notebook" restaging of the V2 ledger.
 * Lives at /notebook and is intentionally NOT in VALID_SECTIONS, the sitemap,
 * or llms.txt: it's an exploration, not a published section of the site.
 */
const NotebookPage = () => <Notebook />

export default NotebookPage
