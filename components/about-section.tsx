'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '15+', label: 'Certifications' },
  { value: '40+', label: 'Technologies' },
  { value: '∞', label: 'Automations' },
]

const TECH_BADGES = [
  { name: 'Kubernetes', category: 'container' as const },
  { name: 'Docker', category: 'container' as const },
  { name: 'Terraform', category: 'infra' as const },
  { name: 'ArgoCD', category: 'infra' as const },
  { name: 'GitLab CI', category: 'cicd' as const },
  { name: 'Helm', category: 'container' as const },
]

const LANGUAGE_BADGES = [
  { name: 'Hungarian', flag: '🇭🇺' },
  { name: 'Romanian', flag: '🇷🇴' },
  { name: 'English', flag: '🇬🇧' },
]

const CATEGORY_STYLES = {
  container: 'border-primary/50 text-primary hover:bg-primary/10',
  infra: 'border-secondary/50 text-secondary hover:bg-secondary/10',
  cicd: 'border-accent/50 text-accent hover:bg-accent/10',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-up')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function AboutSection() {
  const sectionRef = useReveal()

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div ref={sectionRef} className="container mx-auto px-4 opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center gap-4">
              <span
                className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase"
              >
                About
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Who I Am
            </h2>

            
            <div className="space-y-5 text-foreground/80 leading-relaxed text-base md:text-lg">
              <p>
                A DevOps and Platform Engineer with over a decade of experience
                shaping infrastructure at scale — from bare-metal server rooms
                to cloud-native architectures. I specialize in turning fragile
                systems into resilient, automated platforms that teams actually
                enjoy working with.
              </p>
              <p>
                My core practice centers on{' '}
                <span className="text-secondary font-semibold">
                  Kubernetes orchestration
                </span>
                , Infrastructure as Code, and CI/CD automation — building the
                pipelines and guardrails that let engineering teams ship with
                confidence. Whether it&apos;s network engineering on bare metal
                or multi-cloud provisioning, I&apos;ve been in the trenches
                making it reliable.
              </p>
              <p>
                As the leader at{' '}
                <span className="text-primary font-semibold">Hexalab SRL</span>,
                I drive modernization through{' '}
                <span className="text-accent font-semibold">
                  GitOps workflows
                </span>
                , container orchestration, and the strategic adoption of
                AI-powered tooling across engineering teams. I believe the best
                infrastructure is the kind you don&apos;t have to think about —
                it just works.
              </p>
            </div>

            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase mr-1">
                Languages
              </span>
              {LANGUAGE_BADGES.map(({ name, flag }) => (
                <Badge
                  key={name}
                  variant="outline"
                  className="border-border text-foreground/70 gap-1.5 text-sm"
                >
                  <span>{flag}</span>
                  {name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex items-start lg:pt-16">
            <div className="glass gradient-border-hover rounded-xl w-full relative overflow-hidden glow-primary">
              <div className="dot-pattern absolute inset-0 opacity-40" />

              <div
                className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, oklch(0.72 0.16 190 / 0.4), transparent 70%)',
                }}
              />

              <div className="relative z-10 p-6 md:p-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  {STATS.map(({ value, label }) => (
                    <div key={label} className="space-y-1">
                      <div
                        className="text-3xl md:text-4xl font-bold text-primary"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {value}
                      </div>
                      <div className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-foreground/80">
                      Infrastructure &amp; Platform Engineering
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-sm text-foreground/80">
                      Cloud-Native &amp; Kubernetes Specialist
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm text-foreground/80">
                      GitOps &amp; Automation Advocate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase mr-2">
              Stack
            </span>
            {TECH_BADGES.map(({ name, category }) => (
              <Badge
                key={name}
                variant="outline"
                className={CATEGORY_STYLES[category]}
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}