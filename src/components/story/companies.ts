/**
 * Company dossiers — who each employer actually is.
 *
 * Logos: recreated as monochrome ink marks with Higgsfield (Nano Banana Pro,
 * image-to-image against each company's real logo) so they sit on the paper
 * system instead of fighting it. References were pulled from the live sites
 * with the Firecrawl CLI; Motorola's came from Wikimedia Commons (their CDN
 * blocks direct fetches), Prompt Aero's was reconstructed from a homepage
 * screenshot crop.
 *
 * Product images: generated B&W editorial studies of each company's product
 * category — evocative, not photographs of the companies' actual facilities.
 *
 * `facts` are conservative and sourced from the companies' own sites (via
 * Firecrawl summaries) plus widely published company information.
 *
 * Keyed by the `company` field in `landing/data.ts`.
 */

export type Company = {
  /** Matches Experience.company exactly */
  name: string
  url: string | null
  urlLabel?: string
  /** Monochrome ink mark, local */
  logo: string | null
  /** B&W product/service study for the dossier modal, local */
  product: string | null
  /** Mono caption under the product plate */
  productLabel?: string
  /** The company's own brand colour, used as a hairline accent only */
  brand: string
  /** What they do — one paragraph */
  blurb: string
  /** Important facts, shown as checklist rows in the modal */
  facts: string[]
}

export const companies: Record<string, Company> = {
  "Motorola Solutions": {
    name: "Motorola Solutions",
    url: "https://www.motorolasolutions.com",
    urlLabel: "motorolasolutions.com",
    logo: "/assets/companies/motorola-mark.webp",
    product: "/assets/companies/motorola-product.webp",
    productLabel: "Land-mobile radio",
    brand: "#005EB8",
    blurb:
      "Mission-critical communications and public-safety technology: land-mobile radio, command-centre software, and video security used by first responders, government, and enterprise operations worldwide.",
    facts: [
      "Public company on the NYSE (MSI), headquartered in Chicago",
      "Descends from Motorola, founded 1928; standalone Motorola Solutions since the 2011 split",
      "Equips the majority of U.S. public-safety agencies with mission-critical radio",
      "Three technology pillars: land-mobile radio, video security, command-centre software",
    ],
  },
  "Magic Leap": {
    name: "Magic Leap",
    url: "https://www.magicleap.com",
    urlLabel: "magicleap.com",
    logo: "/assets/companies/magicleap-mark.webp",
    product: "/assets/companies/magicleap-product.webp",
    productLabel: "AR waveguide optics",
    brand: "#1A49B7",
    blurb:
      "Augmented-reality hardware and optics. Designs and manufactures waveguide-based AR headsets, covering waveguide design, optical performance, and volume production in-house.",
    facts: [
      "Headquartered in Plantation, Florida",
      "Pioneer of see-through waveguide optics for enterprise AR",
      "Magic Leap 2: one of the most advanced enterprise AR headsets shipped",
      "Waveguides are fabricated in its own Florida facilities",
    ],
  },
  Stryker: {
    name: "Stryker",
    url: "https://www.stryker.com",
    urlLabel: "stryker.com",
    logo: "/assets/companies/stryker-mark.webp",
    product: "/assets/companies/stryker-product.webp",
    productLabel: "Surgical robotics",
    brand: "#FFB500",
    blurb:
      "One of the world's largest medical technology companies: surgical robotics, implants, instruments, and capital equipment across orthopaedics, medical-surgical, neurotechnology, and spine.",
    facts: [
      "Fortune 500 company headquartered in Kalamazoo, Michigan",
      "Maker of the Mako robotic-arm assisted surgery platform",
      "Products span orthopaedics, med-surg equipment, neurotechnology, and spine",
      "Serves customers in roughly 75 countries",
    ],
  },
  "Gables Engineering": {
    name: "Gables Engineering",
    url: "https://www.gableseng.com",
    urlLabel: "gableseng.com",
    logo: "/assets/companies/gables-mark.webp",
    product: "/assets/companies/gables-product.webp",
    productLabel: "Avionics control heads",
    brand: "#0A418E",
    blurb:
      "Coral Gables avionics manufacturer, now a HEICO company. Designs and builds cockpit control panels and avionics controls: ADS-B, communication, navigation, and audio systems for air transport, business jets, and regional aircraft.",
    facts: [
      "Founded 1946 in Coral Gables, Florida; acquired by HEICO",
      "Specialist in cockpit control heads and audio/comm/nav panels",
      "Ships on Boeing and other air-transport, business, and regional platforms",
      "Design, certification, and manufacturing under one roof",
    ],
  },
  TerraSmart: {
    name: "TerraSmart",
    url: "https://www.terrasmart.com",
    urlLabel: "terrasmart.com",
    logo: "/assets/companies/terrasmart-mark.webp",
    product: "/assets/companies/terrasmart-product.webp",
    productLabel: "Ground-mount solar",
    brand: "#0229CC",
    blurb:
      "Utility-scale solar infrastructure specialising in complex terrain: ground-mount racking, trackers, canopies, and electrical balance-of-system, anchored by its ground-screw foundation technology.",
    facts: [
      "Part of Gibraltar Industries' renewables platform",
      "3+ GW of ground-mount solar built across the U.S.",
      "Ground-screw foundations open sites conventional piles can't reach",
      "Full scope: racking, trackers, canopies, eBOS, and install crews",
    ],
  },
  Robotray: {
    name: "Robotray",
    url: "https://robotray.com",
    urlLabel: "robotray.com",
    logo: "/assets/companies/robotray-mark.webp",
    product: "/assets/companies/robotray-product.webp",
    productLabel: "Packaging automation",
    brand: "#FFA200",
    blurb:
      "Miami industrial-automation integrator. Combines hardware and software into user-friendly systems that automate manufacturing plants, with deep roots in high-speed bakery and packaging lines.",
    facts: [
      "Integrates mechanical, electrical, and software scope as one system",
      "Specialty: high-speed bakery and food-packaging automation",
      "Systems designed to run production with minimal operator touch",
    ],
  },
  "Piece-makers": {
    name: "Piece-makers",
    url: "https://piece-makers.com",
    urlLabel: "piece-makers.com",
    logo: "/assets/companies/piecemakers-mark.webp",
    product: "/assets/companies/piecemakers-product.webp",
    productLabel: "Precision tooling",
    brand: "#5B6B77",
    blurb:
      "Precision manufacturing and aviation tooling from a 10,000 sq ft Miami facility: drafting, machining, finishing, and inspection under one roof.",
    facts: [
      "10,000 sq ft manufacturing facility in Miami",
      "Aviation tooling and precision machining specialist",
      "In-house drafting, machining, finishing, and inspection",
    ],
  },
  "Prompt Aero": {
    name: "Prompt Aero",
    url: "https://www.promptaero.com",
    urlLabel: "promptaero.com",
    logo: "/assets/companies/promptaero-mark.webp",
    product: "/assets/companies/promptaero-product.webp",
    productLabel: "Actuator overhaul",
    brand: "#C8102E",
    blurb:
      "FAA-certified repair station in Miami specialising in repair, modification, and overhaul of aircraft accessories: hydraulic valves and pumps, power control actuators, flight-control and landing-gear actuators.",
    facts: [
      "FAA Certified Repair Station No. OT8R205Y",
      "Overhauls hydraulic and electromechanical aircraft components",
      "Serves commercial and military aircraft operators",
      "40+ years of combined aviation-industry experience",
    ],
  },
  "General MRO": {
    name: "General MRO",
    url: "https://www.generalmroaerospace.com",
    urlLabel: "generalmroaerospace.com",
    logo: "/assets/companies/generalmro-mark.webp",
    product: "/assets/companies/generalmro-product.webp",
    productLabel: "Component repair",
    brand: "#1F3A7A",
    blurb:
      "General MRO Aerospace (GMA): aircraft component repair and maintenance for airlines, OEMs, and asset-trading partners, combining component repair capabilities with asset solutions.",
    facts: [
      "Aircraft component MRO based in Miami, Florida",
      "Serves airlines, OEMs, and asset-trading partners",
      "Component repair paired with asset-solutions programmes",
    ],
  },
}

/** Initials used when a company has no logo file. */
export function initials(name: string) {
  return name
    .replace(/[^A-Za-z\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")
}
