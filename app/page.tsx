import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { Nav } from '@/components/nav'
import { ProjectsShowcase } from '@/components/projects-showcase'
import { SkillsGrid } from '@/components/skills-grid'

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <HeroSection />
      <AboutSection />
      <SkillsGrid />
      <ProjectsShowcase />
      <ExperienceTimeline />
      <ContactSection />
      <Footer />
    </main>
  )
}
