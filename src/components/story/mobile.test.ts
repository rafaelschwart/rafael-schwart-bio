import { act, render, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { createElement, type RefObject } from "react"
import { COMPACT_VIEWPORT_QUERY, useCompactViewport } from "./mobile"
import { useParallax, useProgress, useYearRail } from "./motion"
import { Story } from "./Story"

afterEach(() => {
  delete (SVGElement.prototype as SVGElement & { getTotalLength?: () => number }).getTotalLength
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

  it("pauses playing media and clears parallax when a mounted Story becomes compact", async () => {
    let compactListener: ((event: MediaQueryListEvent) => void) | undefined
    const compactMedia = {
      matches: false,
      media: COMPACT_VIEWPORT_QUERY,
      onchange: null,
      addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
        compactListener = listener
      }),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
    const reducedMedia = {
      ...compactMedia,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => query === COMPACT_VIEWPORT_QUERY ? compactMedia : reducedMedia),
    )

    class Observer {
      static instances: Observer[] = []
      readonly targets: Element[] = []

      constructor(private readonly callback: IntersectionObserverCallback) {
        Observer.instances.push(this)
      }

      observe = (target: Element) => {
        this.targets.push(target)
      }
      unobserve = (target: Element) => {
        const index = this.targets.indexOf(target)
        if (index >= 0) this.targets.splice(index, 1)
      }
      disconnect = vi.fn()
      takeRecords = () => []
      root = null
      rootMargin = "0px"
      thresholds = [0]

      enter(target: Element) {
        this.callback([{ target, isIntersecting: true } as IntersectionObserverEntry], this)
      }
    }
    vi.stubGlobal("IntersectionObserver", Observer)
    Object.defineProperty(SVGElement.prototype, "getTotalLength", {
      configurable: true,
      value: () => 100,
    })

    vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function () {
      this.dataset.playback = "playing"
      return Promise.resolve()
    })
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function () {
      this.dataset.playback = "paused"
    })

    window.history.replaceState(null, "", "/#record")
    render(createElement(Story))

    const workflow = document.querySelector<HTMLVideoElement>(
      'video[src="/assets/story/fde-workflow.mp4"]',
    )
    const parallaxImage = document.querySelector<HTMLElement>("[data-parallax]")
    expect(workflow).toBeInTheDocument()
    expect(parallaxImage?.style.transform).toMatch(/^translate3d\(/)

    const videoObserver = Observer.instances.find((observer) => observer.targets.includes(workflow!))
    expect(videoObserver).toBeDefined()
    await act(async () => videoObserver?.enter(workflow!))
    expect(workflow?.dataset.playback).toBe("playing")

    act(() => {
      compactMedia.matches = true
      compactListener?.({ matches: true } as MediaQueryListEvent)
    })

    expect.soft(workflow?.dataset.playback).toBe("paused")
    expect.soft(parallaxImage?.style.transform).toBe("")
  })
})
