'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
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

export function ContactTerminal() {
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
          'I\'ll get back to you within 24 hours!'
        ])
        form.reset()
        setTurnstileToken(null)
        if (window.turnstile) {
          window.turnstile.reset()
        }
      }
    } catch (error) {
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-border flex-1"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Initialize Connection
            </h2>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Send a Message</h3>
                <p className="text-sm text-muted-foreground">
                  Have a project in mind or just want to say hi?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</label>
                  <Input 
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-card/50 border-border focus:border-primary transition-colors"
                  />
                </div>

                {turnstileSiteKey ? (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
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

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="bg-card/50 border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
                  <Textarea 
                    name="message"
                    placeholder="Let's talk about infrastructure..."
                    required
                    rows={5}
                    className="bg-card/50 border-border focus:border-primary resize-none transition-colors"
                  />
                </div>

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

            {/* Terminal Output & Links */}
            <div className="space-y-8">
              <div className="bg-card/30 border border-border rounded-lg p-6 font-mono text-sm h-[200px] overflow-y-auto custom-scrollbar">
                <div className="flex gap-2 mb-4 text-muted-foreground border-b border-border pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  <span className="ml-2 text-xs">terminal</span>
                </div>
                <div className="space-y-2">
                  {output.map((line, i) => (
                    <p key={i} className="text-muted-foreground">
                      <span className="text-primary mr-2">$</span>
                      {line}
                    </p>
                  ))}
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <span>$</span>
                    <span className="w-2 h-4 bg-primary"></span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Connect Directly</h3>
                <div className="grid grid-cols-1 gap-3">
                  <a 
                    href="mailto:hello@raymi.xyz"
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">hello@raymi.xyz</span>
                  </a>
                  <a 
                    href="https://github.com/raymondcsirak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">github.com/raymondcsirak</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/raymondcsirak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">linkedin.com/in/raymondcsirak</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center border-t border-border pt-8">
          <p className="text-muted-foreground text-sm">
            © 2025 Raymond Csirak. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
