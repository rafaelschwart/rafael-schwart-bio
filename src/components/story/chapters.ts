/**
 * /story — the narrative spine for the V2 ledger.
 *
 * Same design system as the live landing (paper / ink / signal, Satoshi +
 * IBM Plex Mono). This file adds two things the landing doesn't have:
 *   1. an era grouping that puts the nine companies in chronological order
 *   2. the connective narrative that turns the record into a career story
 *
 * Every fact resolves from `landing/data.ts` — the eras reference real
 * Experience objects rather than restating them, so the two can't drift.
 */

import { experience, type Experience } from "@/components/landing/data"

export type Era = {
  id: string
  /** Ledger stamp: ERA 01 */
  no: string
  /** Era title, set in display type */
  title: string
  /** Year span on the stamp + rail */
  span: string
  /** The year the rail counter settles on */
  yearValue: number
  /** One-line mono standfirst */
  standfirst: string
  /** Narrative, revealed as the reader scrolls */
  passage: string[]
  /** Ledger plate for this era */
  plate: string
  plateAlt: string
  /** Mono caption stamped under the plate */
  plateLabel: string
  /** Companies in this era, resolved from landing/data.ts */
  companies: Experience[]
  /** Optional headline number pulled out of the record */
  metric?: { value: number; suffix: string; label: string }
}

const co = (name: string): Experience => {
  const e = experience.find((x) => x.company === name)
  if (!e) throw new Error(`Unknown company in story eras: ${name}`)
  return e
}

/* ------------------------------------------------------------- opening ---- */

export const opening = {
  eyebrow: "The record, in order",
  headline: "Twelve years of engineering,",
  headlineAccent: "in the order it happened.",
  sub: "I started on the bench designing aerospace fixtures and I am now running new product introduction at Motorola Solutions. This is the whole path: nine companies, six industries, and what each one taught me. Every claim on this page is verifiable, and the letters are linked at the bottom.",
  proof: ["PMP certified", "Six Sigma Green Belt", "9 companies · 6 industries"],
}

/* ------------------------------------------------- forward deployed ---- */

/**
 * Sits directly under the cover. This is the "what I'm doing now" answer —
 * the engineering discipline applied to business operations, and the AI
 * tooling that makes it ship fast. Placed before the career history because
 * it is the most current and most actionable thing a reader can engage.
 */
export const forwardDeployed = {
  no: "01",
  title: "Forward deployed engineering.",
  standfirst: "Arqentia · process engineering for small businesses, accelerated by AI",
  url: "https://arqentia.com/",
  urlLabel: "arqentia.com",
  passage: [
    "Most small companies run an operation nobody ever engineered. The real process lives in one person's head, and the hand-off between them quietly costs a day every week.",
    "That is the same problem I spent twelve years solving on production lines. The method transfers exactly — only the build speed changed.",
  ],
  /** How the hardware method maps onto an operation */
  method: [
    {
      k: "01",
      title: "Walk the line",
      desc: "Record the real process, workarounds included — not the org chart version.",
    },
    {
      k: "02",
      title: "Find the constraint",
      desc: "One step sets the pace for everything downstream. PFMEA and root cause find it.",
    },
    {
      k: "03",
      title: "Build it in place",
      desc: "Dashboards, automation and agents deployed inside the operation, not handed over as a spec.",
    },
    {
      k: "04",
      title: "Instrument it",
      desc: "A fix you cannot measure is an opinion. Control plans and live metrics.",
    },
  ],
  /** The working stack — named because fluency here is the differentiator */
  stack: {
    label: "The stack I build with",
    agents: ["Claude Code", "Codex", "Claude Cowork", "Devin", "Windsurf", "Antigravity", "VS Code"],
    automation: ["n8n", "workflow automation", "AI agents", "custom integrations"],
  },
  note: "engineering discipline + AI build speed ↓",
}

export const prologue = {
  no: "00",
  title: "Where it starts",
  standfirst: "Miami · the shop floor",
  passage: [
    "I was born in Caracas and I learned to build things in Miami. Not in a lab. In shops, next to machinists who had been cutting metal since before I was born and did not particularly care what my degree said.",
    "What they cared about was whether the part I drew could actually be made. That turned out to be the entire education, and everything after it is the same lesson at larger scale.",
  ],
}

/* ---------------------------------------------------------------- eras ---- */

export const eras: Era[] = [
  {
    id: "drawing",
    no: "01",
    title: "The drawing",
    span: "2014 — 2017",
    yearValue: 2014,
    standfirst: "Aerospace · a drawing is a promise",
    passage: [
      "My first job was designing large structural load fixtures for aerospace clients. Steel, welded, heavy enough that being wrong was expensive and obvious.",
      "A drawing is a promise you make to someone who is not in the room. They read it at two in the morning, on a shop floor, with gloves on, and they build exactly what you specified, including the part you got wrong.",
      "So I learned tolerances the way you learn a language you will be tested on in public. GD&T, FEA, CFD, and FAA compliance on fixtures that had to hold flight hardware without deflecting past a number someone else had signed. Three aerospace shops in three years, with no layers between the drawing and the consequence.",
    ],
    plate: "/assets/story/01-origin.webp",
    plateAlt:
      "A hand-drawn mechanical bracket on graph paper beside a steel rule and brass dividers",
    plateLabel: "Plate 01 · the bench",
    companies: [co("General MRO"), co("Prompt Aero"), co("Piece-makers")],
  },
  {
    id: "machine",
    no: "02",
    title: "The machine",
    span: "2017 — 2018",
    yearValue: 2017,
    standfirst: "Solar + automation · designing what makes the parts",
    passage: [
      "Then I stopped designing parts and started designing the machines that make parts.",
      "First solar: utility-scale tracking structures, the steel skeletons that hold panels to the sun across a field you cannot see the end of. Structural modeling, plus casting and welding process improvements, because at that scale a half-pound of material per unit is a budget line.",
      "Then high-speed bakery and packaging automation. Not glamorous, extremely instructive: a machine that runs all day without a person touching it forgives nothing you left vague. I optimized material usage with FEA and put SolidWorks PDM in place, so version control stopped being a conversation and became a system. That was the first time I fixed a process instead of a part.",
    ],
    plate: "/assets/story/04-solar.webp",
    plateAlt: "Rows of utility-scale solar tracker structures receding toward the horizon",
    plateLabel: "Plate 02 · utility scale",
    companies: [co("TerraSmart"), co("Robotray")],
  },
  {
    id: "line",
    no: "03",
    title: "The line",
    span: "2018 — 2019",
    yearValue: 2018,
    standfirst: "Boeing avionics · the first number I cared about",
    passage: [
      "At Gables I worked on test engineering and automation for Boeing avionics. Cockpit hardware, tested until the testing itself becomes the bottleneck.",
      "So I designed automated fixtures and cut test cycle times by more than half. That is the first number I ever cared about the way I care about numbers now, not because it looked good on a resume but because it changed what the team could do in a day.",
      "I also deployed a PDM system that fixed the engineering change workflow, so ECNs and ECOs stopped getting lost between people. I was still an engineer. I had started, without noticing, to think about throughput.",
    ],
    plate: "/assets/story/05-avionics.webp",
    plateAlt: "A loomed wiring harness with circular MIL-spec connectors on an avionics test panel",
    plateLabel: "Plate 03 · test & automation",
    metric: { value: 50, suffix: "%+", label: "faster test cycles on Boeing avionics" },
    companies: [co("Gables Engineering")],
  },
  {
    id: "robot",
    no: "04",
    title: "The robot",
    span: "2020 — 2023",
    yearValue: 2020,
    standfirst: "Medical robotics · where the tolerance is a person",
    passage: [
      "At Stryker I worked on robotic surgical assembly. Medical robotics is the first place I worked where the failure mode has a face.",
      "The engineering is not harder than aerospace. The discipline around it is heavier, and it should be: PPAP, supplier quality through SICR, and non-conformance and CAPA closed out on safety-critical assemblies, documented so they still make sense to a stranger in five years.",
      "I redesigned MAPs and used SolidWorks simulation to improve assembly quality and throughput, and ran Kaizen and 6S on the floor with the people doing the work. That is where I stopped seeing quality systems as paperwork. A control plan is an engineer's judgment written down, so it survives the engineer leaving the room.",
    ],
    plate: "/assets/story/06-robotics.webp",
    plateAlt: "A partially assembled robotic arm on a stainless steel bench, precision joints exposed",
    plateLabel: "Plate 04 · safety critical",
    companies: [co("Stryker")],
  },
  {
    id: "frontier",
    no: "05",
    title: "The frontier",
    span: "2023 — 2024",
    yearValue: 2023,
    standfirst: "Augmented reality · no precedent to copy",
    passage: [
      "Magic Leap was the first time I worked on something with no established way to build it.",
      "Aerospace has eighty years of precedent. Surgical robotics has a regulatory path worn smooth by everyone who went first. Next-generation AR optics has neither. You are holding tolerances that never had to coexist before, in a cleanroom, at a yield somebody already promised a board.",
      "I owned NPI for it: built PFMEA libraries from nothing, ran DFM reviews, ran Gauge R&R studies to find out which measurements we could actually trust, and optimized the cleanroom itself. Production efficiency went up fifteen percent. I also trained the production teams to take a pilot process to volume, which is the part I would put first if I were describing the job honestly.",
    ],
    plate: "/assets/story/07-optics.webp",
    plateAlt: "A precision optical waveguide element in an anodized mount under a blue rim light",
    plateLabel: "Plate 05 · optics & cleanroom",
    metric: { value: 15, suffix: "%", label: "production efficiency gain at Magic Leap" },
    companies: [co("Magic Leap")],
  },
  {
    id: "program",
    no: "06",
    title: "The program",
    span: "2024 — now",
    yearValue: 2024,
    standfirst: "Mission-critical comms · what the title actually changed",
    passage: [
      "I am now a Senior Operations Program Manager for new product introduction at Motorola Solutions, on mission-critical communications hardware. The radios that have to work when everything else has stopped working.",
      "The title says program manager. What changed is scope, not discipline. I still read the drawing and argue about the tolerance. I now also own the CAPEX and OPEX behind it, the PFMEA and process control plans, MES and MQS integration into global supply chain operations, and the contract manufacturers in Penang who build it.",
      "The engineering did not go away when the title changed. It moved further upstream, which is where it does the most good. Twelve years in, this is what I believe: most hardware programs do not fail on the physics, they fail in the space between people who each did their part correctly. I spend my time in that space now.",
    ],
    plate: "/assets/story/08-line.webp",
    plateAlt: "A tray of matte black industrial handheld radio housings in rows on an assembly line",
    plateLabel: "Plate 06 · ramp to volume",
    companies: [co("Motorola Solutions")],
  },
]

/* ------------------------------------------------------------- shipped ---- */

/**
 * Replaces the old counters spread. "10+ years / 9 companies / 3 active
 * certifications" told a reader nothing — every program manager has a version
 * of those numbers. This says what physically exists in the world because he
 * worked on it, which is the engineering claim, not the title claim.
 */
export const shipped = {
  no: "07",
  title: "Things that exist because I worked on them.",
  standfirst: "Six industries · the hardware, not the job titles",
  passage: [
    "Program management is the current title, not the point. The point is that these are real objects, built at volume, that someone is using right now.",
  ],
  items: [
    {
      thing: "Mission-critical radios",
      img: "/assets/companies/motorola-product.webp",
      where: "Motorola Solutions",
      detail: "The handsets first responders carry. I own the NPI path from pilot build to volume ramp.",
    },
    {
      thing: "AR headset optics",
      img: "/assets/companies/magicleap-product.webp",
      where: "Magic Leap",
      detail: "Waveguide assemblies with no manufacturing precedent. Built the PFMEA library from nothing.",
      metric: { value: 15, suffix: "%", label: "production efficiency" },
    },
    {
      thing: "Surgical robotics",
      img: "/assets/companies/stryker-product.webp",
      where: "Stryker",
      detail: "Robotic assembly where the failure mode has a face. MAPs redesign, PPAP, NC/CAPA closure.",
    },
    {
      thing: "Boeing avionics test rigs",
      img: "/assets/companies/gables-product.webp",
      where: "Gables Engineering",
      detail: "Automated fixtures for cockpit hardware, and the PDM system behind the change workflow.",
      metric: { value: 50, suffix: "%+", label: "faster test cycles" },
    },
    {
      thing: "Utility-scale solar structures",
      img: "/assets/companies/terrasmart-product.webp",
      where: "TerraSmart",
      detail: "Steel tracking structures across terrain you cannot see the end of. Casting and welding process work.",
    },
    {
      thing: "High-speed packaging lines",
      img: "/assets/companies/robotray-product.webp",
      where: "Robotray",
      detail: "Automation that runs all day untouched. FEA on material usage, SolidWorks PDM for version control.",
    },
    {
      thing: "Aerospace load fixtures",
      img: "/assets/companies/generalmro-product.webp",
      where: "General MRO · Prompt Aero · Piece-makers",
      detail: "FAA-compliant structural fixtures validated with FEA and CFD. Where the whole thing started.",
    },
  ],
  note: "seven industries, one method ↓",
}

/* -------------------------------------------------------- how I work ---- */

/**
 * The old "operating model" spread read like a stage-gate handout anyone
 * could have written. Reframed as the judgment behind the process — what he
 * actually believes, with the formal deliverables kept as supporting evidence
 * rather than the headline.
 */
export const howIWork = {
  no: "10",
  title: "How I actually work.",
  standfirst: "The judgment behind the process, not the process itself",
  passage: [
    "Every company has a stage-gate deck. Almost none of them survive contact with a real ramp, because a gate is only worth what the person holding it is willing to say no to.",
    "These are the four things I believe after twelve years of watching programs succeed and fail. The formal artifacts underneath them are real and I use them, but they are the tools, not the thinking.",
  ],
  principles: [
    {
      k: "01",
      title: "Find it on paper or pay for it at volume",
      desc: "A problem caught in a design review costs an afternoon. The same problem caught at ramp costs a quarter and a customer. I front-load the unglamorous work: work breakdown, a live risk register, PFMEA, control plans.",
      tools: "WBS · Risk register · PFMEA · Control plans",
    },
    {
      k: "02",
      title: "Trust the measurement before the number",
      desc: "Most yield arguments are really measurement arguments. Before anyone debates a result I want to know the gauge is capable, because half of the disputes disappear once you can prove what you measured.",
      tools: "Gauge R&R · MES / MQS · Fixture validation",
    },
    {
      k: "03",
      title: "Stay through the ramp",
      desc: "Pilot is the easy part. The interesting failures happen when volume exposes everything nobody wrote down, and that is precisely when the person who understands the design tends to have moved on. I do not.",
      tools: "PPAP · SICR · CM coordination · Yield tracking",
    },
    {
      k: "04",
      title: "Write it down so it outlives you",
      desc: "A control plan is an engineer's judgment, recorded, so it still works after that engineer leaves the room. That is the whole reason quality systems exist, and why I stopped seeing them as paperwork.",
      tools: "8D root cause · DFM reviews · Documented gates",
    },
  ],
}

/* ------------------------------------------------------------ interlude ---- */

export const parallel = {
  no: "07",
  title: "The parallel track",
  standfirst: "Founder work · nights and weekends",
  passage: [
    "The day job has never been the whole of it. There is a second track running alongside where I am a founder and an engineer rather than an employee.",
    "Some of it is software now, which surprised me. The instinct is identical: find the process quietly costing someone their week, and build the thing that removes it.",
  ],
  plate: "/assets/story/09-ventures.webp",
  plateAlt: "An open notebook of hand-drawn system architecture diagrams beside a laptop",
  plateLabel: "Plate 07 · the side track",
}

/* ----------------------------------------------------------------- coda ---- */

/**
 * The closing is a capability statement, not an availability notice. This page
 * is a portfolio: it should tell a reader what Rafael does and what he can do
 * for them, and give them a reason to make contact — nothing here should read
 * as looking for a job.
 */
export const coda = {
  no: "08",
  title: "What I can do for you.",
  standfirst: "Where an outside pair of hands actually helps",
  passage: [
    "Twelve years in, the pattern is consistent: most hardware programs do not fail on the physics. They fail in the space between the drawing and the volume, where a dozen people each did their part correctly and the whole still does not come together.",
    "That space is what I know. If you are building something physical and that gap is where it hurts, it is worth a conversation.",
  ],
  /** What a reader can actually engage him about */
  help: [
    {
      title: "New product introduction",
      desc: "Taking a design from CAD bench through pilot line to a volume ramp that holds, with a gate at every phase.",
    },
    {
      title: "Yield and process problems",
      desc: "PFMEA, control plans, Gauge R&R, and 8D root cause applied where the number actually needs to move.",
    },
    {
      title: "Supplier and CM coordination",
      desc: "PPAP, SICR, and contract-manufacturer management through pilot builds, fixture validation, and escalations.",
    },
    {
      title: "Design for manufacture",
      desc: "Reading the drawing as the person who has to build it, and catching the tolerance that costs a quarter at volume.",
    },
  ],
  cta: "Start a conversation",
}

/** Positioning carried in the footer. */
export const footerPitch = {
  lead: "I am a mechanical engineer who learned to run programs, not a manager who learned the vocabulary.",
  body: "Twelve years turning designs into things you can hold: radios, AR optics, surgical robots, avionics, solar structures. These days I point the same discipline at business operations, where the constraint is usually a process nobody ever wrote down.",
  based: "Miami, Florida · working globally",
}

/* ------------------------------------------------------------------ nav ---- */

/* ---------------------------------------------------------- ventures ---- */

/**
 * Each venture gets its own category rather than sharing one "Ventures" tab.
 * They are a parallel career, not a footnote — a reader should be able to land
 * directly on any one of them.
 */
export type Venture = {
  id: string
  no: string
  name: string
  role: string
  standfirst: string
  url: string
  urlLabel: string
  image: string
  imageAlt: string
  plateLabel: string
  passage: string[]
  facts: string[]
}

export const ventures: Venture[] = [
  {
    id: "tiento",
    no: "13",
    name: "Tiento",
    role: "CTO",
    standfirst: "Blockchain · football formation rights and scouting data",
    url: "https://www.tiento.io/",
    urlLabel: "tiento.io",
    image: "/assets/ventures/tiento.webp",
    imageAlt: "A professional football pitch at dusk under floodlights, seen from the empty stands",
    plateLabel: "Plate · the pitch",
    passage: [
      "Tiento tokenizes football player formation rights and provides verified scouting data, letting fans invest in the development of professional players.",
      "As CTO I own the infrastructure, the smart contracts and the verification systems — the part that has to be right before anyone puts money behind a claim.",
    ],
    facts: [
      "CTO; infrastructure and smart contracts",
      "Tokenized player formation rights",
      "Verified scouting data pipeline",
      "Verification systems for fan investment",
    ],
  },
  {
    id: "earthrobotics",
    no: "14",
    name: "Earth Robotics",
    role: "Mechanical Engineer",
    standfirst: "Sustainable robotics · environmental monitoring",
    url: "https://www.earthrobotics.co/",
    urlLabel: "earthrobotics.co",
    image: "/assets/ventures/earthrobotics.webp",
    imageAlt: "The Earth Robotics LU autonomous delivery robot, lit against a dark studio background",
    plateLabel: "LU · autonomous delivery robot",
    passage: [
      "Earth Robotics builds sustainable robotics for environmental monitoring — machines that go into wetlands and open terrain and come back with data.",
      "My work is the mechanical side: structural analysis, mechatronic integration and field testing. Hardware that has to survive being outdoors is its own discipline.",
    ],
    facts: [
      "Mechanical engineering and structural analysis",
      "Mechatronic integration",
      "Field testing of robotic systems",
      "Environmental monitoring applications",
    ],
  },
  {
    id: "recovrz",
    no: "15",
    name: "Recovrz",
    role: "Co-Founder",
    standfirst: "Athletic recovery · consumer product",
    url: "https://www.recovrz.com/",
    urlLabel: "recovrz.com",
    image: "/assets/ventures/recovrz.webp",
    imageAlt: "Athletic recovery equipment laid out on a bench in a quiet locker room",
    plateLabel: "Plate · recovery",
    passage: [
      "Recovrz is an athletic recovery brand for professional and amateur athletes: next-generation nasal strips for better breathing during recovery, plus recovery bundles.",
      "The only consumer product on this list, and the one that taught me the most about the distance between a good idea and something a person will actually buy twice.",
    ],
    facts: [
      "Co-founder",
      "Next-generation nasal strips for recovery breathing",
      "Recovery bundles for pro and amateur athletes",
      "Direct-to-consumer product and packaging",
    ],
  },
]

/** Arqentia is covered by the Forward deployed category, not repeated here. */
export const sideVentures = ventures

export const sideVenturesMeta = {
  id: "ventures",
  no: "13",
  title: "Side ventures",
  standfirst: "Three more things I build outside the day job",
  passage: [
    "Beyond Arqentia there are three others, each a different kind of hard: a blockchain platform for football, field robotics for environmental monitoring, and a consumer recovery brand.",
  ],
}

export const storyNav = [
  { id: "cover", label: "Cover" },
  { id: "forward", label: "Forward deployed" },
  { id: "record", label: "The record" },
  { id: "shipped", label: "Shipped" },
  { id: "method", label: "Method" },
  { id: "credentials", label: "Credentials" },
  { id: "references", label: "Proof" },
  { id: "ventures", label: "Ventures" },
  { id: "contact", label: "Contact" },
]

/**
 * The six eras are one thing — a chronology — so they live inside a single
 * "The record" category with their own selector. As separate top-level
 * categories they cost 698px of the rail on their own and forced it to wrap.
 */
export const recordMeta = {
  no: "03",
  title: "The record",
  standfirst: "Twelve years, in the order it happened",
}
