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
	highlights?: string[]
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
	organization?: string
	imageUrl?: string
	width?: number
	height?: number
	role: string
	period: string
	badge: string
	impact: string
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
		title: 'AlgoQuest',
		category: 'apps',
		href: 'https://algoquest.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/portfolio/tree/main/apps/algoquest',
		description:
			'An interactive, gamified algorithm and programming language learning quest built with in-browser Pyodide WebAssembly and TypeScript.',
		imageUrl: '/images/projects/algoquest.png',
		tags: [
			'Next.js 16',
			'React 19',
			'Python WASM (Pyodide)',
			'TypeScript',
			'Web Workers',
			'CodeMirror',
			'Framer Motion',
			'Clerk',
		],
		metrics: '100% In-Browser WASM • Zero-Server Cost • Multi-Language Quest',
		highlights: [
			'Executes untrusted Python and TypeScript code entirely client-side inside isolated Web Workers via Pyodide WebAssembly with zero backend compute cost.',
			'Features a custom CodeMirror 6 IDE with real-time AST verification, unit test runners, and instant execution telemetry.',
			'Persists user XP, streak progression, and completed algorithmic challenges across sessions with Clerk authentication and Zustand state.',
		],
		featured: true,
	},
	{
		title: 'AutoDBA',
		category: 'tools',
		href: 'https://autodba.jeffhogg.com',
		githubUrl: 'https://github.com/jeffreyehogg/autodba-mcp',
		description:
			'Private SQL optimizer and standalone MCP server (uvx autodba-mcp). Speeds up slow queries and builds background indexes without needing database passwords or exposing private data.',
		imageUrl: '/images/projects/autodba.png',
		tags: ['MCP Server', 'Python', 'sqlglot', 'Next.js 16', 'FastAPI'],
		metrics: 'Standalone MCP Server • Zero DB Connection • Published on PyPI',
		highlights: [
			'Published on PyPI (`uvx autodba-mcp`) as a zero-credential Model Context Protocol server for AI coding agents and IDEs.',
			'Parses and rewrites complex SQL ASTs across PostgreSQL, MySQL, and MS SQL Server dialects using `sqlglot` without connecting to production databases.',
			'Generates non-blocking `CREATE INDEX CONCURRENTLY` DDL recommendations and execution plan diagnostics in milliseconds.',
		],
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
		tags: ['Next.js 16', 'React 19', 'PostgreSQL', 'Drizzle ORM', 'Clerk', 'Tailwind CSS'],
		metrics: 'Serverless Postgres • Real-Time Community Wall • Role-Based Auth',
		highlights: [
			'Architected with Next.js 16 App Router, React 19 Server Actions, and Zod schema validation for end-to-end type safety.',
			'Backed by Neon serverless PostgreSQL and Drizzle ORM with optimistic UI updates across volunteer shifts and mission funding.',
			'Includes both a public Community Prayer Wall and an encrypted Personal Prayer Journal gated by Clerk authentication.',
		],
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
		tags: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Clerk', 'CSV/ETL'],
		metrics: '37-Bit Credential Preservation • Automated Schema Mapping • ETL Pipeline',
		highlights: [
			'Prevents 37-bit Wiegand credential corruption and leading-zero stripping by enforcing immutable string normalization throughout ingestion.',
			'Automates multi-vendor physical access control system (PACS) schema mapping, deduplication, and validation before cutover.',
			'Reduces manual enterprise security badge migrations from days of spreadsheet cleanup to a guided, auditable workflow.',
		],
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
		tags: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Chart.js', 'Nitro SWR'],
		metrics: 'Multi-Tier Edge Caching • WCAG 2.1 AA Canvas • Live FX Telemetry',
		highlights: [
			'Built with Nuxt 3 and Nitro `defineCachedEventHandler` SWR edge caching to deliver sub-50ms FX rate responses.',
			'Implements a 3-tier resilient fallback pipeline (Primary FX API → Open Public API → Stochastic micro-drift engine) for 100% uptime.',
			'Pairs HTML5 Chart.js `<canvas>` visualizations with screen-reader accessible `sr-only` time-series data tables.',
		],
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
		tags: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Framer Motion', 'Zod'],
		metrics: 'Interactive Floor Plans • Server Action Booking • Dynamic Filtering',
		highlights: [
			'Features instant multi-criteria filtering across communities, square footage, pricing tiers, and move-in readiness.',
			'Includes interactive architectural elevation switchers, mortgage payment estimators, and Zod-validated tour scheduling.',
			'Optimized for Core Web Vitals with responsive Next.js image priority loading and smooth Framer Motion layout transitions.',
		],
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
		metrics: 'Production Client Platform • Interactive Quote Estimator • Local SEO',
		highlights: [
			'Engineered and launched for a Houston-area commercial and residential window film provider to streamline customer lead capture.',
			'Includes an interactive tint shade and energy-savings estimator tailored to automotive, residential, and commercial specs.',
			'Configured with structured JSON-LD local business schema and fast static generation for top regional search performance.',
		],
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
		metrics: 'Enterprise Security & AV • Sub-Second Page Loads • Lead Routing',
		highlights: [
			'Designed and deployed for a commercial physical security, access control, and enterprise AV integration company.',
			'Showcases commercial case studies, partner certifications, and service verticals with a high-contrast, modern aesthetic.',
			'Built on Next.js and Vercel edge network for instant mobile and desktop performance.',
		],
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
		tags: ['Turborepo', 'Next.js', 'TypeScript', 'Tailwind CSS', 'pnpm'],
		metrics: '6 Production Apps • Path-Filtered CI/CD • Shared Config Packages',
		highlights: [
			'Orchestrates 6 independent Next.js and Nuxt applications inside a unified Turborepo and pnpm workspaces monorepo.',
			'Uses custom path-filtered Vercel ignore scripts (`ignore-build-step.sh`) so commits only trigger builds for affected applications.',
			'Shares strict TypeScript and ESLint configurations across workspaces while maintaining isolated per-app deployments.',
		],
		featured: false,
	},
	{
		title: 'Webex Control Hub',
		category: 'tools',
		href: 'https://www.webex.com/control-hub.html',
		description:
			'Enterprise management portal for IT administrators to manage users, devices, and calling services across Cisco’s Webex ecosystem.',
		imageUrl: '/images/projects/controlhub.png',
		tags: ['Angular', 'TypeScript', 'Cypress', 'Jenkins', 'Enterprise'],
		metrics: 'Global Enterprise Scale • Webex Calling Admin • E2E Cypress Suites',
		highlights: [
			'Developed scalable enterprise administration workflows for Cisco Webex Calling inside Control Hub using Angular and TypeScript.',
			'Engineered automated Cypress end-to-end regression test suites integrated with Jenkins CI/CD pipelines.',
			'Monitored production telemetry and maintained high availability using Kibana log analytics and PagerDuty incident workflows.',
		],
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
		organization: 'LGI Homes',
		imageUrl: '/images/logos/lgi-homes.svg',
		width: 150,
		height: 60,
		role: 'Full-Stack Developer',
		period: '2026 – Present',
		badge: 'Current • Enterprise Systems',
		impact:
			'Modernizing legacy infrastructure with Docker/Nginx, GitHub Actions CI/CD, Node.js/TypeScript middleware, and distributed MS SQL & MySQL tuning.',
	},
	{
		name: 'Freelance & Client Engineering',
		imageUrl: '/images/logos/vision.webp',
		width: 150,
		height: 60,
		role: 'Freelance Software Developer',
		period: '2024 – 2026',
		badge: 'Self-Employed • Full-Stack & ETL',
		impact:
			'Partnered directly with clients (including Vision Integrated Systems & Texas Tint Plus) to architect custom Next.js platforms, e-commerce workflows, and Python/SQL data migrations.',
	},
	{
		name: 'Cisco',
		organization: 'Cisco',
		imageUrl: '/images/logos/cisco.webp',
		width: 140,
		height: 60,
		role: 'Software Engineer',
		period: '2021 – 2024',
		badge: 'Webex Calling • Control Hub',
		impact:
			'Engineered enterprise administration features in Angular & TypeScript, Cypress E2E regression suites, Jenkins pipelines, and Kibana/PagerDuty operations (at Cisco since 2013).',
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