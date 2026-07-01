import { useParams, Navigate } from "react-router-dom"
import { Landing } from "@/components/landing/Landing"
import { VIEW_SECTIONS, type SectionId } from "@/components/landing/data"

const Index = () => {
  const { section } = useParams<{ section?: string }>()

  if (section && !VIEW_SECTIONS.includes(section as SectionId)) {
    return <Navigate to="/" replace />
  }

  return <Landing section={(section as SectionId) ?? "home"} />
}

export default Index
