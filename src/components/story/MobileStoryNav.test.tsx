import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import { MobileStoryNav } from "./MobileStoryNav"

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

afterEach(cleanup)

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
})
