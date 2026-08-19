/**
 * Brand marks used inside buttons.
 *
 * Drawn as glyph-only paths that inherit `currentColor`, so a mark sits on the
 * signal, ink or paper CTA without carrying its own brand colour into the
 * palette — the site's one blue stays the site's blue.
 */

/** The LinkedIn "in" glyph, without its enclosing rounded square. */
export function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
      <path d="M5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125z" />
      <path d="M7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  )
}
