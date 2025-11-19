'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Multi-Cloud K8s Platform',
    description: 'Architected and deployed a unified Kubernetes platform across AWS and GCP, serving 100+ microservices with 99.99% uptime. Implemented GitOps workflows and automated disaster recovery.',
    tech: ['Kubernetes', 'Terraform', 'ArgoCD', 'Istio'],
    metrics: ['50% cost reduction', '10x faster deployments', '99.99% uptime'],
    github: '#',
    live: '#'
  },
  {
    title: 'AI/ML Pipeline Infrastructure',
    description: 'Built scalable ML training infrastructure on AWS using EKS, Kubeflow, and spot instances. Implemented automated model deployment pipelines with A/B testing capabilities.',
    tech: ['EKS', 'Kubeflow', 'MLflow', 'Python'],
    metrics: ['70% compute cost savings', '5x training throughput', 'Auto-scaling'],
    github: '#',
    live: '#'
  },
  {
    title: 'Zero-Trust Security Framework',
    description: 'Designed and implemented zero-trust security architecture across multi-cloud environments. Integrated Vault for secrets management and implemented mTLS for service-to-service communication.',
    tech: ['Vault', 'Istio', 'Cert-Manager', 'OPA'],
    metrics: ['SOC 2 compliant', 'Zero security incidents', 'Automated audits'],
    github: '#',
    live: '#'
  }
]

export function ProjectsShowcase() {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
            $ git log --projects
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-primary/30 p-6 pixel-border hover:border-primary/60 transition-colors"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-accent mb-2 font-bold">TECH_STACK:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <Badge key={i} variant="outline" className="border-primary/50 text-primary text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-secondary mb-2 font-bold">KEY_METRICS:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.metrics.map((metric, i) => (
                          <Badge key={i} variant="outline" className="border-secondary/50 text-secondary text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
