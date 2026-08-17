import { cleanup, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { MobileStoryNav } from "./MobileStoryNav"
import { Story } from "./Story"
import { CompanyModal } from "./StoryAtoms"

const items = [
  { id: "cover", label: "Cover", index: "01" },
  { id: "forward", label: "Forward deployed", index: "02" },
  { id: "record", label: "The record", index: "03" },
  { id: "shipped", label: "Shipped", index: "04" },
  { id: "method", label: "Method", index: "05" },
  { id: "credentials", label: "Credentials", index: "06" },
  { id: "references", label: "Proof", index: "07" },
  { id: "ventures", label: "Ventures", index: "08" },
  { id: "contact", label: "Contact", index: "09" },
]

const setViewport = (compact: boolean) => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query === "(max-width: 860px)" ? compact : query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

afterEach(() => {
  cleanup()
  window.history.replaceState(null, "", "/")
  vi.unstubAllGlobals()
})

describe("MobileStoryNav", () => {
  it("shows every entry and marks the active entry after opening the panel", async () => {
    const user = userEvent.setup()

    render(<MobileStoryNav items={items} activeId="record" onSelect={() => undefined} />)

    await user.click(screen.getByRole("button", { name: "Entries" }))

    for (const item of items) {
      expect(screen.getByRole("button", { name: item.label })).toBeVisible()
    }
    expect(screen.getByRole("button", { name: "The record" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  it("selects an entry and closes the panel", async () => {
    const user = userEvent.setup()
    const selected: string[] = []

    render(<MobileStoryNav items={items} activeId="cover" onSelect={(id) => selected.push(id)} />)

    await user.click(screen.getByRole("button", { name: "Entries" }))
    await user.click(screen.getByRole("button", { name: "The record" }))

    expect(selected).toEqual(["record"])
    expect(screen.queryByRole("button", { name: "The record" })).not.toBeInTheDocument()
  })

  it("closes its entry panel with Escape", async () => {
    const user = userEvent.setup()

    render(<MobileStoryNav items={items} activeId="cover" onSelect={() => undefined} />)

    await user.click(screen.getByRole("button", { name: "Entries" }))
    await user.keyboard("{Escape}")

    expect(screen.queryByRole("button", { name: "The record" })).not.toBeInTheDocument()
  })

  it("keeps the entry panel out of view while closed and visible while open", async () => {
    const user = userEvent.setup()

    render(<MobileStoryNav items={items} activeId="cover" onSelect={() => undefined} />)

    const entries = screen.getByRole("button", { name: "Entries" })
    const panelId = entries.getAttribute("aria-controls")
    expect(entries).toHaveAttribute("data-state", "closed")
    expect(document.getElementById(panelId ?? "")).not.toBeInTheDocument()

    await user.click(entries)

    expect(entries).toHaveAttribute("data-state", "open")
    expect(document.getElementById(panelId ?? "")).toBeVisible()

    await user.click(entries)

    const closedPanel = document.getElementById(panelId ?? "")
    if (closedPanel) expect(closedPanel).not.toBeVisible()
  })
})

describe("Story mobile cover", () => {
  it("serves compact recruiter details and both portrait sources while retaining an identifiable desktop rail", () => {
    setViewport(true)

    const { unmount } = render(<Story />)

    const summary = document.querySelector(".st-mobile-summary")
    expect(summary).toBeInTheDocument()
    expect(within(summary as HTMLElement).getByText("Rafael Schwart")).toBeVisible()
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(screen.getByRole("heading", { level: 1, name: "Rafael Schwart" })).toHaveClass("sr-only")
    expect(screen.getByText(/Senior Operations Program Manager, NPI at Motorola Solutions/)).toBeVisible()
    expect(screen.getByRole("link", { name: "Email" })).toBeVisible()
    expect(screen.getByRole("link", { name: "Resume" })).toBeVisible()
    const portrait = screen.getByRole("img", { name: "Rafael Schwart" })
    expect(
      portrait
        .closest("picture")
        ?.querySelector('source[type="image/webp"][srcset*="headshot-mobile-480.webp"]'),
    ).toBeInTheDocument()
    expect(
      portrait
        .closest("picture")
        ?.querySelector('source[type="image/webp"][srcset*="headshot-mobile-720.webp"]'),
    ).toBeInTheDocument()

    expect(document.querySelector(".st-word")).not.toBeInTheDocument()
    expect(screen.getByText(/I was born in Caracas/i)).toBeVisible()
    expect(document.querySelector('video[src="/assets/story/fde-workflow.mp4"]')).not.toBeInTheDocument()

    unmount()
    setViewport(false)
    render(<Story />)

    expect(document.querySelector(".st-desktop-index")).toBeInTheDocument()
    expect(document.querySelector(".st-word")).toBeInTheDocument()
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole("heading", { level: 2, name: /Twelve years of engineering/i }),
    ).toBeVisible()
  })

  it("makes meaningful mobile video user-initiated and decorative mobile video poster-only", () => {
    setViewport(true)
    window.history.replaceState(null, "", "/#forward")

    const { unmount } = render(<Story />)

    const workflow = screen.getByLabelText(/production line on the left/i)
    expect(workflow).toHaveAttribute("controls")
    expect(workflow).toHaveAttribute("preload", "none")

    unmount()
    window.history.replaceState(null, "", "/#contact")
    render(<Story />)

    const decorative = document.querySelector('video[poster="/assets/contact-loop-poster.jpg"]')
    expect(decorative).toBeInTheDocument()
    expect(decorative).not.toHaveAttribute("src")
  })

  it("uses native chapter buttons and identifies the current Record chapter", async () => {
    const user = userEvent.setup()
    setViewport(true)
    vi.stubGlobal("scrollTo", vi.fn())
    window.history.replaceState(null, "", "/#record")

    render(<Story />)

    const chapters = screen.getByRole("navigation", { name: "Chapters of the record" })
    const chapterButtons = within(chapters).getAllByRole("button")
    expect(chapterButtons).toHaveLength(6)
    expect(chapterButtons[0]).toHaveAttribute("aria-current", "step")
    expect(chapterButtons[0]).not.toHaveAttribute("role", "tab")
    expect(chapterButtons[0]).not.toHaveAttribute("aria-selected")

    await user.click(chapterButtons[1])

    expect(chapterButtons[0]).not.toHaveAttribute("aria-current")
    expect(chapterButtons[1]).toHaveAttribute("aria-current", "step")
  })
})

function DossierHarness() {
  const [company, setCompany] = useState<string | null>(null)
  return (
    <>
      <button type="button" onClick={() => setCompany("Motorola Solutions")}>Open dossier</button>
      <CompanyModal company={company} onClose={() => setCompany(null)} />
      <button type="button">Outside action</button>
    </>
  )
}

describe("Company dossier dialog", () => {
  it("contains keyboard focus and returns it to the trigger after Escape closes", async () => {
    const user = userEvent.setup()
    render(<DossierHarness />)

    const trigger = screen.getByRole("button", { name: "Open dossier" })
    await user.click(trigger)

    const dialog = screen.getByRole("dialog", { name: "Dossier · Motorola Solutions" })
    expect(dialog).toBeInTheDocument()

    const visit = screen.getByRole("link", { name: /Visit motorolasolutions.com/i })
    visit.focus()
    await user.tab()
    expect(screen.getByRole("button", { name: "Close dossier" })).toHaveFocus()

    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog", { name: "Dossier · Motorola Solutions" })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
