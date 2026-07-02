'use client'

import { MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'

const experiences = [
  {
    period: 'Mar 2022 - Present',
    title: 'DevOps/Platform Engineer',
    company: 'Hexalab SRL (Formerly Hitter Technologies)',
    location: 'Satu Mare, Romania',
    achievements: [
      'Manage Kubernetes clusters through Infrastructure as Code on bare-metal setups',
      'Package and deploy applications into Kubernetes, improving system functionality and availability',
      'Optimize CI/CD pipelines in GitLab and integrate with Argo CD, reducing deployment lead times',
      'Design and implement backup and disaster recovery strategies for improved data integrity',
      'Lead introduction and adoption of AI-powered tools across engineering team'
    ],
    tech: ['Kubernetes', 'GitLab CI', 'Argo CD', 'Terraform', 'Linux']
  },
  {
    period: 'Jan 2019 - Mar 2024',
    title: 'Head of Infrastructure | Linux Systems Administrator',
    company: 'noLimits Technologies | Hexalab SRL',
    location: 'Satu Mare, Romania',
    achievements: [
      'Lead Level 3 technical support operations for business clients, maintaining SLAs',
      'Administer virtualization infrastructures to enhance resource utilization and efficiency',
      'Oversee Linux and network infrastructure management for optimal service delivery',
      'Direct IT project management initiatives aligned with organizational objectives',
      'Manage supplier relationships and procure technology solutions'
    ],
    tech: ['Linux', 'Virtualization', 'Network Engineering', 'Project Management']
  },
  {
    period: 'Jun 2018 - Jan 2019',
    title: 'IT Service Manager, Level 2 Support Specialist',
    company: 'noLimits Technologies | Hitter Technologies',
    location: 'Satu Mare, Romania',
    achievements: [
      'Provided Level 2 technical support, resolving complex issues for high customer satisfaction',
      'Administered TCP/IP network configurations for seamless connectivity',
      'Executed IT project management for system upgrades and enhancements',
      'Managed helpdesk team ensuring minimal MTTR for optimal client satisfaction'
    ],
    tech: ['TCP/IP', 'Technical Support', 'Team Management']
  },
  {
    period: 'Jan 2015 - Jan 2019',
    title: 'IT Support Specialist | Technical Sales Representative',
    company: 'noLimits Technologies',
    location: 'Satu Mare, Romania',
    achievements: [
      'Delivered Level 1 technical support to business clients with high service standards',
      'Managed ticketing systems to track and resolve customer service issues effectively',
      'Conducted software testing and validation ensuring quality and compliance',
      'Collaborated with sales teams providing technical expertise during consultations'
    ],
    tech: ['Ticketing Systems', 'Software Testing', 'Customer Service']
  }
]

const dotColors = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-primary',
]

const borderAccents = [
  'border-l-primary/60',
  'border-l-secondary/60',
  'border-l-accent/60',
  'border-l-primary/60',
]

const dotGlows = [
  'hover:shadow-[0_0_20px_-5px_oklch(0.72_0.16_190/0.5),0_0_40px_-10px_oklch(0.72_0.16_190/0.25)]',
  'hover:shadow-[0_0_20px_-5px_oklch(0.65_0.20_300/0.5),0_0_40px_-10px_oklch(0.65_0.20_300/0.25)]',
  'hover:shadow-[0_0_20px_-5px_oklch(0.80_0.18_130/0.5),0_0_40px_-10px_oklch(0.80_0.18_130/0.25)]',
  'hover:shadow-[0_0_20px_-5px_oklch(0.72_0.16_190/0.5),0_0_40px_-10px_oklch(0.72_0.16_190/0.25)]',
]

const bulletColors = [
  'text-primary',
  'text-secondary',
  'text-accent',
  'text-primary',
]

function TimelineCard({
  experience,
  index,
  isVisible,
}: {
  experience: (typeof experiences)[0]
  index: number
  isVisible: boolean
}) {
  const isEven = index % 2 === 0

  return (
    <div
      className={`
        relative flex w-full items-start
        md:items-center
        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
      `}
    >
      <div
        className={`
          w-full md:w-[calc(50%-2rem)]
          ${isEven ? 'md:pr-0' : 'md:pl-0'}
        `}
      >
        <div
          className={`
            glass rounded-xl p-6 border-l-2 ${borderAccents[index]}
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
                {experience.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{experience.company}</p>
            </div>
            <Badge
              variant="outline"
              className="font-mono text-[10px] shrink-0 tracking-wide border-border/60 text-muted-foreground"
            >
              {experience.period}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <MapPin className="size-3 shrink-0" />
            <span>{experience.location}</span>
          </div>

          <ul className="space-y-2 mb-4">
            {experience.achievements.map((achievement, i) => (
              <li key={`${experience.period}-ach-${i}`} className="flex gap-2.5 leading-relaxed text-sm text-muted-foreground">
                <span className={`mt-1.5 text-[8px] ${bulletColors[index]} shrink-0`}>●</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {experience.tech.map((tech) => (
              <Badge
                key={`${experience.period}-tech-${tech}`}
                variant="outline"
                className="border-border/50 text-muted-foreground text-[10px] font-mono tracking-wide hover:border-primary/40 hover:text-primary transition-colors duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <div
          className={`
            w-4 h-4 rounded-full ${dotColors[index]}
            border-[3px] border-background
            transition-all duration-300
            ${dotGlows[index]}
          `}
        />
      </div>

      <div className="md:hidden absolute -left-[21px] top-6 z-10">
        <div
          className={`
            w-3.5 h-3.5 rounded-full ${dotColors[index]}
            border-[3px] border-background
            transition-all duration-300
            ${dotGlows[index]}
          `}
        />
      </div>

      <div className="hidden md:block w-[calc(50%-2rem)] shrink-0" />
    </div>
  )
}

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lineProgress, setLineProgress] = useState(0)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(section)

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      const scrolledPastTop = viewportHeight - sectionTop
      const totalScrollDistance = viewportHeight + sectionHeight
      const progress = Math.min(
        Math.max(scrolledPastTop / totalScrollDistance, 0),
        1
      )
      setLineProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="mt-3 text-sm font-mono text-muted-foreground tracking-wide">
              My journey through infrastructure and operations
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-xs mx-auto" />
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-border/40" />
              <div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-secondary to-accent origin-top transition-[height] duration-100 ease-linear"
                style={{ height: `${lineProgress * 100}%` }}
              />
            </div>

            <div className="md:hidden absolute left-0 top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-border/40" />
              <div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-secondary to-accent origin-top transition-[height] duration-100 ease-linear"
                style={{ height: `${lineProgress * 100}%` }}
              />
            </div>

            <div className="space-y-12 md:space-y-16 pl-6 md:pl-0">
              {experiences.map((exp, index) => (
                <TimelineCard
                  key={exp.period}
                  experience={exp}
                  index={index}
                  isVisible={cardsVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}