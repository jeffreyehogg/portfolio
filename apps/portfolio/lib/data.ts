export interface Project {
	title: string
	href: string
	githubUrl?: string
	description: string
	imageUrl: string
	tags: string[]
	learnings?: string
	featured?: boolean
	metrics?: string
}

export interface ExperienceItem {
	role: string
	company: string
	period: string
	location: string
	current: boolean
	summary: string
	highlights: string[]
	technologies: string[]
}

export interface EngineeringPillar {
	id: string
	title: string
	badge: string
	description: string
	stats?: string
	technologies: string[]
}

export interface ServiceTier {
	title: string
	description: string
	features: string[]
	cta: string
	mostPopular: boolean
}

export interface Testimonial {
	name: string
	company: string
	testimonial: string
	image: string
}

export interface CompanyLogo {
	name: string
	imageUrl: string
	width: number
	height: number
}

export interface SkillCategory {
	category: string
	list: string
}

export const linkedInUrl = 'https://www.linkedin.com/in/jeffreyehogg/'
export const githubUrl = 'https://github.com/jeffreyehogg'
export const twitterUrl = 'https://twitter.com/jeffreyehogg'
export const emailAddress = 'jeffhogg86@gmail.com'

export const profileData = {
	name: 'Jeff Hogg',
	role: 'Full-Stack Developer',
	specialization: 'DevOps, System Architecture & API Integration',
	location: 'Greater Houston, TX',
	status: 'Full-Stack Developer @ LGI Homes',
	headline:
		'Modernizing legacy architectures, building resilient API layers, and driving end-to-end system automation.',
	bio:
		'As a Full-Stack Developer at LGI Homes, I specialize in modernizing legacy architectures, building robust API layers, and driving end-to-end DevOps automation. From containerizing environments (Docker/Nginx) and developing custom Node.js/TypeScript middleware to managing distributed Microsoft SQL Server and MySQL databases, I bridge full-stack engineering with operational reliability. I actively leverage agentic IDE workflows to accelerate optimization, query debugging, and code refactoring.',
}

export const engineeringPillars: EngineeringPillar[] = [
	{
		id: 'devops-cicd',
		title: 'DevOps & CI/CD Automation',
		badge: 'Infrastructure',
		description:
			'Transitioning manual, server-direct deployments to automated, Git-based version control with self-hosted GitHub Runners and GitHub Actions for continuous delivery.',
		stats: 'Zero-Downtime Pipelines',
		technologies: ['GitHub Actions', 'Self-Hosted Runners', 'Docker', 'Nginx', 'Linux', 'SSL/DNS'],
	},
	{
		id: 'api-middleware',
		title: 'API & Middleware Architecture',
		badge: 'Backend Integration',
		description:
			'Designing dedicated API layers and high-throughput Node.js/TypeScript middleware to securely ingest, sanitize, and synchronize 3rd-party data into distributed environments.',
		stats: 'Secure Enterprise Sync',
		technologies: ['Node.js', 'TypeScript', 'REST APIs', 'Express', 'JSONB Ingestion'],
	},
	{
		id: 'database-systems',
		title: 'Database Administration & Tuning',
		badge: 'Data Layer',
		description:
			'Managing, maintaining, and tuning distributed Microsoft SQL Server and MySQL databases, with automated query profiling and stored procedure optimization.',
		stats: 'Sub-second Query Speeds',
		technologies: ['MS SQL Server', 'MySQL', 'PostgreSQL', 'Drizzle ORM', 'Stored Procedures'],
	},
	{
		id: 'agentic-engineering',
		title: 'Agentic IDE Workflows',
		badge: 'Productivity',
		description:
			'Pioneering modern AI-assisted engineering methodologies to accelerate stored procedure optimization, complex query debugging, refactoring, and test generation.',
		stats: '10x Engineering Velocity',
		technologies: ['Agentic Workflows', 'Prompt Architecture', 'Code Refactoring', 'Automated QA'],
	},
]

export const experienceData: ExperienceItem[] = [
	{
		company: 'LGI Homes',
		role: 'Full-Stack Developer (Web & Data Administrator)',
		period: 'March 2026 - Present',
		location: 'The Woodlands, TX',
		current: true,
		summary:
			'Bridging the gap between full-stack development, database administration, and DevOps infrastructure.',
		highlights: [
			'DevOps & CI/CD: Modernized legacy infrastructure by transitioning manual, server-direct codebases to Git-based version control; designed and implemented automated CI/CD pipelines with self-hosted GitHub Runners and GitHub Actions to dramatically accelerate developer workflows.',
			'Full-Stack Feature Development: Architected and deployed feature releases for internal web applications, seamlessly integrating complex leasing operation data while modernizing the user interface.',
			'API & Middleware Engineering: Designed a dedicated API layer and developed a custom Node.js and TypeScript middleware integration to securely query 3rd-party APIs, extracting and syncing organizational data into a distributed Microsoft SQL Server environment.',
			'Database Administration & Optimization: Manage, maintain, and optimize on-premise Microsoft SQL Server and MySQL databases. Actively leverage agentic IDE workflows for stored procedure optimization, complex query debugging, and code refactoring.',
			'System Architecture & Operations: Oversee containerized services (Docker/Nginx), external DNS, and SSL renewals, scaling infrastructure capabilities and advocating for modern engineering practices.',
		],
		technologies: [
			'TypeScript',
			'Node.js',
			'Docker',
			'Nginx',
			'GitHub Actions',
			'MS SQL Server',
			'MySQL',
			'CI/CD',
			'Agentic Workflows',
		],
	},
	{
		company: 'Self-Employed',
		role: 'Freelance Software Developer',
		period: 'July 2024 - February 2026',
		location: 'The Woodlands, TX',
		current: false,
		summary:
			'Partnered directly with enterprise clients and businesses to architect custom web applications, execute data migrations, and build modern e-commerce solutions.',
		highlights: [
			'Full-Stack Web Development: Architected and deployed 5+ custom web applications utilizing Next.js, leveraging Vercel for seamless CI/CD, serverless infrastructure, and high-performance hosting.',
			'E-Commerce Engineering: Designed and launched a complete e-commerce platform using Shopify, customizing storefront architecture to optimize user experience and streamline digital sales.',
			'Data Migration & Integration: Executed complex data migrations for enterprise clients, writing custom Python and SQL scripts to extract, format, and reliably import legacy datasets into modern systems.',
			'Technical Consulting: Partnered directly with business stakeholders to translate complex requirements into actionable Scopes of Work (SOW), managing end-to-end project lifecycles to ensure on-time delivery.',
		],
		technologies: [
			'Next.js',
			'React',
			'TypeScript',
			'Python',
			'SQL',
			'Vercel',
			'Tailwind CSS',
			'Shopify',
		],
	},
	{
		company: 'Cisco',
		role: 'Software Engineer (Webex Calling)',
		period: 'December 2021 - June 2024',
		location: 'Spring, TX',
		current: false,
		summary:
			'Engineered scalable enterprise administration features within Cisco Control Hub for the Webex Calling product ecosystem.',
		highlights: [
			'Front-End Development: Engineered scalable features for Cisco Control Hub within the Webex Calling team, utilizing Angular and TypeScript to deliver seamless administration tools for enterprise customers.',
			'Quality Assurance & CI/CD: Implemented comprehensive end-to-end testing suites using Cypress and maintained build pipelines in Jenkins to prevent regressions and ensure high-confidence deployments.',
			'Production Operations: Monitored system health and troubleshooting logs via Kibana, while managing incident response and alerts through PagerDuty to maintain platform reliability.',
			'Agile Collaboration: Actively contributed to daily standups, sprint planning, and rigorous code reviews in a high-scale enterprise environment.',
		],
		technologies: [
			'Angular',
			'TypeScript',
			'Cypress',
			'Jenkins',
			'Kibana',
			'PagerDuty',
			'Jira',
			'Enterprise SaaS',
		],
	},
]

export const projectsData: Project[] = [
	{
		title: 'Legacy Link',
		href: 'https://legacy-link.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/legacy-link',
		description:
			'A specialized middleware utility designed to modernize physical security data migration. Ingests raw exports from legacy systems (Lenel, DNA Fusion) and provides an interactive visual interface to map, sanitize, and transform data for import into Genetec, reducing days of manual work to minutes.',
		imageUrl: '/images/projects/legacy-link.png',
		tags: ['Next.js', 'TypeScript', 'PostgreSQL JSONB', 'Clerk', 'PapaParse'],
		learnings:
			'Architected a flexible data schema using PostgreSQL JSONB to ingest unpredictable legacy datasets without schema migrations. Built a stateful wizard interface for complex data mapping and implemented secure, signed file handling for sensitive records.',
		featured: true,
		metrics: 'Reduces data migration from days to minutes',
	},
	{
		title: 'Kingdom Connect',
		href: 'https://kingdom.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/kingdom-connect',
		description:
			'A unified digital faith platform combining community volunteer coordination, kingdom fundraising, a public prayer wall, and an interactive personal prayer journal with drag-and-drop prioritization.',
		imageUrl: '/images/projects/kingdom-connect.png',
		tags: ['Next.js', 'Clerk', 'Neon Postgres', 'Drizzle ORM', 'Tailwind CSS', 'dnd-kit', 'Server Actions'],
		learnings:
			'Unified community volunteering and devotional journaling into a single serverless PostgreSQL architecture with Neon, type-safe Drizzle ORM mutations, Clerk multi-tenancy, and optimistic drag-and-drop state machines.',
		featured: true,
		metrics: 'Unified serverless faith platform',
	},
	{
		title: 'Webex Control Hub',
		href: 'https://www.webex.com/control-hub.html',
		description:
			'An enterprise-grade platform for global IT administrators to manage users, devices, calling routes, and security services across the Webex enterprise ecosystem.',
		imageUrl: '/images/projects/controlhub.png',
		tags: ['Angular', 'TypeScript', 'Cypress', 'Jenkins', 'Enterprise SaaS'],
		learnings:
			'Delivered mission-critical features with strict enterprise scalability, accessibility, and high test coverage via Cypress E2E automation in Jenkins.',
		featured: true,
		metrics: 'Powers administration for millions of users worldwide',
	},
	{
		title: 'ForexFlow Dashboard',
		href: 'https://forexflow-dashboard.vercel.app/',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/forexflow-dashboard',
		description:
			'A real-time currency exchange analytics dashboard tracking institutional exchange rates with live updates, 24-hour high/low telemetry, and interactive visual trends.',
		imageUrl: '/images/projects/forexflow.png',
		tags: ['Nuxt', 'Vue', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
		learnings:
			'Implemented secure server-side API proxying in Nuxt and integrated Chart.js with client-only hydration for real-time streaming data visualization.',
		featured: false,
		metrics: 'Live streaming telemetry & analytics',
	},
	{
		title: 'Vision Integrated Systems',
		href: 'https://vision-texas.com/',
		description:
			'Official corporate platform for Vision Integrated Systems, a leading provider of enterprise structured cabling, security solutions, and commercial AV.',
		imageUrl: '/images/projects/vision.png',
		tags: ['Next.js', 'React 19', 'Tailwind CSS', 'Framer Motion'],
		learnings:
			'Focused on component modularity, SEO optimization, and sub-second load times to deliver an accessible corporate web presence.',
		featured: false,
		metrics: 'Enterprise corporate web presence',
	},
	{
		title: 'Engineering Monorepo & Portfolio Platform',
		href: 'https://jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio',
		description:
			'An enterprise-grade Turborepo monorepo orchestrating 4 production applications (Next.js 16, Nuxt 3, React 19) with pnpm workspaces, remote build caching, shared configurations, and automated Vercel CI/CD.',
		imageUrl: '/images/projects/portfolio.png',
		tags: ['Turborepo', 'pnpm Workspaces', 'Next.js', 'Nuxt', 'TypeScript'],
		learnings:
			'Architected a multi-app monorepo with Turborepo task pipeline caching, independent Vercel deployment detection, shared ESLint/TS configs, and automated agentic protocols.',
		featured: false,
		metrics: 'Turborepo 4-App Architecture',
	},
]

export const skillsData: SkillCategory[] = [
	{
		category: 'Languages & Frameworks',
		list: 'TypeScript, JavaScript, React, Next.js, Node.js, Angular, Python, Express, SQL, HTML5/CSS3',
	},
	{
		category: 'DevOps & Infrastructure',
		list: 'Docker, Nginx, GitHub Actions, Self-Hosted Runners, Linux, CI/CD Pipelines, Turborepo, Monorepo Architecture, DNS & SSL Management, Vercel, Jenkins',
	},
	{
		category: 'Databases & ORMs',
		list: 'Microsoft SQL Server, MySQL, PostgreSQL, Neon, Drizzle ORM, Supabase, Prisma, Stored Procedures, JSONB Ingestion',
	},
	{
		category: 'Testing & Platform Operations',
		list: 'Cypress E2E, Kibana, PagerDuty, Git, REST APIs, Jira, Confluence, Agentic IDE Workflows',
	},
]

export const trustedCompaniesData: CompanyLogo[] = [
	{
		name: 'Cisco',
		imageUrl: '/images/logos/cisco.webp',
		width: 160,
		height: 80,
	},
	{
		name: 'Vision Integrated Systems',
		imageUrl: '/images/logos/vision.webp',
		width: 180,
		height: 80,
	},
	{
		name: 'San Francisco 49ers',
		imageUrl: '/images/logos/49ers.webp',
		width: 160,
		height: 80,
	},
	{
		name: 'Golden State Warriors',
		imageUrl: '/images/logos/warriors.webp',
		width: 160,
		height: 80,
	},
	{
		name: 'San Francisco Giants',
		imageUrl: '/images/logos/giants.webp',
		width: 160,
		height: 80,
	},
	{
		name: 'ESPN',
		imageUrl: '/images/logos/ESPN.webp',
		width: 160,
		height: 80,
	},
	{
		name: 'FOX Sports',
		imageUrl: '/images/logos/FOX.webp',
		width: 160,
		height: 80,
	},
	{
		name: 'NBC Sports Bay Area',
		imageUrl: '/images/logos/NBC.webp',
		width: 160,
		height: 80,
	},
]

export const servicesData: ServiceTier[] = [
	{
		title: 'System Modernization & DevOps',
		description:
			'Transition manual deployments into automated CI/CD pipelines with containerized environments and Git workflows.',
		features: [
			'CI/CD automation (GitHub Actions)',
			'Docker & Nginx containerization',
			'Legacy server modernization',
			'Monitoring & incident alerting',
		],
		cta: 'Discuss Infrastructure',
		mostPopular: true,
	},
	{
		title: 'API & Middleware Architecture',
		description:
			'Custom backend integrations to synchronize disparate systems, sanitize legacy datasets, and connect 3rd-party services.',
		features: [
			'Custom Node.js/TypeScript middleware',
			'Distributed MS SQL & MySQL syncing',
			'Secure REST API design',
			'Complex data transformation & migration',
		],
		cta: 'Discuss Integration',
		mostPopular: false,
	},
	{
		title: 'Full-Stack Web Applications',
		description:
			'High-performance web applications built with Next.js, React 19, and serverless databases.',
		features: [
			'Modern Next.js App Router & Server Actions',
			'Type-safe database architecture (Drizzle/Neon)',
			'Secure user authentication',
			'Sub-second page load times',
		],
		cta: 'Start a Project',
		mostPopular: false,
	},
]

export const testimonialsData: Testimonial[] = [
	{
		name: 'Elon Musk',
		company: 'SpaceX',
		testimonial:
			'Jeff is a great guy, I would hire him in a heartbeat if he would return my calls.',
		image: '/images/headshots/elonmusk.jpeg',
	},
	{
		name: 'Tim Cook',
		company: 'Apple',
		testimonial: "Wow, he is amazing! I'm surprised he's not my boss yet!",
		image: '/images/headshots/timcook.png',
	},
	{
		name: 'Chuck Robbins',
		company: 'Cisco',
		testimonial:
			"Jeff is probably the best developer I have ever met. He's definitely my best hire.",
		image: '/images/headshots/chuckrobbins.jpeg',
	},
]