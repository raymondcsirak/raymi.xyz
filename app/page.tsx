import Image from 'next/image'
import Link from 'next/link'

import { capabilities, experience, profile } from '@/lib/portfolio-data'

const acts = [
  {
    year: '2008',
    label: 'ACT I / LEARN THE MACHINE',
    title: <>Start close<br />to the metal.</>,
    copy: 'Technical support. Networks. Real users with real deadlines. The beginning of an operational instinct: listen carefully, isolate the failure, restore the work.',
    role: 'IT Service Technician',
    company: 'Ltt Halo',
  },
  {
    year: '2019',
    label: 'ACT II / OWN THE OUTCOME',
    title: <>From fixing systems<br />to shaping them.</>,
    copy: 'Infrastructure leadership across Linux, networking, virtualization, service delivery, and the teams responsible for all of it.',
    role: 'Head of Infrastructure | Linux Systems Administrator',
    company: 'noLimits Technologies · Hexalab SRL',
  },
  {
    year: '2022',
    label: 'ACT III / AUTOMATE THE PATH',
    title: <>Platforms,<br />not heroics.</>,
    copy: 'Kubernetes on bare metal. Infrastructure as Code. GitOps. Recovery plans. Automation that transfers knowledge instead of hiding it.',
    role: 'DevOps / Platform Engineer',
    company: 'Hexalab SRL',
  },
  {
    year: '2026',
    label: 'ACT IV / OPERATE AT SCALE',
    title: <>Reliability,<br />now.</>,
    copy: profile.current,
    role: profile.role,
    company: profile.company,
  },
]

export default function Page() {
  return (
    <main className="home-film film-page">
      <a className="film-skip" href="#home-film-content">Skip to content</a>

      <header className="home-film-header">
        <strong>RAYMOND CSIRÁK</strong>
        <span>A WORKING HISTORY, 2008—NOW</span>
      </header>

      <div id="home-film-content">
        <section className="home-film-hero">
          <div className="home-film-pixel-card">
            <Image
              src="/profile-pixel.webp"
              alt="Pixel-art portrait of Raymond Csirák"
              fill
              priority
              sizes="(max-width: 560px) calc(100vw - 36px), min(43vw, 640px)"
            />
          </div>
          <div className="home-film-shade" />
          <span>THE LONG UPTIME</span>
          <h1>Reliability<br />without the<br />theater<span className="home-film-hero-accent">.</span></h1>
          <p>{profile.role}<br />{profile.company}</p>
          <div className="home-film-scroll">A story in four acts <i /></div>
        </section>

        <section className="home-film-prologue">
          <span><b>01</b> / PROLOGUE</span>
          <blockquote>“The job was never keeping machines alive. It was keeping the work around them moving.”</blockquote>
          <p>{profile.intro}</p>
        </section>

        <section className="home-film-acts">
          <div className="home-film-section-title">
            <span><b>02</b> / THE FOUR ACTS</span>
            <p>Support became operations. Operations became infrastructure. Infrastructure became platforms built to last.</p>
          </div>

          {acts.map((act) => (
            <article className="home-film-act" key={act.year}>
              <div className="home-film-year" aria-hidden="true">{act.year}</div>
              <span>{act.label}</span>
              <h2>{act.title}</h2>
              <p>{act.copy}</p>
              <strong><span>{act.role}</span><small>{act.company}</small></strong>
            </article>
          ))}
        </section>

        <section className="home-film-sequence">
          <div className="home-film-sequence-title">
            <span><b>03</b> / THE SEQUENCE</span>
            <h2>The work,<br />in order.</h2>
          </div>

          <div className="home-film-sequence-list">
            {experience.map((item, index) => (
              <article key={item.company}>
                <b>0{index + 1}</b>
                <time>{item.period}</time>
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-film-language">
          <span><b>04</b> / WORKING VOCABULARY</span>
          <div>{capabilities.map((capability) => <b key={capability}>{capability}</b>)}</div>
        </section>

        <footer className="home-film-footer">
          <span>THE NEXT ACT</span>
          <p>Let’s build<br />something that lasts.</p>
          <nav aria-label="Profile links">
            <a href={profile.linkedin}>LinkedIn ↗</a>
            <a href={profile.github}>GitHub ↗</a>
            <Link href={profile.resume}>Résumé ↗</Link>
          </nav>
        </footer>
      </div>
    </main>
  )
}
