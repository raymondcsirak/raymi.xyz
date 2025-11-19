import { HeroSection } from '@/components/hero-section'
import { TerminalAbout } from '@/components/terminal-about'
import { SkillsGrid } from '@/components/skills-grid'
import { ProjectsShowcase } from '@/components/projects-showcase'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { ContactTerminal } from '@/components/contact-terminal'
import { PixelatedNav } from '@/components/pixelated-nav'

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <PixelatedNav />
      <HeroSection />
      <TerminalAbout />
      <SkillsGrid />
      {/* <ProjectsShowcase /> */}
      <ExperienceTimeline />
      <ContactTerminal />
    </main>
  )
}
