import { useEffect, useState } from "react"

export const COMPACT_VIEWPORT_QUERY = "(max-width: 860px)"

const getCompactViewport = () =>
  typeof window !== "undefined" && window.matchMedia(COMPACT_VIEWPORT_QUERY).matches

export function useCompactViewport(): boolean {
  const [isCompact, setIsCompact] = useState(getCompactViewport)

  useEffect(() => {
    const media = window.matchMedia(COMPACT_VIEWPORT_QUERY)
    const update = () => setIsCompact(media.matches)

    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return isCompact
}
