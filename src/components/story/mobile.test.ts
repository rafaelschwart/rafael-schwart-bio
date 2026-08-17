import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import type { RefObject } from "react"
import { COMPACT_VIEWPORT_QUERY, useCompactViewport } from "./mobile"
import { useParallax, useProgress, useYearRail } from "./motion"

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe("useCompactViewport", () => {
  it("updates from the compact media query and removes its change subscription", () => {
    let changeListener: ((event: MediaQueryListEvent) => void) | undefined
    const media = {
      matches: false,
      media: COMPACT_VIEWPORT_QUERY,
      onchange: null,
      addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
        changeListener = listener
      }),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
    vi.stubGlobal("matchMedia", vi.fn(() => media))

    const { result, unmount } = renderHook(() => useCompactViewport())

    expect(result.current).toBe(false)
    expect(media.addEventListener).toHaveBeenCalledWith("change", expect.any(Function))

    act(() => {
      media.matches = true
      changeListener?.({ matches: true } as MediaQueryListEvent)
    })
    expect(result.current).toBe(true)

    const subscribedListener = media.addEventListener.mock.calls[0][1]
    unmount()
    expect(media.removeEventListener).toHaveBeenCalledWith("change", subscribedListener)
  })
})

describe("compact motion gating", () => {
  it("does not install year rail, parallax, or reading-progress listeners when disabled", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        media: "(prefers-reduced-motion: reduce)",
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
    const host = document.createElement("div")
    const yearSection = document.createElement("section")
    yearSection.dataset.year = "2014"
    const parallaxItem = document.createElement("div")
    parallaxItem.dataset.parallax = "26"
    host.append(yearSection, parallaxItem)
    const root = { current: host } as RefObject<HTMLElement>
    const readout = { current: document.createElement("span") } as RefObject<HTMLElement>
    const addEventListener = vi.spyOn(window, "addEventListener")

    renderHook(() => {
      useYearRail(root, readout, [2014], false)
      useParallax(root, false)
      useProgress(root, false)
    })

    const installedWorkListeners = addEventListener.mock.calls.filter(
      ([type]) => type === "scroll" || type === "resize",
    )
    expect(installedWorkListeners).toHaveLength(0)
  })
})
