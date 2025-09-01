import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { MainContent } from '@/components/MainContent'

const Index = () => {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <MainContent activeSection={activeSection} />
    </div>
  );
};

export default Index;
