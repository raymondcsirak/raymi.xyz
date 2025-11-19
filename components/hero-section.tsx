'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const fullText = '> Orchestrating Infrastructure, Automating Excellence'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.75 0.18 145) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.75 0.18 145) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>
      
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Increased max-width to allow more space for the single-line name */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              {/* Reduced font sizes to prevent overflow while maintaining impact */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground whitespace-nowrap" style={{ fontFamily: 'var(--font-pixel)' }}>
                Raymond Csirak
              </h1>
              {/* Adjusted subtitle size to match new proportions */}
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-secondary mt-2" style={{ fontFamily: 'var(--font-pixel)' }}>
                DevOps <span className="text-primary mx-2">//</span> Platform Engineer
              </h2>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-primary/30 p-6 pixel-border max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-muted-foreground font-mono">
                {displayText}
                <span className="terminal-cursor text-primary">█</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold pixel-border group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="mr-2">$</span> HIRE_ME
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground dark:hover:bg-secondary dark:hover:text-secondary-foreground dark:border-secondary font-bold pixel-border"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <span className="mr-2">$</span> VIEW_RESUME
              </Button>
            </div>

            <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground pt-8">
              <span className="text-accent">●</span>
              <span>Available for hire</span>
              <span className="text-accent">●</span>
              <span>Satu Mare, RO</span>
              <span className="text-accent">●</span>
              <span>10+ years exp</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
