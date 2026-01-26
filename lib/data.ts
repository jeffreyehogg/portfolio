export interface Project {
	title: string
	href: string
	description: string
	imageUrl: string
	tags: string[]
	learnings?: string
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

export interface Skill {
	category: string
	list: string
}

// New Interface for Broadcasting
export interface BroadcastCredit {
	event: string
	role: string
	network: string
	year: string
	image?: string
}

export const linkedInUrl = 'https://www.linkedin.com/in/jeffreyehogg/'
export const githubUrl = 'http://github.com/jeffreyehogg'
export const twitterUrl = 'https://twitter.com/jeffreyehogg'

export const projectsData: Project[] = [
	{
		title: 'Vision Integrated Systems',
		href: 'https://vision.jeffhogg.com',
		description:
			'The official company website for Vision Integrated Systems, a leading provider of audio-video, structured cabling, and security solutions in Texas.',
		imageUrl: '/images/projects/vision.png',
		tags: ['Next.js', 'React 19', 'Tailwind CSS', 'Framer Motion'],
		learnings:
			'Built using the latest web standards including Next.js 16 and Tailwind CSS v4. Focused on component modularity and performance to deliver a fast, accessible corporate experience.',
	},
	{
		title: 'Kingdom Connect',
		href: 'https://kingdom.jeffhogg.com',
		description:
			'A digital platform designed to bridge the gap between church needs and volunteer service. Empowering churches to post service opportunities and fundraising needs, while providing a seamless dashboard for volunteers.',
		imageUrl: '/images/projects/kingdom-connect.png',
		tags: ['Next.js', 'Clerk', 'Neon', 'Drizzle ORM', 'Tailwind CSS'],
		learnings:
			'Mastered the modern "Pro" Next.js stack by integrating serverless PostgreSQL (Neon), type-safe database interactions with Drizzle ORM, and secure authentication flows using Clerk.',
	},
	{
		title: 'Legacy Link',
		href: 'https://legacy-link.jeffhogg.com',
		description:
			'A specialized middleware utility designed to modernize physical security data migration. It ingests raw exports from legacy systems (Lenel, DNA Fusion) and provides a visual interface to map, sanitize, and transform data for import into Genetec, reducing days of manual work to minutes.',
		imageUrl: '/images/projects/legacy-link.png',
		tags: ['Next.js', 'TypeScript', 'Clerk', 'Vercel Postgres', 'PapaParse'],
		learnings:
			'Architected a flexible data schema using PostgreSQL JSONB to ingest unpredictable legacy datasets without schema migrations. Built a stateful "wizard" interface for complex data mapping and implemented secure, signed file handling for sensitive security records.',
	},
	{
		title: 'Webex Control Hub',
		href: 'https://www.webex.com/control-hub.html',
		description:
			'An enterprise-grade platform for administrators to manage users, devices, and services across the entire Webex suite. I contributed to its development as a software engineer at Cisco.',
		imageUrl: '/images/projects/controlhub.png',
		tags: ['Angular', 'Enterprise', 'SaaS'],
		learnings:
			'Learned how to work in a large-scale enterprise codebase with a focus on scalability, security, and maintaining industry-standard clean code.',
	},
	{
		title: 'Personal Portfolio',
		href: 'https://jeffhogg.com',
		description:
			'The site you are on right now. A personal portfolio built with Next.js (App Router), React, TypeScript, and Tailwind CSS.',
		imageUrl: '/images/projects/portfolio.png',
		tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Server Actions'],
		learnings:
			'Refactored a personal project to use the latest standards, including centralizing all site content into a single file (this one!) for maintainability.',
	},
	{
		title: 'Prayer Journal',
		href: 'https://pray.jeffhogg.com',
		description:
			'A full-stack personal prayer journal built with the Next.js App Router and Supabase. Features auth, a full CRUD database for prayers and notes, categories, and drag-and-drop reordering.',
		imageUrl: '/images/projects/pray.png',
		tags: ['Next.js', 'Supabase', 'shadcn/ui', 'dnd-kit'],
		learnings:
			'This project was a deep dive into the Next.js App Router, Server Actions, and using dnd-kit for complex drag-and-drop state management.',
	},
	{
		title: 'ForexFlow',
		href: 'https://forexflow-dashboard.vercel.app/',
		description:
			'A real-time forex dashboard tracking institutional exchange rates. Features live updates, 24h high/low stats, and interactive trend charts.',
		imageUrl: '/images/projects/forexflow.png',
		tags: ['Nuxt', 'Vue', 'TypeScript', 'Nuxt UI', 'Chart.js'],
		learnings:
			'Server-side API proxying in Nuxt to secure API keys and utilized ClientOnly wrappers to seamlessly integrate Chart.js for real-time data visualization.',
	},
	{
		title: 'Southern Rental Cars',
		href: 'https://southernrentalcars.com/',
		description: 'A website built with Next.js, TailwindCSS, and Prisma.',
		imageUrl: '/images/projects/southern.png',
		tags: ['Next.js', 'Prisma', 'TailwindCSS'],
		learnings:
			'Explored modern web design trends and component-based architecture for a client-facing site.',
	},
	{
		title: 'Texas Tint',
		href: 'https://texastint.com/',
		description:
			'A static website built with Next.js and TailwindCSS. Features a contact form and a gallery of previous work.',
		imageUrl: '/images/projects/texas-tint.png',
		tags: ['Next.js', 'TailwindCSS'],
		learnings:
			'Focused on SEO, static site generation, and building a high-performance, mobile-first landing page.',
	},
]

export const broadcastCredits: BroadcastCredit[] = [
	{
		event: 'NBA Western Conference Finals',
		role: 'Camera Operator',
		network: 'Warriors TV',
		year: '2015',
		image: '/images/broadcast/warriors-cam.jpeg',
	},
	{
		event: 'San Francisco Giants',
		role: 'Technical Director',
		network: 'SFG Productions',
		year: '2013',
		image: '/images/broadcast/giants-td.jpg',
	},
	{
		event: 'Golden State Warriors',
		role: 'Camera Operator',
		network: 'NBC Sports Bay Area',
		year: '2016',
		image: '/images/broadcast/me-steph.jpeg',
	},
	{
		event: 'Oakland Athletics',
		role: 'Camera Operator',
		network: 'NBC Sports Bay Area',
		year: '2021',
		image: '/images/broadcast/mlb-cam.jpeg',
	},
	{
		event: 'Houston Dynamo',
		role: 'Camera Operator',
		network: 'AT&T SportsNet Southwest',
		year: '2025',
		image: '/images/broadcast/dynamo-cam.jpeg',
	},
	{
		event: 'Houston Rockets',
		role: 'Camera Operator',
		network: 'Space City Home Network',
		year: '2025',
		image: '/images/broadcast/rockets-cam.jpeg',
	},
	{
		event: 'Red Owl Boxing',
		role: 'Camera Operator',
		network: 'DAZN',
		year: '2025',
		image: '/images/broadcast/boxing.jpeg',
	},
	{
		event: 'Texas A&M Football',
		role: 'Camera Operator',
		network: 'ESPN',
		year: '2023',
		image: '/images/broadcast/college-football.jpeg',
	},
	{
		event: 'Various',
		role: 'Camera Operator',
		network: 'ESPN',
		year: '2016',
		image: '/images/broadcast/espn.jpg',
	},
]

export const servicesData: ServiceTier[] = [
	{
		title: 'Standard Website',
		description:
			'The essentials for your business. Choose this option if your data does not change very often.',
		features: ['Static data', '2 revisions', 'Satisfaction guaranteed'],
		cta: 'Learn More',
		mostPopular: false,
	},
	{
		title: 'Dynamic Website',
		description:
			'A step-up from the Standard. Choose this option if you have data that changes frequently.',
		features: [
			'Static + Dynamic Data',
			'3 revisions',
			'Website analytics',
			'Satisfaction guaranteed',
		],
		cta: 'Learn More',
		mostPopular: true,
	},
	{
		title: 'Premium Website',
		description:
			'The premium option for your business. Choose this option if you need the ability to manage data and collect payments.',
		features: [
			'Static + Dynamic Data',
			'Database + User Authentication',
			'Unlimited revisions',
			'Advanced analytics',
			'Satisfaction guaranteed',
		],
		cta: 'Learn More',
		mostPopular: false,
	},
]

export const testimonialsData: Testimonial[] = [
	{
		name: 'Elon Musk',
		company: 'Space X',
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

export const trustedCompaniesData: CompanyLogo[] = [
	{
		name: 'Cisco',
		imageUrl: '/images/logos/cisco.webp',
		width: 200,
		height: 100,
	},
	{
		name: 'San Francisco 49ers',
		imageUrl: '/images/logos/49ers.webp',
		width: 170,
		height: 100,
	},
	{
		name: 'San Francisco Giants',
		imageUrl: '/images/logos/giants.webp',
		width: 200,
		height: 100,
	},
	{
		name: 'Golden State Warriors',
		imageUrl: '/images/logos/warriors.webp',
		width: 90,
		height: 100,
	},
]

export const skillsData: Skill[] = [
	{
		category: 'Languages, Libraries and frameworks',
		list: 'JavaScript, TypeScript, Angular, React, Nextjs, Node.js, Express, PlaneScale, MongoDB',
	},
	{
		category: 'Tools & Platforms',
		list: 'Git, GitHub, Vercel, Supabase, Docker',
	},
]
