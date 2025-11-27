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
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-border flex-1"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Technical Arsenal
            </h2>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <Card 
                  key={index}
                  className="bg-card/30 backdrop-blur-sm border-border hover:border-primary/50 p-6 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-background/50 group-hover:bg-primary/10 transition-colors">
                        <Icon className={`w-5 h-5 text-${skill.color}`} />
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {skill.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {skill.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full bg-${skill.color}`}></span>
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
