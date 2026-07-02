import { Github, Linkedin, Mail } from 'lucide-react'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

const SOCIAL_LINKS = [
  { href: 'https://github.com/raymondcsirak', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/raymondcsirak', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hello@raymi.xyz', icon: Mail, label: 'Email' },
] as const

export function Footer() {
  return (
    <footer className="relative py-8">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs font-mono text-muted-foreground">
          © 2025 Raymond Csirak
        </p>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
