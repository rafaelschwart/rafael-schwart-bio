import { useParams, Navigate } from "react-router-dom"
import { Landing } from "@/components/landing/Landing"

const VALID_SECTIONS = [
  "about",
  "experience",
  "skills",
  "certifications",
  "projects",
  "recommendations",
  "employment-verification",
  "contact",
] as const

const Index = () => {
  const { section } = useParams<{ section?: string }>()

  if (section && !VALID_SECTIONS.includes(section as typeof VALID_SECTIONS[number])) {
    return <Navigate to="/" replace />
  }

  const activeSection = section ?? "about"

  return <Landing activeSection={activeSection} />
}

export default Index
