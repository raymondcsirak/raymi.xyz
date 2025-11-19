'use client'

import { Card } from '@/components/ui/card'
import { Cloud, Container, GitBranch, Gauge, Lock, Workflow, Server, Network } from 'lucide-react'

const skills = [
  {
    icon: Container,
    title: 'Container Orchestration',
    items: ['Kubernetes', 'Docker', 'Helm', 'Argo CD'],
    color: 'primary'
  },
  {
    icon: GitBranch,
    title: 'CI/CD & GitOps',
    items: ['GitLab CI', 'Argo CD', 'Kustomize', 'CI/CD Automations'],
    color: 'secondary'
  },
  {
    icon: Workflow,
    title: 'Infrastructure as Code',
    items: ['Terraform', 'IaC Practices', 'Bare-metal Setup', 'Automation'],
    color: 'accent'
  },
  {
    icon: Server,
    title: 'Linux & Systems',
    items: ['Linux Administration', 'Virtualization', 'System Security', 'Scripting'],
    color: 'primary'
  },
  {
    icon: Network,
    title: 'Network Engineering',
    items: ['Network Infrastructure', 'TCP/IP', 'Monitoring Solutions', 'Performance Optimization'],
    color: 'secondary'
  },
  {
    icon: Gauge,
    title: 'Operations & Strategy',
    items: ['Backup Strategies', 'Disaster Recovery', 'Level 3 Support', 'AI Tools Integration'],
    color: 'accent'
  }
]

export function SkillsGrid() {
  return (
    <section id="skills" className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
            $ ls ./skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <Card 
                  key={index}
                  className={`bg-card/50 backdrop-blur-sm border-${skill.color}/30 p-6 pixel-border hover:scale-105 transition-transform`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 text-${skill.color}`} />
                      <h3 className={`font-bold text-${skill.color}`}>
                        {skill.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground font-mono">
                      {skill.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className={`text-${skill.color}`}>{'>'}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
