'use client'

import { useState } from 'react'
import { sendContactEmail } from '@/app/actions'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Send, Github, Linkedin, FileText } from 'lucide-react'

export function ContactTerminal() {
  const [output, setOutput] = useState<string[]>([
    '> Ready to connect. Enter your details below...',
    '> Or reach out directly via social channels'
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    
    setOutput(prev => [
      ...prev,
      `> Processing contact request from ${name}...`,
      `> Email: ${email}`,
      '> Establishing secure connection...'
    ])

    const result = await sendContactEmail(formData)

    if (result.error) {
      setOutput(prev => [
        ...prev,
        `> Error: ${result.error}`,
        '> Please try again or contact me directly.'
      ])
    } else {
      setOutput(prev => [
        ...prev,
        '> ✓ Message queued for delivery',
        '> I\'ll get back to you within 24 hours!'
      ])
      form.reset()
    }
    
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
            $ ./connect
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30 p-6 pixel-border">
              <div className="space-y-6">
                <div className="space-y-2 font-mono text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-accent">raymi@devops</span>
                    <span className="text-primary">:</span>
                    <span className="text-secondary">~</span>
                    <span className="text-foreground">$ nano message.txt</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-primary font-bold mb-1 block">NAME:</label>
                    <Input 
                      name="name"
                      placeholder="John Doe"
                      required
                      className="bg-input border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-primary font-bold mb-1 block">EMAIL:</label>
                    <Input 
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="bg-input border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-primary font-bold mb-1 block">MESSAGE:</label>
                    <Textarea 
                      name="message"
                      placeholder="Let's talk about infrastructure, automation, or collaboration opportunities..."
                      required
                      rows={5}
                      className="bg-input border-primary/30 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold pixel-border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'SENDING...' : '$ SEND_MESSAGE'}
                  </Button>
                </form>
              </div>
            </Card>

            {/* Terminal Output & Links */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/30 p-6 pixel-border">
                <div className="space-y-4 font-mono text-sm">
                  {output.map((line, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                      {line}
                    </p>
                  ))}
                  <p className="text-muted-foreground">
                    <span className="text-accent">raymi@devops</span>
                    <span className="text-primary">:</span>
                    <span className="text-secondary">~</span>
                    <span className="text-foreground">$ <span className="terminal-cursor">█</span></span>
                  </p>
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-secondary/30 p-6 pixel-border">
                <h3 className="text-lg font-bold text-secondary mb-4">DIRECT_CHANNELS:</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:hello@raymi.xyz"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span>hello@raymi.xyz</span>
                  </a>
                  <a 
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <Github className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span>github.com/raymi</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/raymondcsirak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span>linkedin.com/in/raymondcsirak</span>
                  </a>
                  <a 
                    href="tel:+40748077749"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span>+40 748 077 749</span>
                  </a>
                  <a 
                    href="/Raymond_Csirak.pdf"
                    target="_blank"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <FileText className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-accent/30 p-6 pixel-border">
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-accent font-bold">STATUS:</p>
                  <p className="text-muted-foreground">{'>'} Open to opportunities</p>
                  <p className="text-muted-foreground">{'>'} Available for consulting</p>
                  <p className="text-muted-foreground">{'>'} Response time: {'<'} 24hrs</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center border-t border-primary/30 pt-8">
          <p className="text-muted-foreground font-mono text-sm">
            {'>'} Built with Next.js, TypeScript, and a lot of ☕
          </p>
          <p className="text-muted-foreground font-mono text-xs mt-2">
            © 2025 Raymond Csirak | DevOps Engineer | All rights reserved
          </p>
        </div>
      </div>
    </section>
  )
}
