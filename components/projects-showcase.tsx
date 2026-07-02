'use client'

import { ExternalLink, Github } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const projects = [
  {
    title: 'Multi-Cloud K8s Platform',
    description:
      'Architected and deployed a unified Kubernetes platform across AWS and GCP, serving 100+ microservices with 99.99% uptime. Implemented GitOps workflows and automated disaster recovery.',
    tech: ['Kubernetes', 'Terraform', 'ArgoCD', 'Istio'],
    metrics: ['50% cost reduction', '10x faster deployments', '99.99% uptime'],
    github: '#',
    live: '#',
    tint: 'violet' as const,
  },
  {
    title: 'AI/ML Pipeline Infrastructure',
    description:
      'Built scalable ML training infrastructure on AWS using EKS, Kubeflow, and spot instances. Implemented automated model deployment pipelines with A/B testing capabilities.',
    tech: ['EKS', 'Kubeflow', 'MLflow', 'Python'],
    metrics: ['70% compute cost savings', '5x training throughput', 'Auto-scaling'],
    github: '#',
    live: '#',
    tint: 'cyan' as const,
  },
  {
    title: 'Zero-Trust Security Framework',
    description:
      'Designed and implemented zero-trust security architecture across multi-cloud environments. Integrated Vault for secrets management and implemented mTLS for service-to-service communication.',
    tech: ['Vault', 'Istio', 'Cert-Manager', 'OPA'],
    metrics: ['SOC 2 compliant', 'Zero security incidents', 'Automated audits'],
    github: '#',
    live: '#',
    tint: 'lime' as const,
  },
]

const tintStyles: Record<string, { bg: string; glow: string; border: string }> = {
  violet: {
    bg: 'bg-gradient-to-br from-secondary/8 via-transparent to-transparent',
    glow: 'hover:shadow-[0_0_40px_-12px_oklch(0.65_0.20_300/0.35)]',
    border: 'hover:border-secondary/40',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-primary/8 via-transparent to-transparent',
    glow: 'hover:shadow-[0_0_40px_-12px_oklch(0.72_0.16_190/0.35)]',
    border: 'hover:border-primary/40',
  },
  lime: {
    bg: 'bg-gradient-to-br from-accent/8 via-transparent to-transparent',
    glow: 'hover:shadow-[0_0_40px_-12px_oklch(0.80_0.18_130/0.35)]',
    border: 'hover:border-accent/40',
  },
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const cardRef = useReveal()
  const tint = tintStyles[project.tint]
  const isFeatured = index === 0

  return (
    <div
      ref={cardRef}
      className={`opacity-0 group relative rounded-xl overflow-hidden transition-all duration-500 ${tint.bg} ${tint.glow} ${tint.border} ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="glass gradient-border-hover rounded-xl h-full">
        <div className="relative p-6 md:p-8 lg:p-10 flex flex-col h-full gap-6">
          <div className="space-y-3">
            <h3
              className="text-2xl md:text-3xl font-bold text-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground/80 border border-primary/10"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <Badge
                key={metric}
                variant="outline"
                className="border-accent/40 text-accent bg-accent/5 hover:bg-accent/10 text-xs font-semibold"
              >
                {metric}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3 pt-2 mt-auto">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              asChild
            >
              <a href={project.github}>
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50"
              asChild
            >
              <a href={project.live}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Details
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectsShowcase() {
  const sectionRef = useReveal()

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div ref={sectionRef} className="container mx-auto px-4 opacity-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Featured Projects
            </h2>
            <p className="text-muted-foreground font-mono text-sm md:text-base tracking-wide">
              Infrastructure work that made an impact
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}