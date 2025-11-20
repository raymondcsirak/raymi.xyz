'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Terminal, Github, Linkedin, Mail } from 'lucide-react'

export function PixelatedNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-primary/30' : ''}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            <span className="text-primary font-bold tracking-wider">{'>'} RAYMI.XYZ</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">
              ./about
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-foreground hover:text-primary transition-colors">
              ./skills
            </button>
            {/* <button onClick={() => scrollToSection('projects')} className="text-foreground hover:text-primary transition-colors">
              ./projects
            </button> */}
            <button onClick={() => scrollToSection('experience')} className="text-foreground hover:text-primary transition-colors">
              ./experience
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
              ./contact
            </button>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:hello@raymi.xyz" className="text-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-primary/30 pt-4">
            <button onClick={() => scrollToSection('about')} className="block text-foreground hover:text-primary transition-colors">
              ./about
            </button>
            <button onClick={() => scrollToSection('skills')} className="block text-foreground hover:text-primary transition-colors">
              ./skills
            </button>
            {/* <button onClick={() => scrollToSection('projects')} className="block text-foreground hover:text-primary transition-colors">
              ./projects
            </button> */}
            <button onClick={() => scrollToSection('experience')} className="block text-foreground hover:text-primary transition-colors">
              ./experience
            </button>
            <button onClick={() => scrollToSection('contact')} className="block text-foreground hover:text-primary transition-colors">
              ./contact
            </button>
            <div className="flex gap-4 pt-4 border-t border-primary/30">
              <a href="https://github.com/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:hello@raymi.xyz" className="text-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
