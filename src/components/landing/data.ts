/**
 * V2 "engineering ledger" — single source of truth for all landing content.
 * Ported verbatim from `Rafael Schwart V2/Rafael Schwart.dc.html` (renderVals).
 * Keep in sync with public/llms.txt.
 */

export const EMAIL = "hi@rafaelschwart.com"
export const LINKEDIN_URL = "https://www.linkedin.com/in/rafaelschwart/"
export const RESUME_URL =
  "https://drive.google.com/file/d/1yhTym6ORlev6c89RBAvwhabD7aFD7R2K/view?usp=drive_link"

export const HEADSHOT_SRC = "/assets/headshot.jpg"
export const HERO_VIDEO = "/assets/hero-loop.mp4"
export const HERO_POSTER = "/assets/hero-loop-poster.jpg"
export const CONTACT_VIDEO = "/assets/contact-loop.mp4"
export const CONTACT_POSTER = "/assets/contact-loop-poster.jpg"

export const ANNOUNCE =
  "Senior Operations Program Manager, NPI at Motorola Solutions  ·  Hardware from first build to volume production"

/* ---------------------------------------------------------------- nav ---- */

export type SectionId =
  | "home"
  | "method"
  | "experience"
  | "work"
  | "credentials"
  | "contact"

export const VIEW_SECTIONS: SectionId[] = [
  "home",
  "method",
  "experience",
  "work",
  "credentials",
  "contact",
]

export type NavItem = { id: SectionId; label: string }

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "method", label: "Method" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "credentials", label: "Credentials" },
]

/* --------------------------------------------------------------- hero ---- */

export const hero = {
  eyebrow: "Program Management · NPI · Miami, FL",
  headline: "I take hardware from first build to",
  headlineAccent: "volume production.",
  sub: "Senior Operations Program Manager at Motorola Solutions. Ten years moving consumer electronics, AR, medical, robotics, and aerospace programs through pilot and into production.",
  checks: ["PMP certified", "Six Sigma Green Belt", "10+ years, 6 industries"],
}

/* -------------------------------------------------------------- stats ---- */

export type Stat = {
  /** Numeric part that ticks up on reveal */
  value: number
  /** Rendered after the number ("+", "%", "") */
  suffix: string
  label: string
  accent?: boolean
}

export const statsHeadline = {
  lead: "Ten years. Six industries.",
  tail: "Hardware that shipped.",
}

export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Years on\nhardware programs" },
  { value: 9, suffix: "", label: "Companies across\n6 industries" },
  { value: 3, suffix: "", label: "Active\ncertifications" },
  { value: 15, suffix: "%", label: "Production lift\nat Magic Leap", accent: true },
]

/* ------------------------------------------------------------- method ---- */

export type Phase = {
  no: string
  phase: string
  gate: string
  gateFull: string
  title: string
  desc: string
  deliverables: string[]
  tools: string
}

export const phases: Phase[] = [
  {
    no: "01",
    phase: "Setup",
    gate: "Gate · plan approved",
    gateFull: "Program plan approved",
    title: "Setup & de-risking",
    desc: "Frame the program before the first build. Work breakdown, a live risk register, PFMEA, and process control plans so the critical path and every known risk has an owner.",
    deliverables: ["WBS", "Risk register", "PFMEA", "Control plans (PCP)"],
    tools: "MS Project · ERP · PDM / PLM",
  },
  {
    no: "02",
    phase: "Pilot",
    gate: "Gate · pilot yield met",
    gateFull: "Pilot yield target met",
    title: "Pilot & validation",
    desc: "Prove the process on the pilot line. Fixture validation, Gauge R&R, DFM reviews, and 8D on every escape, so problems surface here and not at volume.",
    deliverables: ["Fixture validation", "Gauge R&R", "DFM review", "8D on escapes"],
    tools: "SolidWorks · MES analytics · Six Sigma",
  },
  {
    no: "03",
    phase: "Ramp",
    gate: "Gate · on-time launch",
    gateFull: "On-time launch at target yield",
    title: "Ramp to volume",
    desc: "Scale to volume without surprises. MES/MQS analytics, supplier quality through PPAP and SICR, and contract manufacturer coordination across the ramp.",
    deliverables: ["MES / MQS", "PPAP / SICR", "CM coordination", "Yield tracking"],
    tools: "MES / MQS · ERP · Supplier quality",
  },
]

export type CapabilityIcon = "npi" | "sigma" | "quality" | "leadership"

export type Capability = {
  icon: CapabilityIcon
  title: string
  desc: string
}

export const capabilities: Capability[] = [
  {
    icon: "npi",
    title: "New Product Introduction",
    desc: "NPI from CAD bench through pilot line to volume ramp.",
  },
  {
    icon: "sigma",
    title: "Lean & Six Sigma",
    desc: "8D root cause, PFMEA, control plans, and Kaizen that move yield.",
  },
  {
    icon: "quality",
    title: "Supplier & Quality",
    desc: "PPAP, SICR, NC/CAPA, and CM coordination across global supply chains.",
  },
  {
    icon: "leadership",
    title: "Cross Functional Leadership",
    desc: "Aligning R&D, manufacturing, logistics, and quality to hit launch windows.",
  },
]

export const skills = [
  "NPI",
  "Lean Manufacturing",
  "Operational Excellence",
  "CAPEX / OPEX",
  "Six Sigma",
  "8D Root Cause",
  "PFMEA",
  "Control Plans (PCP)",
  "MES / MQS Integration",
  "Supplier Quality",
  "PPAP / SICR",
  "SolidWorks",
  "Autodesk Inventor",
  "PTC Creo",
  "Mastercam",
  "ERP",
  "PDM / PLM",
  "CNC Machining",
  "FEA",
  "CFD",
  "GD&T",
  "Agile",
  "WBS / Risk Management",
  "Pareto / RCA",
] as const

/* --------------------------------------------------------- experience ---- */

export type Experience = {
  company: string
  years: string
  roleShort: string
  title: string
  location: string
  dates: string
  industry: string
  summary: string
  bullets: string[]
  tags: string[]
  featured?: boolean
  metric?: string
  metricValue?: string
}

export const experience: Experience[] = [
  {
    company: "Motorola Solutions",
    years: "'24 to Now",
    roleShort: "Sr. Ops PM · NPI",
    title: "Senior Operations Program Manager, NPI",
    location: "Miami, FL",
    dates: "2024 to PRESENT",
    industry: "Communications Hardware",
    featured: true,
    summary:
      "Cross functional alignment across R&D, Manufacturing, Logistics, and Quality to hit launch milestones on mission critical communications systems.",
    bullets: [
      "Manage CAPEX and OPEX budgets, implement PFMEA and Process Control Plans (PCP), and integrate MES/MQS into global supply chain operations.",
      "Apply Six Sigma and 8D methodologies to drive yield improvements and reduce defect rates.",
      "Coordinate contract manufacturers (Sanmina Penang, BCM) through pilot builds, ramp ups, fixture validations, and supply chain escalations.",
    ],
    tags: ["CAPEX / OPEX", "PFMEA", "Control Plans", "MES / MQS", "Six Sigma", "8D", "CM Coordination"],
  },
  {
    company: "Magic Leap",
    years: "'23 to '24",
    roleShort: "Sr. Mfg Eng · NPI",
    title: "Senior Manufacturing Engineer, NPI",
    location: "Plantation, FL",
    dates: "JAN 2023 to MAY 2024",
    industry: "Augmented Reality",
    metric: "Production efficiency",
    metricValue: "15%",
    summary:
      "Owned NPI for next generation AR hardware, lifting production efficiency through analytics and cleanroom optimization.",
    bullets: [
      "Boosted production efficiency by 15% with MES analytics, Gauge R&R studies, and cleanroom optimization.",
      "Built PFMEA libraries and ran DFM reviews for next generation AR hardware.",
      "Trained production teams to scale pilot processes to volume.",
    ],
    tags: ["MES Analytics", "Gauge R&R", "PFMEA", "DFM", "Cleanroom"],
  },
  {
    company: "Stryker",
    years: "'20 to '23",
    roleShort: "Sr. Mfg Eng · Robotics",
    title: "Senior Manufacturing Engineer, Robotics",
    location: "Fort Lauderdale, FL",
    dates: "JAN 2020 to JAN 2023",
    industry: "Medical Robotics",
    summary:
      "Improved robotic surgical assembly quality and throughput on safety critical medical devices.",
    bullets: [
      "Improved robotic surgical assembly through MAPs redesign and SolidWorks simulation.",
      "Led Kaizen and 6S initiatives and ensured PPAP and supplier quality (SICR) compliance.",
      "Closed NC/CAPA on safety critical assemblies.",
    ],
    tags: ["MAPs", "SolidWorks", "Kaizen / 6S", "PPAP", "SICR", "NC / CAPA"],
  },
  {
    company: "Gables Engineering",
    years: "'18 to '19",
    roleShort: "ME · Test & Automation",
    title: "Mechanical Engineer, Test Engineering & Automation",
    location: "Coral Gables, FL",
    dates: "JUL 2018 to AUG 2019",
    industry: "Aerospace · Avionics",
    metric: "Faster test cycles",
    metricValue: "50%+",
    summary: "Cut test cycle times and streamlined engineering change workflows for Boeing avionics.",
    bullets: [
      "Designed automated fixtures that cut test cycle times by 50%+ for Boeing avionics.",
      "Deployed a PDM system that improved ECN/ECO workflows and shortened design cycles.",
    ],
    tags: ["Automated Fixtures", "PDM", "ECN / ECO", "Avionics"],
  },
  {
    company: "Robotray",
    years: "'17 to '18",
    roleShort: "Mechanical Design Eng",
    title: "Mechanical Design Engineer",
    location: "Miami, FL",
    dates: "NOV 2017 to JUL 2018",
    industry: "Industrial Automation",
    summary: "Automation systems and CNC programs for high speed bakery and packaging equipment.",
    bullets: [
      "Designed automation systems and CNC programs for high speed bakery and packaging equipment.",
      "Optimized material usage with FEA and introduced SolidWorks PDM for version control.",
    ],
    tags: ["CNC", "FEA", "SolidWorks PDM", "Automation"],
  },
  {
    company: "TerraSmart",
    years: "'17",
    roleShort: "ME · Solar Trackers",
    title: "Mechanical Engineer, Solar Tracker Systems",
    location: "Naples, FL",
    dates: "MAR 2017 to OCT 2017",
    industry: "Solar Energy",
    summary: "Modeled utility scale solar tracking structures and improved casting and welding processes.",
    bullets: [
      "Modeled solar tracking structures for utility scale deployments.",
      "Provided casting and welding process improvements.",
    ],
    tags: ["Structural Modeling", "Casting", "Welding", "Solar"],
  },
  {
    company: "Piece-makers",
    years: "'16 to '17",
    roleShort: "Mechanical Design Eng",
    title: "Mechanical Design Engineer",
    location: "Miami, FL",
    dates: "DEC 2016 to MAR 2017",
    industry: "Aerospace",
    summary: "Aerospace test fixtures, R&D prototyping, and CAM programming for manufacturing bids.",
    bullets: [
      "Designed aerospace test fixtures and performed R&D prototyping.",
      "Supported CAM programming for manufacturing bids.",
    ],
    tags: ["Test Fixtures", "R&D", "CAM"],
  },
  {
    company: "Prompt Aero",
    years: "'16",
    roleShort: "Mechanical Design Eng",
    title: "Mechanical Design Engineer",
    location: "Miami, FL",
    dates: "JAN 2016 to NOV 2016",
    industry: "Aerospace",
    summary: "FAA compliant aerospace fixtures validated with FEA and CFD.",
    bullets: ["Developed FAA compliant aerospace fixtures.", "Validated designs using FEA and CFD."],
    tags: ["FAA", "FEA", "CFD", "Fixtures"],
  },
  {
    company: "General MRO",
    years: "'14 to '15",
    roleShort: "Mechanical Design Eng",
    title: "Mechanical Design Engineer",
    location: "Miami, FL",
    dates: "MAY 2014 to DEC 2015",
    industry: "Aerospace MRO",
    summary: "Large scale structural load fixtures and improvements to NDT and plating processes.",
    bullets: [
      "Designed and built large scale structural load fixtures for aerospace clients.",
      "Improved NDT and plating processes through engineering led optimizations.",
    ],
    tags: ["Load Fixtures", "NDT", "Plating"],
  },
]

/* ----------------------------------------------------------- pipeline ---- */

export type PipelineStage = {
  label: string
  /** The live stage — orange fill + rsRamp pulse */
  active?: boolean
  arrow: boolean
}

export const pipelineStages: PipelineStage[] = [
  { label: "CONCEPT", arrow: true },
  { label: "PILOT", arrow: true },
  { label: "RAMP", active: true, arrow: true },
  { label: "VOLUME", arrow: false },
]

/* ------------------------------------------------------------- brands ---- */

export type MotifKind = "comms" | "ar" | "medical" | "radar" | "gear" | "rotor" | "plane"

export type Brand = {
  name: string
  role: string
  motif: MotifKind
}

export const brandsLabel = "Past experience · 9 companies, 6 industries"

export const brands: Brand[] = [
  { name: "Motorola Solutions", role: "Senior Ops PM · NPI", motif: "comms" },
  { name: "Magic Leap", role: "Sr. Mfg Engineer · AR", motif: "ar" },
  { name: "Stryker", role: "Sr. Mfg Engineer · Robotics", motif: "medical" },
  { name: "Gables Engineering", role: "Aerospace · Test & Automation", motif: "radar" },
  { name: "Robotray", role: "Mechanical Design · Automation", motif: "gear" },
  { name: "General MRO", role: "Aerospace MRO", motif: "rotor" },
  { name: "Piece-makers", role: "Aerospace", motif: "radar" },
  { name: "Prompt Aero", role: "Aerospace · FAA fixtures", motif: "plane" },
]

/* ----------------------------------------------------------- projects ---- */

export type Project = {
  name: string
  role: string
  desc: string
  url: string
  label: string
}

export const projects: Project[] = [
  {
    name: "Arqentia",
    role: "Co-Founder",
    desc: "US engineering firm that designs, builds, hosts, and operates custom operational software for B2B companies: dashboards, workflow automation, AI agents, and integrations with the tools you already use.",
    url: "https://arqentia.com/",
    label: "arqentia.com",
  },
  {
    name: "Tiento",
    role: "CTO",
    desc: "Blockchain platform that tokenizes football player formation rights and provides verified scouting data. Building the infrastructure, smart contracts, and verification systems for fan investment in professional football.",
    url: "https://www.tiento.io/",
    label: "tiento.io",
  },
  {
    name: "Earth Robotics",
    role: "Mechanical Engineer",
    desc: "Sustainable robotics for environmental monitoring: structural analysis, mechatronic integration, and field testing of robotic systems.",
    url: "https://www.earthrobotics.co/",
    label: "earthrobotics.co",
  },
  {
    name: "Recovrz",
    role: "Co-Founder",
    desc: "Athletic recovery brand for pro and amateur athletes: next generation nasal strips for better breathing during recovery, plus recovery bundles.",
    url: "https://www.recovrz.com/",
    label: "recovrz.com",
  },
]

/* -------------------------------------------------------- credentials ---- */

export const pmp = {
  issuer: "PMI",
  title: "Project Management Professional.",
  desc: "Covers scope, schedule, cost, quality, risk, and stakeholder management on hardware programs.",
  credlyUrl: "https://www.credly.com/badges/f6c6c143-768b-4b63-836a-ca062b99639a",
  diplomaUrl: "https://drive.google.com/file/d/1hyFQHuAKKCniRhsqyex6iTw8_XsetUtD/view?usp=sharing",
}

export type Certification = {
  eyebrow: string
  title: string
  org: string
  url?: string
  urlLabel?: string
}

export const certifications: Certification[] = [
  {
    eyebrow: "ASQ · Certified",
    title: "Six Sigma Green Belt",
    org: "American Society for Quality",
    url: "https://drive.google.com/file/d/1pPz3TYgQKt9fQeq87th17K3sv73_2iGj/view?usp=sharing",
    urlLabel: "View diploma",
  },
  {
    eyebrow: "Professional Development · Certified",
    title: "Agile Foundations",
    org: "Certificate on file",
  },
]

export type Reference = { name: string; role: string; url: string }

export const refs: Reference[] = [
  {
    name: "Jose Gibaja",
    role: "Principal Engineer · Stryker",
    url: "https://drive.google.com/file/d/1OOb5nCWnSRehqACE84Fc8vxZRsyKrykK/view?usp=drive_link",
  },
  {
    name: "Joe Zeichman",
    role: "Senior Staff Engineer · Stryker",
    url: "https://drive.google.com/file/d/1hjpvuIOBIlu98ZcgzUEp3fJl-dsPpr9a/view?usp=drive_link",
  },
  {
    name: "Melody Chan",
    role: "Project Manager · Stryker",
    url: "https://drive.google.com/file/d/15G8wmeNO0DfTXSEgO7HKzwvO0YY7jJ8A/view?usp=drive_link",
  },
  {
    name: "Alan Fitzpatrick",
    role: "Manufacturing Manager · Stryker",
    url: "https://drive.google.com/file/d/1IIHLJ3F0Z7k6AgI3mbnOaXLdA9WPfRQU/view?usp=drive_link",
  },
]

export type Verification = { org: string; dates: string; url: string }

export const verifs: Verification[] = [
  {
    org: "Gables Engineering, Inc.",
    dates: "07/24/2017 to 08/14/2019",
    url: "https://drive.google.com/file/d/1kCyWHoTKvw3rwrqSisf-lYBdSJfFhHRZ/view?usp=drive_link",
  },
  {
    org: "Stryker Corporation",
    dates: "02/17/2020 to 12/26/2022",
    url: "https://drive.google.com/file/d/1cpPctqpEvs-gB3tD1qmo0_uzFAurgziy/view?usp=drive_link",
  },
  {
    org: "Magic Leap, Inc.",
    dates: "01/03/2023 to 05/24/2024",
    url: "https://drive.google.com/file/d/1g9BQbrdTabmSkdEHdlt1wupGdRC8A-l4/view?usp=drive_link",
  },
]

/* ------------------------------------------------------------ contact ---- */

export const contact = {
  eyebrow: "Get in touch",
  headline: "Let's talk about your hardware program.",
  sub: "Program management, NPI, and process engineering. Based in Miami, working globally.",
}

export const footer = {
  tagline: "Senior Operations Program Manager, NPI · Miami, FL",
  copyright: "© 2026 Rafael Schwart",
}
