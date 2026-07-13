export interface ExperienceItem {
  role: string
  company: string
  period: string
  summary: string
}

export const profile = {
  role: 'Senior Site Reliability Engineer',
  company: 'GoDaddy LLC',
  github: 'https://github.com/raymondcsirak',
  linkedin: 'https://linkedin.com/in/raymondcsirak',
  resume: '/Raymond_Csirak.pdf',
  intro:
    'I build and operate infrastructure that stays understandable under pressure — from Linux and private cloud to Kubernetes, automation, and the teams around them.',
  current:
    'Building, running, and supporting large-scale OpenStack private cloud infrastructure; developing deployment automation with Puppet and Ansible, and infrastructure tooling in Python.',
}

export const capabilities = [
  'Site Reliability',
  'OpenStack',
  'Kubernetes',
  'Linux',
  'Puppet & Ansible',
  'Python tooling',
  'Infrastructure as Code',
  'GitOps & CI/CD',
  'Network engineering',
  'Backup & recovery',
]

export const experience: ExperienceItem[] = [
  {
    role: 'Senior Site Reliability Engineer',
    company: 'GoDaddy LLC',
    period: 'May 2026 — Present',
    summary: 'Private cloud operations, OpenStack, deployment automation, and Python infrastructure tooling.',
  },
  {
    role: 'DevOps / Platform Engineer',
    company: 'Hexalab SRL',
    period: 'Mar 2022 — May 2026',
    summary: 'Kubernetes on bare metal, IaC, GitLab CI, Argo CD, disaster recovery, and engineering-wide AI tooling adoption.',
  },
  {
    role: 'Head of Infrastructure',
    company: 'noLimits Technologies · Hexalab',
    period: 'Jan 2019 — Mar 2024',
    summary: 'Linux and network infrastructure, virtualization, Level 3 operations, IT delivery, and technical leadership.',
  },
]
