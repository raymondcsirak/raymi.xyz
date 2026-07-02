'use client'

import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/raymondcsirak',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/raymondcsirak',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:hello@raymi.xyz',
    icon: Mail,
    label: 'Email',
  },
] as const

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const sectionIds = NAV_LINKS.map((l) => l.id)

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => {
      for (const o of observers) o.disconnect()
    }
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop / Mobile Header Bar */}
      <nav
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out',
          'rounded-full px-2 py-2',
          'glass-strong',
          scrolled
            ? 'shadow-[0_0_30px_-8px_oklch(0.72_0.16_190/0.3)] scale-[0.98]'
            : 'shadow-none'
        )}
      >
        <div className="flex items-center gap-1">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors group cursor-pointer"
            aria-label="Scroll to top"
          >
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-foreground">raymi</span>
              <span className="text-primary">.</span>
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-border/50 mx-1 hidden md:block" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-mono tracking-wide uppercase transition-all duration-300 cursor-pointer',
                  activeSection === link.id
                    ? 'text-primary bg-primary/10 text-glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-border/50 mx-1 hidden md:block" />

          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center gap-0.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden text-foreground hover:bg-primary/10 ml-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <button
          type="button"
          className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-default"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />

        {/* Content */}
        <div
          className={cn(
            'relative z-10 flex flex-col items-center justify-center h-full transition-all duration-500 ease-out',
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          )}
        >
          {/* Nav Links */}
          <div className="flex flex-col items-center gap-2">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  'px-8 py-3 rounded-xl text-lg font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer',
                  activeSection === link.id
                    ? 'text-primary bg-primary/10 text-glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
                style={{
                  transitionDelay: isOpen ? `${i * 60}ms` : '0ms',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent my-8" />

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="p-3 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}