'use client'

import { Container, Gauge, GitBranch, Network, Server, Workflow } from 'lucide-react'
import { useEffect, useRef } from 'react'

type SkillCategory = {
  icon: typeof Container
  title: string
  items: string[]
  color: 'primary' | 'secondary' | 'accent'
  span: 'large' | 'medium' | 'wide'
}

const skills: SkillCategory[] = [
  {
    icon: Container,
    title: 'Container Orchestration',
    items: ['Kubernetes', 'Docker', 'Helm', 'Argo CD'],
    color: 'primary',
    span: 'large',
  },
  {
    icon: GitBranch,
    title: 'CI/CD & GitOps',
    items: ['GitLab CI', 'Argo CD', 'Kustomize'],
    color: 'secondary',
    span: 'medium',
  },
  {
    icon: Workflow,
    title: 'Infrastructure as Code',
    items: ['Terraform', 'IaC Practices', 'Bare-metal'],
    color: 'accent',
    span: 'medium',
  },
  {
    icon: Server,
    title: 'Linux & Systems',
    items: ['Linux Administration', 'Virtualization', 'System Security', 'Scripting'],
    color: 'primary',
    span: 'wide',
  },
  {
    icon: Network,
    title: 'Network Engineering',
    items: ['Network Infrastructure', 'TCP/IP', 'Monitoring'],
    color: 'secondary',
    span: 'medium',
  },
  {
    icon: Gauge,
    title: 'Operations & Strategy',
    items: ['Backup Strategies', 'Disaster Recovery', 'L3 Support', 'AI Tools'],
    color: 'accent',
    span: 'medium',
  },
]

const colorMap = {
  primary: {
    icon: 'text-primary',
    pill: 'bg-primary/10 text-primary border-primary/20',
    glow: 'hover:shadow-[0_0_30px_-8px_oklch(0.72_0.16_190_/_0.35)]',
  },
  secondary: {
    icon: 'text-secondary',
    pill: 'bg-secondary/10 text-secondary border-secondary/20',
    glow: 'hover:shadow-[0_0_30px_-8px_oklch(0.65_0.20_300_/_0.35)]',
  },
  accent: {
    icon: 'text-accent',
    pill: 'bg-accent/10 text-accent border-accent/20',
    glow: 'hover:shadow-[0_0_30px_-8px_oklch(0.80_0.18_130_/_0.35)]',
  },
} as const

const spanClasses = {
  large: 'md:col-span-2',
  medium: 'md:col-span-1',
  wide: 'md:col-span-2',
} as const

function BentoCard({ skill, index }: { skill: SkillCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = skill.icon
  const colors = colorMap[skill.color]

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 100}ms`
          el.classList.add('animate-reveal-up')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`${spanClasses[skill.span]} glass gradient-border-hover rounded-xl p-6 opacity-0 transition-transform duration-300 hover:scale-[1.02] ${colors.glow} group relative overflow-hidden`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),oklch(1_0_0_/_0.04),transparent_40%)]" />

      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/60">
            <Icon className={`h-5 w-5 ${colors.icon}`} />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground tracking-tight">
            {skill.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skill.items.map((item) => (
            <span
              key={item}
              className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-medium tracking-wide ${colors.pill}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  // Track mouse position for spotlight effect
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const handleMouseMove = (e: MouseEvent) => {
      const cards = grid.querySelectorAll<HTMLDivElement>('.group')
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      })
    }

    grid.addEventListener('mousemove', handleMouseMove)
    return () => grid.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
            <p className="mt-3 font-mono text-sm text-muted-foreground">
              Tools &amp; technologies I use to build and scale infrastructure
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {skills.map((skill, index) => (
              <BentoCard key={skill.title} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}