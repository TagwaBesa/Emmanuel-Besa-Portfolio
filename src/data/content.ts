export const site = {
  name: 'Emmanuel Besa',
  title: 'IT Support Technician | Microsoft 365 Administrator | IT Infrastructure Support | Web & Software Developer',
  location: 'Lusaka, Zambia',
  email: 'besaemmanuel99@gmail.com',
  phones: [
    { label: '0777 830 658', href: 'tel:+260777830658' },
    { label: '0953 223 654', href: 'tel:+260953223654' },
  ],
  whatsapp: 'https://wa.me/260777830658',
  // Add real profile URLs here; empty values render as "coming soon" chips.
  linkedin: '',
  github: '',
  cv: `${import.meta.env.BASE_URL}Emmanuel-Besa-CV.pdf`,
  statement: 'I build digital solutions, manage IT infrastructure, and help businesses use technology effectively.',
}

export type SectionId = 'home' | 'about' | 'services' | 'projects' | 'experience' | 'skills' | 'contact'

export const navLinks: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: 85, suffix: '+', label: 'Users supported' },
  { value: 3, suffix: '+', label: 'Professional environments' },
  { value: 6, suffix: '+', label: 'Core technology areas' },
]

export type ServiceIcon = 'web' | 'software' | 'infra' | 'm365' | 'consulting' | 'supply' | 'licensing'

export const services: { icon: ServiceIcon; title: string; text: string }[] = [
  {
    icon: 'web',
    title: 'Web Development',
    text: 'Business websites, portfolio websites, CMS platforms, responsive web applications, and ecommerce solutions.',
  },
  {
    icon: 'software',
    title: 'Software Development',
    text: 'Business systems, asset management systems, inventory systems, database applications, and custom software.',
  },
  {
    icon: 'infra',
    title: 'IT Infrastructure & Support',
    text: 'Desktop support, networking, troubleshooting, hardware configuration, and end-user support.',
  },
  {
    icon: 'm365',
    title: 'Microsoft 365 Administration',
    text: 'Microsoft 365 configuration, Exchange Online, Teams, SharePoint, Intune, Entra ID, and user administration.',
  },
  {
    icon: 'consulting',
    title: 'IT Consulting',
    text: 'Technology planning, IT assessments, systems recommendations, IT policies, and business technology consulting.',
  },
  {
    icon: 'supply',
    title: 'IT Equipment & Office Supplies',
    text: 'Supply of computers, laptops, printers, networking equipment, office equipment, stationery, and related accessories.',
  },
  {
    icon: 'licensing',
    title: 'Software Licensing',
    text: 'Software licence procurement, Microsoft licensing guidance, subscription management, and software deployment support.',
  },
]

export type ProjectCategory = 'Web Development' | 'Software Development' | 'IT Systems' | 'Business Solutions'
export type ProjectStatus = 'Completed' | 'In development'

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  client: string
  summary: string
  scope: string[]
  stack: string[]
  art: 'site' | 'assets' | 'attendance' | 'store' | 'pos' | 'property'
}

// Statuses and stacks below are working assumptions - confirm before publishing.
export const projects: Project[] = [
  {
    slug: 'adra-zambia-website',
    title: 'ADRA Zambia Website',
    category: 'Web Development',
    status: 'In development',
    client: 'ADRA Zambia (non-profit)',
    summary: 'A website project for a non-profit organisation.',
    scope: [
      'Public-facing website for a non-profit organisation',
      'Content managed through a CMS so staff can update pages',
      'Responsive layout for desktop and mobile visitors',
    ],
    stack: ['Laravel', 'Filament', 'MySQL'],
    art: 'site',
  },
  {
    slug: 'adra-asset-management-system',
    title: 'ADRA Asset Management System',
    category: 'IT Systems',
    status: 'In development',
    client: 'ADRA Zambia (internal)',
    summary:
      'A custom asset management application designed to improve IT inventory tracking, asset assignment, and reporting.',
    scope: ['IT inventory tracking', 'Asset assignment to users', 'Reporting on assets'],
    stack: ['PHP', 'MySQL', 'JavaScript'],
    art: 'assets',
  },
  {
    slug: 'silver-maple-attendance-system',
    title: 'Silver Maple College Attendance System',
    category: 'Software Development',
    status: 'Completed',
    client: 'Silver Maple College',
    summary: 'An attendance management solution for an educational institution.',
    scope: ['Attendance management for an educational institution', 'Database-backed records'],
    stack: ['PHP', 'MySQL', 'JavaScript'],
    art: 'attendance',
  },
  {
    slug: 'wila-wane-toy-book-store',
    title: 'Wila Wane Toy & Book Store',
    category: 'Web Development',
    status: 'Completed',
    client: 'Wila Wane Toy & Book Store',
    summary: 'A retail business web project.',
    scope: ['Web presence for a retail business', 'Responsive layout'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    art: 'store',
  },
  {
    slug: 'blue-note-cafe-pos-inventory',
    title: 'Blue Note Cafe POS & Inventory System',
    category: 'Business Solutions',
    status: 'In development',
    client: 'Blue Note Cafe',
    summary: 'A business system focused on point-of-sale and inventory operations.',
    scope: ['Point-of-sale operations', 'Inventory operations'],
    stack: ['PHP', 'MySQL', 'JavaScript'],
    art: 'pos',
  },
  {
    slug: 'lixer-engineering-properties',
    title: 'Lixer Engineering & Properties',
    category: 'Business Solutions',
    status: 'Completed',
    client: 'Lixer Engineering & Properties',
    summary: 'A business website and digital solution project.',
    scope: ['Business website', 'Supporting digital solution'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    art: 'property',
  },
]

export const experience = [
  {
    org: 'ADRA Zambia',
    role: 'IT Support Technician & Web Developer',
    period: 'June 2024 - Present',
    current: true,
    points: [
      'Provide IT infrastructure and end-user support for over 85 users across national office and field locations.',
      'Administer Microsoft 365 services including Exchange Online, Teams, SharePoint, Intune, Defender, and Entra ID.',
      'Diagnose and resolve hardware, software, network, printer, and Microsoft 365 issues.',
      'Led the migration of organisational email and data from IONOS to Microsoft 365.',
      'Maintain IT assets, software licences, warranties, and lifecycle records.',
      'Support LAN connectivity, wireless networks, conferencing systems, and office IT infrastructure.',
      'Develop IT policies, procedures, and technical documentation.',
      'Provide remote support and user training.',
      'Develop internal systems to improve organisational operations.',
    ],
  },
  {
    org: 'Skyway Technologies',
    role: 'IT Support Technician',
    period: '2017 - 2018, 2023',
    current: false,
    points: [
      'Desktop and end-user support.',
      'Hardware and software installation.',
      'Windows configuration.',
      'Computer and printer troubleshooting.',
      'LAN cabling and network infrastructure support.',
    ],
  },
  {
    org: 'Queensgate College & Silver Maple College',
    role: 'IT Support Technician',
    period: '2022',
    current: false,
    points: [
      'Staff and student technical support.',
      'Computer laboratory maintenance.',
      'Classroom technology support.',
      'Network troubleshooting.',
      'Digital learning platform support.',
      'Institutional website support.',
    ],
  },
]

export const skillGroups = [
  {
    title: 'Microsoft Technologies',
    items: ['Microsoft 365', 'Exchange Online', 'Teams', 'SharePoint', 'Intune', 'Entra ID', 'Defender'],
  },
  { title: 'Development', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'] },
  {
    title: 'Networking',
    items: ['TCP/IP', 'DNS', 'DHCP', 'LAN', 'VPN', 'Routers', 'Switches', 'Wireless networking'],
  },
  {
    title: 'IT Operations',
    items: ['Service Desk', 'Incident Management', 'IT Asset Management', 'Remote Support', 'Technical Documentation'],
  },
  { title: 'Operating Systems', items: ['Windows 10', 'Windows 11', 'Windows Server'] },
]

export const heroWords = ['BUILD', 'SUPPORT', 'DEVELOP', 'SOLVE']
export const floatingLabels = ['Microsoft 365', 'Entra ID', 'Intune', 'React', 'PHP', 'MySQL']
