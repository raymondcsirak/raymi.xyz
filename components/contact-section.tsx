'use client'

import { Github, Linkedin, Mail, Send } from 'lucide-react'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      reset: () => void
    }
    turnstileCallback?: (token: string) => void
  }
}

export function ContactSection() {
  const [output, setOutput] = useState<string[]>([
    'Ready to connect. Enter your details below...',
    'Or reach out directly via social channels'
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.turnstileCallback = (token: string) => {
      setTurnstileToken(token)
    }

    return () => {
      delete window.turnstileCallback
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    if (turnstileSiteKey && !turnstileToken) {
      setOutput(prev => [
        ...prev,
        'Please complete the verification challenge before sending.'
      ])
      return
    }

    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    if (turnstileToken) {
      formData.set('turnstileToken', turnstileToken)
    }
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    setOutput(prev => [
      ...prev,
      `Processing contact request from ${name}...`,
      `Email: ${email}`,
      'Establishing secure connection...'
    ])

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        setOutput(prev => [
          ...prev,
          `Error: ${result.error || 'Unknown error'}`,
          'Please try again or contact me directly.'
        ])
      } else {
        setOutput(prev => [
          ...prev,
          '✓ Message queued for delivery',
          "I'll get back to you within 24 hours!"
        ])
        form.reset()
        setTurnstileToken(null)
        if (window.turnstile) {
          window.turnstile.reset()
        }
      }
    } catch {
      setOutput(prev => [
        ...prev,
        `Error: Failed to send message`,
        'Please try again or contact me directly.'
      ])
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-24 bg-background">
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-display)]">
              Get In Touch
            </h2>
            <p className="mt-3 text-muted-foreground font-[family-name:var(--font-mono)] text-sm">
              Have a project in mind? Let&apos;s build something together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="reveal-up glass gradient-border-hover rounded-xl p-8" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-2 mb-8">
                <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-display)]">
                  Send a Message
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-mono)]">
                  Fill out the form and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-mono)]">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-background/50 border-border focus:border-primary transition-colors h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-mono)]">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="bg-background/50 border-border focus:border-primary transition-colors h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-mono)]">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Let's talk about infrastructure..."
                    required
                    rows={5}
                    className="bg-background/50 border-border focus:border-primary resize-none transition-colors"
                  />
                </div>

                {turnstileSiteKey ? (
                  <div className="space-y-2">
                    <label htmlFor="contact-verification" className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-mono)]">
                      Verification
                    </label>
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                      data-theme="auto"
                      data-callback="turnstileCallback"
                    ></div>
                  </div>
                ) : null}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 transition-all"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div className="space-y-8 reveal-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-display)] mb-6">
                  Connect Directly
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:hello@raymi.xyz"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        hello@raymi.xyz
                      </span>
                      <p className="text-xs text-muted-foreground">Email me directly</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/raymondcsirak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        github.com/raymondcsirak
                      </span>
                      <p className="text-xs text-muted-foreground">View my projects</p>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/raymondcsirak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        linkedin.com/in/raymondcsirak
                      </span>
                      <p className="text-xs text-muted-foreground">Connect professionally</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="glass rounded-lg p-5 font-[family-name:var(--font-mono)] text-sm">
                <div className="flex items-center gap-2 mb-3 text-muted-foreground border-b border-border/50 pb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                  <span className="ml-2 text-xs text-muted-foreground/60">output</span>
                </div>
                <div className="space-y-1.5 max-h-[180px] overflow-y-auto custom-scrollbar">
                  {output.map((line, i) => (
                    <p key={`${i}-${line.slice(0, 20)}`} className="text-muted-foreground">
                      <span className="text-primary mr-2">&gt;</span>
                      {line}
                    </p>
                  ))}
                  <div className="flex items-center gap-2 text-primary">
                    <span>&gt;</span>
                    <span className="w-1.5 h-4 bg-primary terminal-cursor"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}