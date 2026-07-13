import type { Metadata } from 'next'

import './globals.css'
import './long-uptime.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://raymi.xyz'),
  title: {
    default: 'Raymond Csirák | Senior Site Reliability Engineer',
    template: '%s | Raymond Csirák'
  },
  description: 'Senior Site Reliability Engineer building and operating reliable private cloud, Linux, Kubernetes, and infrastructure automation.',
  generator: 'Next.js',
  applicationName: 'Raymi.xyz',
  referrer: 'origin-when-cross-origin',
  keywords: ['DevOps', 'Cloud Engineer', 'Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Terraform', 'Infrastructure as Code', 'SRE', 'Site Reliability Engineering'],
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
    title: 'Raymond Csirák | Senior Site Reliability Engineer',
    description: 'Seventeen years inside infrastructure: Linux, private cloud, Kubernetes, automation, and the teams around them.',
    url: 'https://raymi.xyz',
    siteName: 'Raymi.xyz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Raymond Csirák | Senior Site Reliability Engineer',
    description: 'Seventeen years inside infrastructure: Linux, private cloud, Kubernetes, automation, and the teams around them.',
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
    name: 'Raymond Csirák',
    alternateName: 'Raymi',
    url: 'https://raymi.xyz',
    jobTitle: 'Senior Site Reliability Engineer',
    sameAs: [
      'https://github.com/raymondcsirak',
      'https://linkedin.com/in/raymondcsirak',
      'https://raymi.xyz'
    ],
    description: 'Senior Site Reliability Engineer building and operating reliable private cloud, Linux, Kubernetes, and infrastructure automation.',
    knowsAbout: ['Site Reliability Engineering', 'OpenStack', 'Linux', 'Kubernetes', 'Infrastructure as Code', 'Puppet', 'Ansible', 'Python']
  }

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
