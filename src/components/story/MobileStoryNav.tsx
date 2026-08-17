import { useEffect, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export type MobileStoryNavItem = {
  id: string
  label: string
  index?: string | number
}

type MobileStoryNavProps = {
  items: MobileStoryNavItem[]
  activeId: string
  onSelect: (id: string) => void
}

export function MobileStoryNav({ items, activeId, onSelect }: MobileStoryNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeItem = items.find((item) => item.id === activeId)

  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [isOpen])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <nav
      className="st-mobile-index"
      aria-label="Entries"
      style={{ position: "sticky", top: 0, zIndex: 30 }}
    >
      <div
        style={{
          minHeight: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "0 18px",
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule-strong)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--fmono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--mute)",
          }}
        >
          {activeItem?.index ?? "01"} / {activeItem?.label ?? "Cover"}
        </span>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              style={{
                minHeight: 44,
                padding: "0 14px",
                background: "var(--paper-soft)",
                border: "1px solid var(--ink)",
                boxShadow: "2px 2px 0 var(--ink)",
                color: "var(--ink)",
                cursor: "pointer",
                fontFamily: "var(--fmono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Entries
            </button>
          </CollapsibleTrigger>
      </div>

        {isOpen && (
          <CollapsibleContent
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 8,
              padding: 12,
              background: "var(--paper-soft)",
              borderBottom: "1px solid var(--rule-strong)",
            }}
          >
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.id === activeId ? "page" : undefined}
                onClick={() => {
                  onSelect(item.id)
                  setIsOpen(false)
                }}
                style={{
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  background: item.id === activeId ? "var(--signal)" : "var(--paper)",
                  border: "1px solid var(--ink)",
                  color: item.id === activeId ? "#fff" : "var(--ink)",
                  cursor: "pointer",
                  fontFamily: "var(--fmono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  textAlign: "left",
                }}
              >
                {item.index && <span aria-hidden>{item.index}</span>}
                {item.label}
              </button>
            ))}
          </CollapsibleContent>
        )}
      </nav>
    </Collapsible>
  )
}
