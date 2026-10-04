export interface Project {
	title: string
	href: string
	githubUrl?: string
	description: string
	imageUrl: string
	tags: string[]
	category?: 'apps' | 'tools'
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

export interface EducationItem {
	school: string
	degree: string
}

export const linkedInUrl = 'https://www.linkedin.com/in/jeffhogg/'
export const githubUrl = 'https://github.com/jeffreyehogg'
export const twitterUrl = 'https://x.com/jeffehogg'
export const xUrl = twitterUrl

export const profileData = {
	name: 'Jeff Hogg',
	role: 'Full-Stack Developer',
	specialization: 'DevOps, System Architecture & API Integration',
	location: 'The Woodlands, TX',
	status: 'Full-Stack Developer @ LGI Homes',
	headline:
		'Engineering scalable React and Node.js applications, dedicated API middleware, and automated CI/CD pipelines — modernizing enterprise systems from the ground up.',
	bio:
		'Full-Stack Developer with enterprise engineering experience across modern React/Node.js applications, legacy system migrations, and relational databases. Extensive background leading end-to-end delivery: building dedicated API middleware, automating CI/CD pipelines, and leveraging AI-assisted developer tooling to optimize SQL stored procedures.',
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
			'Managing, maintaining, and tuning distributed Microsoft SQL Server and MySQL databases, leveraging MCP tooling to profile queries and refactor stored procedures.',
		stats: 'Fast Query Response',
		technologies: ['MS SQL Server', 'MySQL', 'MCP Tooling', 'Stored Procedures', 'PostgreSQL'],
	},
	{
		id: 'agentic-engineering',
		title: 'AI Tooling & MCP Protocols',
		badge: 'Velocity',
		description:
			'Pioneering Model Context Protocol (MCP) tooling and AI-assisted developer methodologies to accelerate stored procedure optimization, complex query debugging, refactoring, and QA.',
		stats: '10x Engineering Velocity',
		technologies: ['Model Context Protocol (MCP)', 'Prompt Architecture', 'Code Refactoring', 'Automated QA'],
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
			'Leading legacy infrastructure modernization, API middleware engineering, and distributed database administration.',
		highlights: [
			'DevOps & CI/CD: Modernized legacy infrastructure via Git and GitHub Actions CI/CD; architected Docker/Nginx container environments with automated SSL and external DNS management.',
			'Full-Stack Feature Development: Engineered full-stack feature releases for internal business applications with modernized frontends.',
			'API & Middleware Engineering: Developed custom Node.js and TypeScript middleware to integrate third-party APIs with on-premise Microsoft SQL Server databases.',
			'Database Administration & Tuning: Administered Microsoft SQL Server and MySQL databases, leveraging MCP tooling to profile queries and refactor stored procedures.',
		],
		technologies: [
			'TypeScript',
			'JavaScript',
			'Node.js',
			'Docker',
			'Nginx',
			'GitHub Actions',
			'CI/CD',
			'MS SQL Server',
			'MySQL',
			'REST APIs',
			'MCP Tooling',
		],
	},
	{
		company: 'Freelance',
		role: 'Software Developer',
		period: 'July 2024 - February 2026',
		location: 'The Woodlands, TX',
		current: false,
		summary:
			'Partnered directly with enterprise clients to architect custom web applications, launch e-commerce solutions, and execute legacy data migrations.',
		highlights: [
			'Full-Stack Web Development: Architected and deployed custom web apps using Next.js and Vercel for serverless CI/CD and production hosting.',
			'E-Commerce Engineering: Built and launched a Shopify store, customizing frontend architecture to improve user checkout workflows.',
			'Data Migration & ETL: Engineered custom Python and SQL data migration scripts to extract, format, and load legacy data into modern systems.',
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
		role: 'Software Engineer',
		period: 'December 2021 - June 2024',
		location: 'Spring, TX',
		current: false,
		summary:
			'Engineered scalable enterprise administration features within Cisco Control Hub for the Webex Calling product ecosystem.',
		highlights: [
			'Enterprise Frontend: Developed scalable enterprise administration features for Cisco Control Hub using Angular and TypeScript.',
			'Quality Assurance & CI/CD: Engineered Cypress end-to-end testing suites and monitored Jenkins CI/CD deployment pipelines.',
			'Platform Reliability & Agile: Maintained platform uptime using Kibana and PagerDuty; partnered across cross-functional Agile teams delivering features via Jira and Confluence.',
		],
		technologies: [
			'Angular',
			'TypeScript',
			'Cypress',
			'Jenkins',
			'Kibana',
			'PagerDuty',
			'Agile/Scrum',
			'Jira',
			'Confluence',
		],
	},
	{
		company: 'Cisco',
		role: 'Technical Director / Camera Op',
		period: 'June 2013 - December 2021',
		location: 'Spring, TX',
		current: false,
		summary:
			'Directed technical broadcast operations for live multi-camera studio productions, executive communications, and enterprise-scale audiences.',
		highlights: [
			'Broadcast Operations: Operated cameras and directed technical broadcast operations for live multi-camera studio productions, executive communications, and enterprise-scale audiences.',
		],
		technologies: [
			'Studio Production',
			'Live Broadcasting',
			'Executive Communications',
			'Multi-Camera Systems',
		],
	},
]

export const projectsData: Project[] = [
	{
		title: 'AutoDBA',
		category: 'tools',
		href: 'https://autodba.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/autodba',
		description:
			'AI-powered database assistant that analyzes SQL queries, identifies performance bottlenecks, and recommends index optimizations.',
		imageUrl: '/images/projects/autodba.png',
		tags: ['Next.js', 'Python', 'FastAPI', 'AI'],
		featured: true,
	},
	{
		title: 'Kingdom Connect',
		category: 'apps',
		href: 'https://kingdom.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/kingdom-connect',
		description:
			'Community engagement platform featuring a volunteer signup board, transparent mission funding, and a shared community prayer wall.',
		imageUrl: '/images/projects/kingdom-connect.png',
		tags: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS'],
		featured: true,
	},
	{
		title: 'Legacy Link',
		category: 'tools',
		href: 'https://legacy-link.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/legacy-link',
		description:
			'Data migration tool for building security systems, allowing teams to map, clean, and transfer badge and access records in minutes.',
		imageUrl: '/images/projects/legacy-link.png',
		tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Clerk'],
		featured: true,
	},
	{
		title: 'ForexFlow FX Dashboard',
		category: 'apps',
		href: 'https://forexflow-dashboard.vercel.app/',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/forexflow-dashboard',
		description:
			'Real-time foreign exchange dashboard displaying live currency exchange rates, interactive trend charts, and market depth.',
		imageUrl: '/images/projects/forexflow.png',
		tags: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Chart.js'],
		featured: false,
	},
	{
		title: 'Hogg Homes',
		category: 'apps',
		href: 'https://homes.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/hogg-homes',
		description:
			'Modern real estate platform for homebuilders, featuring searchable communities, interactive architectural elevations, and tour scheduling.',
		imageUrl: '/images/projects/hogg-homes.png',
		tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
		featured: false,
	},
	{
		title: 'Texas Tint Plus',
		category: 'apps',
		href: 'https://texastint.com',
		githubUrl: 'https://github.com/jeffreyehogg/texas-tint',
		description:
			'Commercial and residential window film platform for a Houston-area business, featuring an interactive quote estimator and service catalog.',
		imageUrl: '/images/projects/texas-tint.png',
		tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
		featured: false,
	},
	{
		title: 'Vision Integrated Systems',
		category: 'apps',
		href: 'https://vision-texas.com/',
		description:
			'Corporate website for a commercial security and audio-visual provider, designed for fast load times and clean presentation across all devices.',
		imageUrl: '/images/projects/vision.png',
		tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
		featured: false,
	},
	{
		title: 'Developer Portfolio & Monorepo',
		category: 'tools',
		href: 'https://www.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio',
		description:
			'The multi-project codebase behind this portfolio, uniting several web applications into a single shared repository with automated deployment.',
		imageUrl: '/images/projects/portfolio.png',
		tags: ['Turborepo', 'Next.js', 'TypeScript', 'Tailwind CSS'],
		featured: false,
	},
	{
		title: 'Webex Control Hub',
		category: 'tools',
		href: 'https://www.webex.com/control-hub.html',
		description:
			'Enterprise management portal for IT administrators to manage users, devices, and calling services across Cisco’s Webex ecosystem.',
		imageUrl: '/images/projects/controlhub.png',
		tags: ['Angular', 'TypeScript', 'Cypress', 'Enterprise'],
		featured: false,
	},
]

export const skillsData: SkillCategory[] = [
	{
		category: 'Languages & Frameworks',
		list: 'TypeScript, JavaScript, Node.js, React, Next.js, Angular, Python, Tailwind CSS',
	},
	{
		category: 'Databases & DevOps',
		list: 'Microsoft SQL Server, MySQL, Docker, Nginx, GitHub Actions, CI/CD, Git, Vercel',
	},
	{
		category: 'Tools & Practices',
		list: 'REST APIs, Model Context Protocol (MCP), Cypress, Kibana, Jenkins, PagerDuty, Agile/Scrum',
	},
]

export const educationData: EducationItem[] = [
	{
		school: 'San Francisco State University',
		degree: 'B.A. in Broadcast & Electronic Communication Arts',
	},
]

export const trustedCompaniesData: CompanyLogo[] = [
	{
		name: 'LGI Homes',
		imageUrl: '/images/logos/lgi-homes.svg',
		width: 160,
		height: 80,
	},
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
			'Fast page load times',
		],
		cta: 'Start a Project',
		mostPopular: false,
	},
]