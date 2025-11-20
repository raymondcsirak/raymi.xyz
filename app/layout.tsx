import type { Metadata } from 'next'
import { Press_Start_2P, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-pixel'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Raymi | DevOps Engineer',
  description: 'Senior DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and Kubernetes orchestration. Let\'s build something extraordinary.',
  generator: 'v0.app',
  keywords: ['DevOps', 'Cloud Engineer', 'Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Terraform', 'Infrastructure as Code'],
  authors: [{ name: 'Raymi' }],
  openGraph: {
    title: 'Raymi | DevOps Engineer',
    description: 'Senior DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and Kubernetes orchestration.',
    type: 'website',
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${pressStart.variable} ${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}