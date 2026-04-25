import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { MainContent } from '@/components/MainContent'

const VALID_SECTIONS = [
  'about',
  'experience',
  'skills',
  'certifications',
  'projects',
  'recommendations',
  'employment-verification',
  'contact',
] as const

const Index = () => {
  const { section } = useParams<{ section?: string }>()
  const navigate = useNavigate()

  if (section && !VALID_SECTIONS.includes(section as typeof VALID_SECTIONS[number])) {
    return <Navigate to="/" replace />
  }

  const activeSection = section ?? 'about'

  const handleSectionChange = (next: string) => {
    navigate(next === 'about' ? '/' : `/${next}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <MainContent activeSection={activeSection} />
    </div>
  );
};

export default Index;
