/**
 * NOTEBOOK ITERATION — a design exploration of the V2 ledger, restaged as a
 * spiral-bound engineer's field notebook.
 *
 * Local-only: mounted at /notebook, imported by nothing else. The live landing
 * (`components/landing/*`) is untouched — this reads the same `landing/data.ts`
 * so the two never drift on facts.
 *
 * Structure: one continuous scroll of dated "entries" instead of the tabbed
 * views, with the section rhythm carried by paper → paper-soft → ink spreads.
 */

import { useEffect, useRef } from "react"
import { ANNOUNCE, EMAIL, footer as footerData } from "@/components/landing/data"
import { useCounters, useReveal } from "@/components/landing/motion"
import { Cover, IndustryTape, TheMethod, TheNumbers, TheStory } from "./EntriesA"
import {
  PastedProof,
  TheClose,
  TheCurriculum,
  TheLog,
  TheSheet,
  WhatItIsnt,
} from "./EntriesB"
import { NbCta } from "./NbAtoms"
import "./notebook.css"

const CAVEAT_HREF =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap"

const NAV = [
  { id: "story", label: "Story" },
  { id: "numbers", label: "Numbers" },
  { id: "method", label: "Method" },
  { id: "log", label: "Log" },
  { id: "proof", label: "Proof" },
  { id: "credentials", label: "Credentials" },
  { id: "work", label: "Work" },
]

/**
 * Loads Caveat (the handwritten annotation face) only while this page is
 * mounted, so index.html keeps its canonical Satoshi + IBM Plex Mono head.
 */
function useCaveat() {
  useEffect(() => {
    if (document.querySelector(`link[href="${CAVEAT_HREF}"]`)) return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = CAVEAT_HREF
    document.head.appendChild(link)
    return () => {
      link.remove()
    }
  }, [])
}

export function Notebook() {
  const rootRef = useRef<HTMLDivElement>(null)

  useCaveat()
  useReveal(rootRef, [])
  useCounters(rootRef, [])

  useEffect(() => {
    document.title = "Notebook — Rafael Schwart, Senior Operations Program Manager (NPI)"
  }, [])

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - 78
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <div ref={rootRef} className="nb nb-paper">
      <div className="nb-rail" aria-hidden />
      <div className="nb-margin-rule" aria-hidden />

      <div className="nb-page">
        {/* ---------------------------------------------- announce strip --- */}
        <div
          role="status"
          style={{
            background: "var(--signal)",
            color: "#fff",
            textAlign: "center",
            padding: "9px 16px",
            fontFamily: "var(--fmono)",
            fontSize: 11.5,
            letterSpacing: ".08em",
          }}
        >
          ● {ANNOUNCE}
        </div>

        {/* --------------------------------------------------------- nav --- */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            background: "color-mix(in srgb, var(--paper) 92%, transparent)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "12px clamp(20px, 4vw, 56px)",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <a
              href="/"
              style={{
                fontFamily: "var(--fmono)",
                fontSize: 13,
                letterSpacing: "0.06em",
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "none",
                flex: "none",
              }}
            >
              rs<span style={{ color: "var(--signal)" }}>_</span>notebook
            </a>

            <nav
              style={{
                display: "flex",
                gap: 4,
                overflowX: "auto",
                flex: 1,
                scrollbarWidth: "none",
              }}
              className="rail"
              aria-label="Notebook entries"
            >
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => jump(n.id)}
                  style={{
                    background: "transparent",
                    border: 0,
                    padding: "8px 10px",
                    fontFamily: "var(--fmono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--mute)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="nb-nav-cta" style={{ flex: "none" }}>
              <NbCta href={`mailto:${EMAIL}`}>Get in touch</NbCta>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------ entries --- */}
        <main>
          <Cover />
          <IndustryTape />
          <TheStory />
          <TheNumbers />
          <TheMethod />
          <WhatItIsnt />
          <TheLog />
          <PastedProof />
          <TheSheet />
          <TheCurriculum />
          <TheClose />
        </main>

        {/* ------------------------------------------------------- footer --- */}
        <footer style={{ background: "var(--ink)", padding: "34px 0 42px" }}>
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "0 clamp(20px, 4vw, 56px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--fmono)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--paper)",
                }}
              >
                rs<span style={{ color: "var(--signal)" }}>_</span>
              </span>
              <span
                className="nb-stamp"
                style={{ color: "var(--fade)", fontSize: 10 }}
              >
                Notebook closed
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--fmono)",
                fontSize: 11.5,
                letterSpacing: "0.06em",
                color: "rgba(245,243,236,0.5)",
              }}
            >
              {footerData.copyright} · {footerData.tagline} ·{" "}
              <a href="/" style={{ color: "rgba(245,243,236,0.72)" }}>
                Back to the live site
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
