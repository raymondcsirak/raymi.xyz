'use client'

import { Card } from '@/components/ui/card'
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

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-border flex-1"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Experience Log
            </h2>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="space-y-12 relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-4 bottom-4 w-px bg-border"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-[-5px] md:left-[27px] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary z-10"></div>
                
                <div className="space-y-4 group">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-muted-foreground font-medium">{exp.company}</p>
                    </div>
                    <Badge variant="secondary" className="w-fit font-mono text-xs">
                      {exp.period}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    {exp.location}
                  </p>

                  <ul className="space-y-2 text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed text-sm">
                        <span className="text-primary mt-1.5 text-xs">●</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tech.map((tech, i) => (
                      <Badge key={i} variant="outline" className="border-border text-muted-foreground text-xs hover:border-primary/50 hover:text-primary transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
