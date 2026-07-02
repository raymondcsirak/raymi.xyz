"use client";

import { useEffect, useState } from "react";
import { Bebas_Neue, IBM_Plex_Mono, Anton } from "next/font/google";
import { 
  Terminal, Server, Network, ShieldAlert, GitBranch, ArrowRight, Download, Github, Linkedin, Mail, Box, 
  Activity
} from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const plex = IBM_Plex_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-plex" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export default function OxidizedPortfolio() {
  const [mounted, setMounted] = useState(false);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  
  useEffect(() => { setMounted(true); }, []);
  
  if (!mounted) return null;

  return (
    <div 
      className={`min-h-screen w-full bg-[#0a0a0a] text-neutral-300 selection:bg-[#4A9E82] selection:text-black overflow-x-hidden ${bebas.variable} ${plex.variable} ${anton.variable}`} 
      style={{ fontFamily: 'var(--font-plex)' }}
    >
      <style jsx global>{`
        @keyframes patina-pulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 158, 130, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(74, 158, 130, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 158, 130, 0); }
        }
        @keyframes copper-shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .oxidized-text {
          background: linear-gradient(to bottom, #4A9E82, #2a5a4a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .copper-text {
          background: linear-gradient(135deg, #B87333 0%, #ffcf9e 50%, #B87333 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: copper-shine 3s linear infinite;
        }
        .grid-bg {
          background-image: 
            linear-gradient(to right, rgba(74, 158, 130, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 158, 130, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 50;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="noise-overlay" />

      <nav className="fixed top-0 left-0 w-full z-40 border-b border-[#4A9E82]/20 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="w-full px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2 group">
            <div className="w-3 h-3 bg-[#4A9E82] rotate-45 group-hover:bg-[#B87333] transition-colors duration-300"></div>
            <span className="font-bebas text-2xl tracking-widest text-[#e5e5e5]">RAYMOND.CSIRAK</span>
          </div>
          <div className="flex gap-4">
            <a href={portfolioData.github} target="_blank" className="text-neutral-500 hover:text-[#4A9E82] transition-colors"><Github className="w-5 h-5" /></a>
            <a href={portfolioData.linkedin} target="_blank" className="text-neutral-500 hover:text-[#4A9E82] transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href={`mailto:${portfolioData.email}`} className="text-neutral-500 hover:text-[#B87333] transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 pt-20 overflow-hidden grid-bg">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A9E82]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B87333]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

        <div className="w-full max-w-[1800px] mx-auto z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 border-b border-[#4A9E82]/30 pb-8">
            <div>
              <div className="inline-block px-3 py-1 mb-4 border border-[#B87333] text-[#B87333] text-xs tracking-[0.2em] font-bold uppercase bg-[#B87333]/5">
                System Status: Online
              </div>
              <h1 className="flex flex-col">
                <span className="font-[family-name:var(--font-anton)] text-[13vw] leading-[0.85] tracking-tight text-[#e5e5e5] uppercase">
                  RAYMOND<br />CSIRAK
                </span>
                <span className="font-bebas text-4xl md:text-7xl text-transparent stroke-text mt-2 md:mt-4 opacity-80" style={{ WebkitTextStroke: '1px #4A9E82' }}>
                  {portfolioData.title.toUpperCase()}
                </span>
              </h1>
            </div>
            <div className="mt-8 md:mt-0 md:mb-4 md:text-right max-w-md">
              <p className="text-[#4A9E82] font-mono mb-2 text-lg">
                <span className="text-[#B87333]">&gt;</span> {portfolioData.tagline}
              </p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4A9E82] to-transparent my-4"></div>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Orchestrating resilient infrastructure and automating excellence. 
                Focusing on Kubernetes, IaC, and scalable systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="col-span-1 border-l-2 border-[#B87333]/30 pl-6 flex flex-col justify-between h-full py-2">
              <div className="text-[#B87333] text-sm tracking-widest mb-2">LOCATION</div>
              <div className="text-xl font-bold">{portfolioData.location}</div>
            </div>
            <div className="col-span-1 border-l-2 border-[#4A9E82]/30 pl-6 flex flex-col justify-between h-full py-2">
              <div className="text-[#4A9E82] text-sm tracking-widest mb-2">EXPERIENCE</div>
              <div className="text-xl font-bold">{portfolioData.yearsExperience} YEARS</div>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-4">
              <a 
                href={portfolioData.resumeUrl}
                className="group relative px-8 py-4 bg-[#1a1a1a] border border-[#4A9E82] overflow-hidden flex items-center gap-3 transition-all hover:bg-[#4A9E82] hover:text-[#0a0a0a]"
              >
                <div className="absolute inset-0 w-full h-full bg-[#4A9E82] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                <span className="relative z-10 font-bold tracking-wider">RESUME</span>
                <Download className="relative z-10 w-4 h-4" />
              </a>
              <a 
                href="#contact"
                className="group px-8 py-4 bg-[#B87333] text-[#0a0a0a] font-bold border border-[#B87333] flex items-center gap-3 hover:bg-transparent hover:text-[#B87333] transition-colors"
              >
                <span>CONTACT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-[#4A9E82]/20 bg-[#0f0f0f] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a0a0a] via-[#4A9E82] to-[#0a0a0a] opacity-30"></div>
        <div className="w-full px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-bebas text-6xl md:text-8xl text-[#e5e5e5] mb-8 leading-[0.9]">
              SYSTEM <span className="text-[#4A9E82]">MANIFESTO</span>
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-[#B87333]">
                <Terminal className="w-6 h-6" />
                <span className="font-mono text-sm tracking-wider">ROOT ACCESS GRANTED</span>
              </div>
              <div className="w-full h-px bg-[#333]"></div>
              <div className="flex items-center gap-4 text-[#4A9E82]">
                <Activity className="w-6 h-6" />
                <span className="font-mono text-sm tracking-wider">UPTIME: 99.99%</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 grid gap-8">
            {portfolioData.about.map((paragraph) => (
              <p key={paragraph.substring(0, 20)} className="text-lg md:text-xl text-neutral-400 leading-relaxed border-l border-[#4A9E82]/30 pl-6 hover:border-[#B87333] hover:text-neutral-200 transition-colors duration-300">
                {paragraph}
              </p>
            ))}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {portfolioData.coreTags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 px-4 py-3 bg-[#151515] border border-[#333] hover:border-[#4A9E82] transition-colors group">
                  <div className="w-1.5 h-1.5 bg-[#4A9E82] group-hover:bg-[#B87333]"></div>
                  <span className="text-sm font-mono text-neutral-300">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="w-full px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#333] pb-8">
            <h2 className="font-bebas text-7xl md:text-9xl text-[#222] stroke-text relative z-10" style={{ WebkitTextStroke: '1px #333' }}>
              ARSENAL
              <span className="absolute top-0 left-1 text-[#4A9E82] opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ WebkitTextStroke: '0px' }}>ARSENAL</span>
            </h2>
            <div className="font-mono text-[#B87333] mb-4 md:mb-2 text-right">
              {`// TECHNICAL_CAPABILITIES_V2.0`}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#4A9E82]/20 border border-[#4A9E82]/20">
            {portfolioData.skills.map((skillGroup, idx) => (
              <div key={skillGroup.category} className="bg-[#0c0c0c] p-8 hover:bg-[#111] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {idx === 0 && <Box size={64} />}
                  {idx === 1 && <GitBranch size={64} />}
                  {idx === 2 && <Server size={64} />}
                  {idx === 3 && <Terminal size={64} />}
                  {idx === 4 && <Network size={64} />}
                  {idx === 5 && <ShieldAlert size={64} />}
                </div>
                
                <h3 className="text-[#4A9E82] font-bold tracking-wider mb-6 flex items-center gap-2">
                  <span className="text-[#B87333]">0{idx + 1}.</span> {skillGroup.category.toUpperCase()}
                </h3>
                
                <ul className="space-y-3">
                  {skillGroup.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-neutral-400 font-mono text-sm group-hover:text-neutral-200 transition-colors">
                      <div className="w-1 h-1 bg-[#4A9E82]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B87333] group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0d0d0d] border-t border-[#4A9E82]/10">
        <div className="w-full px-4 md:px-12">
          <h2 className="font-bebas text-5xl md:text-6xl mb-16 text-[#e5e5e5]">
            OPERATIONAL <span className="copper-text">HISTORY</span>
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute left-[200px] top-0 bottom-0 w-px bg-[#4A9E82]/20"></div>

            <ul className="space-y-12">
              {portfolioData.experience.map((job, idx) => (
                <li 
                  key={`${job.company}-${job.period}`} 
                  className="relative group"
                  onMouseEnter={() => setHoveredExp(idx)}
                  onMouseLeave={() => setHoveredExp(null)}
                >
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    <div className="md:w-[200px] flex-shrink-0 pt-2 relative">
                      <div className={`hidden md:block absolute right-[-8.5px] top-3 w-4 h-4 bg-[#0d0d0d] border-2 transition-colors duration-300 z-10 ${hoveredExp === idx ? 'border-[#B87333] bg-[#B87333]' : 'border-[#4A9E82] bg-[#0d0d0d]'}`}></div>
                      <span className={`font-mono text-sm tracking-wider transition-colors duration-300 ${hoveredExp === idx ? 'text-[#B87333]' : 'text-neutral-500'}`}>
                        {job.period}
                      </span>
                    </div>

                    <div className="flex-1 border-l-2 md:border-l-0 border-[#4A9E82]/20 pl-6 md:pl-0">
                      <div className={`p-6 md:p-8 border transition-all duration-300 ${hoveredExp === idx ? 'border-[#4A9E82] bg-[#4A9E82]/5' : 'border-[#333] bg-[#111]'}`}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                          <h3 className="text-xl md:text-2xl font-bold text-[#e5e5e5] group-hover:text-[#4A9E82] transition-colors">
                            {job.title}
                          </h3>
                          <span className="text-sm font-mono text-neutral-500">{job.company}</span>
                        </div>
                        
                        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[#B87333]">
                          <span className="w-2 h-2 bg-[#B87333] rounded-full animate-pulse"></span>
                          {job.location}
                        </div>

                        <ul className="space-y-2 mb-6">
                          {job.achievements.map((achievement) => (
                            <li key={achievement} className="text-neutral-400 text-sm leading-relaxed pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-[#4A9E82] before:opacity-50">
                              {achievement}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#333] group-hover:border-[#4A9E82]/30 transition-colors">
                          {job.tech.map((t) => (
                            <span key={t} className="px-2 py-1 bg-[#0a0a0a] text-xs font-mono text-[#4A9E82] border border-[#4A9E82]/30">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#050505] pt-24 pb-12 border-t border-[#4A9E82]/30">
        <div className="w-full px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="font-bebas text-[12vw] leading-[0.8] text-[#4A9E82] opacity-90 mb-8">
                GET IN<br /><span className="text-[#B87333]">TOUCH</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-md mb-8">
                Ready to optimize your infrastructure? Let&apos;s discuss how we can build resilient, scalable systems together.
              </p>
              <a 
                href={`mailto:${portfolioData.email}`} 
                className="inline-flex items-center gap-3 text-2xl font-bold text-[#e5e5e5] hover:text-[#4A9E82] transition-colors border-b-2 border-[#4A9E82] pb-1"
              >
                {portfolioData.email} <ArrowRight className="w-6 h-6" />
              </a>
            </div>
            
            <div className="flex flex-col justify-end">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { icon: Github, label: "GITHUB", href: portfolioData.github, handle: portfolioData.githubHandle },
                  { icon: Linkedin, label: "LINKEDIN", href: portfolioData.linkedin, handle: portfolioData.linkedinHandle },
                  { icon: Mail, label: "EMAIL", href: `mailto:${portfolioData.email}`, handle: portfolioData.email }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    className="flex items-center justify-between p-6 border border-[#333] bg-[#0c0c0c] hover:border-[#B87333] hover:bg-[#B87333]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <social.icon className="w-6 h-6 text-[#4A9E82] group-hover:text-[#B87333] transition-colors" />
                      <span className="font-bebas text-xl tracking-wider text-neutral-300">{social.label}</span>
                    </div>
                    <span className="font-mono text-sm text-neutral-500 group-hover:text-[#e5e5e5] transition-colors">{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end border-t border-[#333] pt-8">
            <div className="flex flex-col gap-2 mb-8 md:mb-0">
              <span className="font-bebas text-2xl text-[#4A9E82]">RAYMOND CSIRAK</span>
              <span className="text-xs font-mono text-neutral-600">
                © {new Date().getFullYear()} ALL RIGHTS RESERVED.
              </span>
            </div>
            
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={`pulse-${i}`} 
                  className="w-2 h-12 bg-[#111]"
                  style={{ 
                    animation: `pulse 2s infinite ${i * 0.2}s`,
                    backgroundColor: i === 2 ? '#4A9E82' : '#111' 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
