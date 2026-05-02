import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef, ReactNode } from "react"

/**
 * Shared landing-page atoms — buttons, pills, eyebrow labels, section heads.
 * Written outside shadcn so the inset-shadow CTA + cream/charcoal palette is
 * exact to the design package without fighting Button's variant defaults.
 */

type BtnVariant = "dark" | "ghost" | "cream"
type BtnSize = "default" | "sm"

interface BtnAnchorProps extends ComponentPropsWithoutRef<"a"> {
  variant?: BtnVariant
  size?: BtnSize
}

const btnBase =
  "inline-flex items-center gap-2 rounded-md font-normal no-underline transition-opacity duration-100 ease-out cursor-pointer"
const btnVariant: Record<BtnVariant, string> = {
  dark: "bg-charcoal text-offwhite shadow-inset-btn hover:opacity-90 active:opacity-80",
  ghost:
    "bg-transparent text-charcoal border border-[hsl(var(--foreground)/0.4)] hover:opacity-80",
  cream: "bg-cream text-charcoal border border-border-soft hover:opacity-80",
}
const btnSize: Record<BtnSize, string> = {
  default: "px-[17px] py-[9px] text-base leading-6",
  sm: "px-3 py-1.5 text-sm",
}

export function Btn({
  variant = "dark",
  size = "default",
  className,
  children,
  ...rest
}: BtnAnchorProps) {
  return (
    <a className={cn(btnBase, btnVariant[variant], btnSize[size], className)} {...rest}>
      {children}
    </a>
  )
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="meta-pill">{children}</span>
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow mb-3.5", className)}>{children}</p>
}

interface SectionHeadProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
}

export function SectionHead({ eyebrow, title, lead }: SectionHeadProps) {
  return (
    <div className="mb-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display-h2 text-charcoal">{title}</h2>
      {lead ? <p className="lead mt-3.5 max-w-[640px]">{lead}</p> : null}
    </div>
  )
}

interface SectionProps {
  id: string
  surface:
    | "cream"
    | "peach"
    | "sage"
    | "ivory"
    | "clay"
    | "slate"
    | "dark"
    | "transparent"
  className?: string
  children: ReactNode
}

const surfaceClass: Record<SectionProps["surface"], string> = {
  cream: "bg-surface-cream",
  peach: "bg-surface-peach",
  sage: "bg-surface-sage",
  ivory: "bg-surface-ivory",
  clay: "bg-surface-clay",
  slate: "bg-surface-slate",
  dark: "bg-surface-dark text-offwhite",
  transparent: "",
}

export function Section({ id, surface, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 scroll-mt-20",
        surfaceClass[surface],
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-8">{children}</div>
    </section>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="px-3 py-1.5 text-sm rounded-full bg-cream border border-border-soft text-charcoal">
      {children}
    </span>
  )
}
