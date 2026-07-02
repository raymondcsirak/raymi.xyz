export const portfolioData = {
  name: 'Raymond Csirak',
  alias: 'Raymi',
  title: 'DevOps/Platform Engineer',
  tagline: 'Building // Fixing Systems',
  subtitles: [
    'Orchestrating Infrastructure',
    'Automating Excellence',
  ],
  location: 'Satu Mare, Romania',
  yearsExperience: '15+',
  email: 'hello@raymi.xyz',
  github: 'https://github.com/raymondcsirak',
  githubHandle: 'raymondcsirak',
  linkedin: 'https://linkedin.com/in/raymondcsirak',
  linkedinHandle: 'raymondcsirak',
  resumeUrl: '/Raymond_Csirak.pdf',
  profileImg: '/profile.jpg',

  about: [
    'DevOps/Platform Engineer with over a decade of experience in systems administration, infrastructure optimization, and automation.',
    'Specialized in Kubernetes orchestration, Infrastructure as Code (IaC), CI/CD automation, and network engineering on bare-metal and cloud environments.',
    'Leader at Hexalab SRL driving modernization through GitOps workflows, container orchestration, and AI-powered tooling adoption across engineering teams.',
    'Passionate about cloud-native technologies, continuous improvement, and bridging technical implementation with business objectives. Fluent in Hungarian, Romanian, and English.',
  ],

  coreTags: ['Kubernetes', 'Docker', 'Terraform', 'Argo CD', 'GitLab CI', 'Helm'],

  skills: [
    {
      category: 'Container Orchestration',
      items: ['Kubernetes', 'Docker', 'Helm', 'Argo CD'],
    },
    {
      category: 'CI/CD & GitOps',
      items: ['GitLab CI', 'Argo CD', 'Kustomize', 'CI/CD Automations'],
    },
    {
      category: 'Infrastructure as Code',
      items: ['Terraform', 'IaC Practices', 'Bare-metal Setup', 'Automation'],
    },
    {
      category: 'Linux & Systems',
      items: ['Linux Administration', 'Virtualization', 'System Security', 'Scripting'],
    },
    {
      category: 'Network Engineering',
      items: ['Network Infrastructure', 'TCP/IP', 'Monitoring Solutions', 'Performance Optimization'],
    },
    {
      category: 'Operations & Strategy',
      items: ['Backup Strategies', 'Disaster Recovery', 'Level 3 Support', 'AI Tools Integration'],
    },
  ],

  experience: [
    {
      period: 'Mar 2022 - Present',
  title: 'DevOps Engineer',
      company: 'Hexalab SRL (Formerly Hitter Technologies)',
      location: 'Satu Mare, Romania',
      achievements: [
        'Manage Kubernetes clusters through Infrastructure as Code on bare-metal setups',
        'Package and deploy applications into Kubernetes, improving system functionality and availability',
        'Optimize CI/CD pipelines in GitLab and integrate with Argo CD, reducing deployment lead times',
        'Design and implement backup and disaster recovery strategies for improved data integrity',
        'Lead introduction and adoption of AI-powered tools across engineering team',
      ],
      tech: ['Kubernetes', 'GitLab CI', 'Argo CD', 'Terraform', 'Linux'],
    },
    {
      period: 'Jan 2019 - Mar 2024',
      title: 'Head of Infrastructure | Linux Systems Administrator',
      company: 'noLimits Technologies | Hexalab SRL',
      location: 'Satu Mare, Romania',
      achievements: [
        'Lead Level 3 technical support operations for business clients, maintaining SLAs',
        'Administer virtualization infrastructures to enhance resource utilization and efficiency',
        'Oversee Linux and network infrastructure management for optimal service delivery',
        'Direct IT project management initiatives aligned with organizational objectives',
        'Manage supplier relationships and procure technology solutions',
      ],
      tech: ['Linux', 'Virtualization', 'Network Engineering', 'Project Management'],
    },
    {
      period: 'Jun 2018 - Jan 2019',
      title: 'IT Service Manager, Level 2 Support Specialist',
      company: 'noLimits Technologies | Hitter Technologies',
      location: 'Satu Mare, Romania',
      achievements: [
        'Provided Level 2 technical support, resolving complex issues for high customer satisfaction',
        'Administered TCP/IP network configurations for seamless connectivity',
        'Executed IT project management for system upgrades and enhancements',
        'Managed helpdesk team ensuring minimal MTTR for optimal client satisfaction',
      ],
      tech: ['TCP/IP', 'Technical Support', 'Team Management'],
    },
    {
      period: 'Jan 2015 - Jan 2019',
      title: 'IT Support Specialist | Technical Sales Representative',
      company: 'noLimits Technologies',
      location: 'Satu Mare, Romania',
      achievements: [
        'Delivered Level 1 technical support to business clients with high service standards',
        'Managed ticketing systems to track and resolve customer service issues effectively',
        'Conducted software testing and validation ensuring quality and compliance',
        'Collaborated with sales teams providing technical expertise during consultations',
      ],
      tech: ['Ticketing Systems', 'Software Testing', 'Customer Service'],
    },
  ],
} as const
