import type { Metadata } from 'next'
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://raymi.xyz'),
  title: {
    default: 'Raymond Csirak | DevOps Engineer',
    template: '%s | Raymond Csirak',
  },
  description:
    "Senior DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and Kubernetes orchestration. Let's build something extraordinary.",
  generator: 'Next.js',
  applicationName: 'Raymi.xyz',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'DevOps',
    'Cloud Engineer',
    'Kubernetes',
    'Docker',
    'CI/CD',
    'AWS',
    'Terraform',
    'Infrastructure as Code',
    'SRE',
    'Site Reliability Engineering',
  ],
  authors: [{ name: 'Raymi', url: 'https://raymi.xyz' }],
  creator: 'Raymi',
  publisher: 'Raymi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Raymond Csirak | DevOps Engineer',
    description:
      'Senior DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and Kubernetes orchestration.',
    url: 'https://raymi.xyz',
    siteName: 'Raymi.xyz',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Raymond Csirak - DevOps Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raymond Csirak | DevOps Engineer',
    description:
      'Senior DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and Kubernetes orchestration.',
    creator: '@raymondcsirak',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raymond Csirak',
    alternateName: 'Raymi',
    url: 'https://raymi.xyz',
    jobTitle: 'DevOps Engineer',
    sameAs: [
      'https://github.com/raymondcsirak',
      'https://linkedin.com/in/raymondcsirak',
      'https://raymi.xyz',
    ],
    description:
      'Senior DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and Kubernetes orchestration.',
    knowsAbout: [
      'DevOps',
      'Cloud Computing',
      'Kubernetes',
      'Docker',
      'AWS',
      'CI/CD',
      'Terraform',
    ],
  }

  return (
    <html lang="en" className="dark">
      <body
        className={`${bricolage.variable} ${jetbrainsMono.variable} font-mono antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
