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
    period: 'Jan 2019 - Present',
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
    <section id="experience" className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
            $ history --experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-primary/30 p-6 md:p-8 pixel-border relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-3 top-8 w-6 h-6 bg-primary rounded-full border-4 border-background hidden md:block"></div>
                
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {exp.title}
                      </h3>
                      <p className="text-secondary font-bold">{exp.company}</p>
                      <p className="text-muted-foreground text-sm">{exp.location}</p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground w-fit">
                      {exp.period}
                    </Badge>
                  </div>

                  <ul className="space-y-2 text-sm text-muted-foreground font-mono">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex gap-2 leading-relaxed">
                        <span className="text-primary shrink-0">{'>'}</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tech.map((tech, i) => (
                      <Badge key={i} variant="outline" className="border-primary/50 text-primary text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" style={{ marginLeft: '1.75rem' }}></div>
        </div>
      </div>
    </section>
  )
}
