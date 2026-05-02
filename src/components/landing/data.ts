/**
 * Bio data extracted from MainContent + llms.txt — the single source of truth
 * for the new landing page sections. Keep in sync with public/llms.txt.
 */

import motorola from "@/assets/motorola-clean.png"
import magicLeap from "@/assets/magic-leap-clean.png"
import stryker from "@/assets/stryker-clean.png"
import gables from "@/assets/gables-clean.png"
import robotray from "@/assets/robotray-clean.png"
import generalMro from "@/assets/general-mro-clean.png"
import pieceMakers from "@/assets/piece-makers-clean.png"
import promptAero from "@/assets/prompt-aero-clean.png"

export const RESUME_URL =
  "https://drive.google.com/file/d/1yhTym6ORlev6c89RBAvwhabD7aFD7R2K/view?usp=drive_link"

export const LINKEDIN_URL = "https://www.linkedin.com/in/rafaelschwart/"
export const EMAIL = "rrgschwart@hotmail.com"
export const HEADSHOT_SRC = "/lovable-uploads/30a69a7f-53f1-4c7a-9897-49a90d14df19.png"

export type Experience = {
  id: string
  role: string
  company: string
  location: string
  when: string
  summary: string
  highlights?: string[]
}

export const experiences: Experience[] = [
  {
    id: "motorola",
    role: "Senior Operations Program Manager — NPI",
    company: "Motorola Solutions",
    location: "Miami, FL",
    when: "May 2024 — Present",
    summary:
      "Lead cross-functional alignment across R&D, Manufacturing, Logistics, and Quality to meet launch milestones for mission-critical communications systems.",
    highlights: [
      "Manage CAPEX/OPEX budgets, implement PFMEA and Process Control Plans (PCP), and integrate MES/MQS solutions into global supply chain operations.",
      "Apply Six Sigma and 8D methodologies to drive yield improvements and reduce defect rates.",
      "Coordinate contract manufacturers (Sanmina Penang, BCM) through pilot builds, ramp-ups, fixture validations, and supply chain escalations.",
    ],
  },
  {
    id: "magic-leap",
    role: "Senior Manufacturing Engineer — NPI",
    company: "Magic Leap",
    location: "Plantation, FL",
    when: "Jan 2023 — May 2024",
    summary:
      "Boosted production efficiency by 15% through MES analytics, Gauge R&R studies, and cleanroom optimization on next-gen AR hardware.",
    highlights: [
      "Developed PFMEA libraries and implemented manufacturing stability protocols for AR devices.",
      "Conducted DFM reviews and trained production teams to ensure scalability.",
      "Established cleanroom protocols and optimized PFMEAs.",
    ],
  },
  {
    id: "stryker",
    role: "Senior Manufacturing Engineer — Robotics",
    company: "Stryker",
    location: "Fort Lauderdale, FL",
    when: "Jan 2020 — Jan 2023",
    summary: "Enhanced robotic surgical assembly through MAPs redesign and SolidWorks simulation.",
    highlights: [
      "Led Kaizen / 6S initiatives, ensuring compliance with PPAP and supplier quality (SICR).",
      "Closed NC/CAPA issues and supported critical debug/rebuild operations on safety-critical assemblies.",
    ],
  },
  {
    id: "gables",
    role: "Mechanical Engineer — Test Engineering & Automation",
    company: "Gables Engineering",
    location: "Coral Gables, FL",
    when: "Jul 2018 — Aug 2019",
    summary: "Designed automated fixtures reducing test cycle times by 50%+ for Boeing avionics.",
    highlights: [
      "Deployed a PDM system improving ECN/ECO workflows and reducing design cycle times.",
      "Implemented automation solutions for aerospace test equipment.",
    ],
  },
  {
    id: "robotray",
    role: "Mechanical Design Engineer",
    company: "Robotray",
    location: "Miami, FL",
    when: "Nov 2017 — Jul 2018",
    summary:
      "Designed automation systems and CNC programs for high-speed bakery and packaging equipment. Optimized material usage with FEA and introduced SolidWorks PDM for design version control.",
  },
  {
    id: "terrasmart",
    role: "Mechanical Engineer — Solar Tracker Systems",
    company: "TerraSmart",
    location: "Naples, FL",
    when: "Mar 2017 — Oct 2017",
    summary:
      "Modeled solar tracking structures and provided casting/welding process improvements for utility-scale deployments.",
  },
  {
    id: "piece-makers",
    role: "Mechanical Design Engineer",
    company: "Piece-makers LLC",
    location: "Miami, FL",
    when: "Dec 2016 — Mar 2017",
    summary:
      "Designed aerospace test fixtures, performed R&D prototyping, and supported CAM programming for manufacturing bids.",
  },
  {
    id: "prompt-aero",
    role: "Mechanical Design Engineer",
    company: "Prompt Aero Services",
    location: "Miami, FL",
    when: "Jan 2016 — Nov 2016",
    summary: "Developed FAA-compliant aerospace fixtures and validated designs using FEA and CFD.",
  },
  {
    id: "general-mro",
    role: "Mechanical Design Engineer",
    company: "General MRO Aerospace",
    location: "Miami, FL",
    when: "May 2014 — Dec 2015",
    summary:
      "Designed and built large-scale structural load fixtures for aerospace clients. Improved NDT and plating processes through engineering-led optimizations.",
  },
]

export type Brand = {
  name: string
  role: string
  src: string
}

export const brands: Brand[] = [
  { name: "Motorola Solutions", role: "Senior Ops PM · NPI", src: motorola },
  { name: "Magic Leap", role: "Sr. Mfg Engineer · AR", src: magicLeap },
  { name: "Stryker", role: "Sr. Mfg Engineer · Robotics", src: stryker },
  { name: "Gables Engineering", role: "Aerospace · Test & Automation", src: gables },
  { name: "Robotray", role: "Mechanical Design · Automation", src: robotray },
  { name: "General MRO", role: "Aerospace MRO", src: generalMro },
  { name: "Piece-makers", role: "Aerospace", src: pieceMakers },
  { name: "Prompt Aero", role: "Aerospace · FAA fixtures", src: promptAero },
]

export type SideProject = {
  name: string
  role: string
  description: string
  url: string
  domain: string
}

export const projects: SideProject[] = [
  {
    name: "Tiento Labs",
    role: "Chief Technology Officer",
    description:
      "Blockchain platform that tokenizes football player formation rights and provides verified scouting data. Architecting infrastructure, smart contracts, and verification systems for fan investment in professional football.",
    url: "https://www.tientolabs.com",
    domain: "tientolabs.com",
  },
  {
    name: "Earth Robotics",
    role: "Mechanical Engineer",
    description:
      "Sustainable robotics for environmental applications. Designing and validating robotic systems for environmental monitoring — structural analysis, mechatronic integration, and field testing.",
    url: "https://www.earthrobotics.co/",
    domain: "earthrobotics.co",
  },
  {
    name: "Recovrz",
    role: "Co-Founder",
    description:
      "Athletic recovery brand serving professional and amateur athletes — next-generation nose strips for improved breathing during recovery, plus comprehensive recovery bundles.",
    url: "https://www.recovrz.com",
    domain: "recovrz.com",
  },
]

export const skills = [
  "NPI",
  "Lean Manufacturing",
  "Operational Excellence",
  "CAPEX / OPEX",
  "Six Sigma",
  "8D Root-Cause",
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

export type Recommendation = {
  name: string
  role: string
  letter: string
}

export const recommendations: Recommendation[] = [
  {
    name: "Jose Gibaja",
    role: "Principal Engineer · Stryker",
    letter:
      "https://drive.google.com/file/d/1gsqFCu4JNY6-6nbR1ym2mCNjVzYt-fWF/view?usp=drive_link",
  },
  {
    name: "Joe Zeichmann",
    role: "Senior Staff Engineer · Stryker",
    letter:
      "https://drive.google.com/file/d/12BXRuEfVv9GFW5c1fcSluN-37kefTSYz/view?usp=drive_link",
  },
  {
    name: "Melody Chan",
    role: "Project Manager · Stryker",
    letter:
      "https://drive.google.com/file/d/1EyDO2Iokxw6xLZIG26hUYYUY6n0iLzWU/view?usp=drive_link",
  },
  {
    name: "Alan Fitzpatrick",
    role: "Manufacturing Manager · Stryker",
    letter:
      "https://drive.google.com/file/d/1UhJ70FumtafzIgLPVOQGZjqzQkGQhoNs/view?usp=drive_link",
  },
]

export type Verification = {
  company: string
  role: string
  when: string
  letter: string
}

export const verifications: Verification[] = [
  {
    company: "Gables Engineering, Inc.",
    role: "Mechanical Engineer · Automation & Test Engineering",
    when: "07/24/2017 — 08/14/2019",
    letter:
      "https://drive.google.com/file/d/1xa-fAODnaGyCMsBTxdrShp0ZvehnaXo1/view?usp=drive_link",
  },
  {
    company: "Stryker Corporation",
    role: "Senior Engineer (Sustaining) · Senior Manufacturing Engineer (Robotics)",
    when: "02/17/2020 — 12/28/2022",
    letter:
      "https://drive.google.com/file/d/1G2VtB20hJUGoyxSDWz53OtADO1Pk8x2S/view?usp=drive_link",
  },
  {
    company: "Magic Leap, Inc.",
    role: "Senior Manufacturing Engineer (NPI)",
    when: "01/03/2023 — 05/24/2024",
    letter:
      "https://drive.google.com/file/d/1oY8w8qy4pr_gRZ5gEVyl1lWRRQMqjWaK/view?usp=drive_link",
  },
]

export const navLinks = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "certifications", label: "Credentials", href: "#certifications" },
  { id: "recommendations", label: "Recommendations", href: "#recommendations" },
  { id: "employment-verification", label: "Verification", href: "#employment-verification" },
] as const
