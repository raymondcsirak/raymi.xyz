'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TerminalAbout() {
  return (
    <section id="about" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
            $ whoami
          </h2>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/30 p-6 md:p-8 pixel-border">
            <div className="space-y-4 font-mono">
              <div className="text-muted-foreground">
                <span className="text-accent">raymi@devops</span>
                <span className="text-primary">:</span>
                <span className="text-secondary">~</span>
                <span className="text-foreground">$ cat about.txt</span>
              </div>

              <div className="pl-4 space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  {'>'} DevOps/Platform Engineer with <span className="text-primary font-bold">over a decade</span> of experience in systems administration, infrastructure optimization, and automation.
                </p>
                
                <p>
                  {'>'} Specialized in <span className="text-secondary font-bold">Kubernetes orchestration</span>, Infrastructure as Code (IaC), CI/CD automation, and network engineering on bare-metal and cloud environments.
                </p>
                
                <p>
                  {'>'} Leader at Hexalab SRL driving modernization through <span className="text-accent font-bold">GitOps workflows</span>, container orchestration, and AI-powered tooling adoption across engineering teams.
                </p>

                <p>
                  {'>'} Passionate about cloud-native technologies, continuous improvement, and bridging technical implementation with business objectives. Fluent in <span className="text-primary">Hungarian</span>, <span className="text-secondary">Romanian</span>, and <span className="text-accent">English</span>.
                </p>
              </div>

              <div className="pt-4 border-t border-primary/30">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary text-primary">
                    ./kubernetes
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    ./docker
                  </Badge>
                  <Badge variant="outline" className="border-secondary text-secondary">
                    ./terraform
                  </Badge>
                  <Badge variant="outline" className="border-secondary text-secondary">
                    ./argocd
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    ./gitlab-ci
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    ./helm
                  </Badge>
                </div>
              </div>

              <div className="text-muted-foreground pt-2">
                <span className="text-accent">raymi@devops</span>
                <span className="text-primary">:</span>
                <span className="text-secondary">~</span>
                <span className="text-foreground">$ <span className="terminal-cursor">█</span></span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
