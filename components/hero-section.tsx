'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [cursorLine, setCursorLine] = useState(1)
  const [showContent, setShowContent] = useState(false)

  const textLine1 = 'Orchestrating Infrastructure'
  const textLine2 = 'Automating Excellence'

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 200)
    return () => clearTimeout(contentTimer)
  }, [])

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
    }, 35)

    return () => clearInterval(timer)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full animate-float opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.72 0.16 190 / 0.4), transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '0s',
          animationDuration: '8s',
        }}
      />
      <div
        className="absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full animate-float opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.20 300 / 0.35), transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '2s',
          animationDuration: '10s',
        }}
      />
      <div
        className="absolute top-[60%] left-[60%] w-56 h-56 rounded-full animate-float opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.80 0.18 130 / 0.3), transparent 70%)',
          filter: 'blur(50px)',
          animationDelay: '4s',
          animationDuration: '7s',
        }}
      />

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Raymond Csirak
            </h1>

            <p className="text-lg md:text-xl font-mono text-primary tracking-wide">
              Senior DevOps Engineer
            </p>
          </div>

          <div className="h-20 flex items-center justify-center">
            <div className="font-mono text-base md:text-lg text-muted-foreground text-left inline-block space-y-1">
              <div>
                <span className="text-primary/70 mr-1">&gt;</span>
                <span>{line1}</span>
                {cursorLine === 1 && (
                  <span className="terminal-cursor text-primary ml-0.5">▌</span>
                )}
              </div>
              <div>
                <span className="text-primary/70 mr-1">&gt;</span>
                <span>{line2}</span>
                {cursorLine === 2 && (
                  <span className="terminal-cursor text-primary ml-0.5">▌</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-2">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 rounded-lg transition-all hover:scale-105 glow-primary"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Let&apos;s Talk
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 text-foreground font-semibold px-8 h-12 rounded-lg transition-all hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50"
              onClick={() => window.open('/Raymond_Csirak.pdf', '_blank')}
            >
              View Resume
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground pt-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span>Ready to help</span>
            </div>
            <span className="text-border/50 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span>Satu Mare, RO</span>
            </div>
            <span className="text-border/50 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span>15+ years exp</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToAbout}
        className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce z-10"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  )
}