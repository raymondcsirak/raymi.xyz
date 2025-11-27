'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [cursorLine, setCursorLine] = useState(1)
  
  const textLine1 = '> Orchestrating Infrastructure'
  const textLine2 = '> Automating Excellence'
  
  useEffect(() => {
    let currentIndex = 0
    let currentLine = 1
    
    const timer = setInterval(() => {
      if (currentLine === 1) {
        if (currentIndex <= textLine1.length) {
          setLine1(textLine1.slice(0, currentIndex))
          currentIndex++
        } else {
          currentLine = 2
          currentIndex = 0
          setCursorLine(2)
        }
      } else if (currentLine === 2) {
        if (currentIndex <= textLine2.length) {
          setLine2(textLine2.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(timer)
        }
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated grid background - Subtle */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-center leading-tight" style={{ fontFamily: 'var(--font-pixel)' }}>
                Raymond Csirak
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
                Building <span className="text-primary">//</span> Fixing <span className="text-primary">Systems</span>
              </h2>
            </div>

            <div className="h-24 flex items-center justify-center">
              <p className="text-lg md:text-xl font-mono leading-relaxed text-muted-foreground text-left inline-block">
                {line1}
                {cursorLine === 1 && <span className="terminal-cursor text-primary">█</span>}
                <br />
                {line2}
                {cursorLine === 2 && <span className="terminal-cursor text-primary">█</span>}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 rounded-md transition-all hover:scale-105"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Talk
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border text-foreground font-semibold px-8 h-12 rounded-md transition-all hover:bg-secondary/10 hover:text-secondary hover:border-secondary dark:hover:bg-secondary/10 dark:hover:text-secondary dark:hover:border-secondary"
                onClick={() => window.open('/Raymond_Csirak.pdf', '_blank')}
              >
                View Resume
              </Button>
            </div>

            <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground pt-12">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Ready to help</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Satu Mare, RO</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>15+ years exp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToAbout}
        className="cursor-pointer absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  )
}
