# Mobile Portfolio Optimization Spec

## Approved direction

Optimize the portfolio only for viewports at or below 860px. The existing desktop layout, visual hierarchy, copy, and behavior above 860px are a regression boundary and must remain visually unchanged.

## Experience goals

- Make the first phone viewport immediately useful to a recruiter: name, current Motorola NPI role, two proof metrics, and Email/Resume actions.
- Keep the ruled-paper notebook identity, ink palette, signal blue, tape, mono labels, and hard shadows.
- Replace the wrapped nine-entry sticky rail on mobile with a compact 52px section bar and an accessible two-column entries panel.
- Use true phone layouts through 599px and compact-tablet compositions from 600px through 860px.
- Eliminate clipping at 320px, including Shipped metrics and Record role cards.
- Keep every primary interactive target at least 44px high on mobile.
- Make prose readable without scroll-linked low-contrast effects on mobile.
- Avoid automatic looping video on mobile; meaningful video starts only after user action and decorative video remains a poster.

## Performance goals

- Serve responsive mobile portrait assets no larger than 720px wide while retaining the original JPEG path for desktop.
- Do not eagerly load media belonging to an inactive section on mobile.
- Disable desktop-only year-rail, parallax, and reading-progress work on mobile.
- Avoid per-word reveal listeners and spans on mobile while keeping all narrative text in the DOM.
- Remove unused root providers and lazy-load non-home routes when that does not change desktop presentation.

## Accessibility goals

- Expose the active section with `aria-current` and announce section changes.
- Move focus to the main content after a mobile section change.
- Add a skip link and a stable page-level accessible heading.
- Use truthful navigation/button semantics for the Record era selector.
- Use a focus-contained Radix dialog while preserving the dossier styling.
- Meet normal-text contrast and visible-focus requirements.

## Verification widths

- Phones: 320, 360, 390, and 430px.
- Compact tablet: 768px.
- Desktop regression boundary: 1024 and 1440px, plus a CSS/behavior check immediately above 860px.

