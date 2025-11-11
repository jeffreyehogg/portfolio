export interface Project {
	title: string
	href: string
	description: string
	imageUrl: string
	tags: string[]
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

export const linkedInUrl = 'https://www.linkedin.com/in/jeffreyehogg/'
export const githubUrl = 'http://github.com/jeffreyehogg'
export const twitterUrl = 'https://twitter.com/jeffreyehogg'

export const projectsData: Project[] = [
	{
		title: 'Webex Control Hub',
		href: 'https://www.webex.com/control-hub.html',
		description:
			'An enterprise-grade platform for administrators to manage users, devices, and services across the entire Webex suite. I contributed to its development as a software engineer at Cisco.',
		imageUrl: '/images/controlhub.png',
		tags: ['Angular', 'Enterprise', 'SaaS'],
	},
	{
		title: 'Prayer Journal',
		href: 'https://pray.jeffhogg.com',
		description:
			'A full-stack personal prayer journal built with the Next.js App Router and Supabase. Features auth, a full CRUD database for prayers and notes, categories, and drag-and-drop reordering.',
		imageUrl: '/images/pray.png',
		tags: ['Next.js', 'Supabase', 'shadcn/ui', 'dnd-kit'],
	},
	{
		title: 'Southern Rental Cars',
		href: 'https://southernrentalcars.com/',
		description:
			'A full stack web app built with Next.js, TailwindCSS, and Prisma. Pending a booking system, admin dashboard, and user authentication.',
		imageUrl: '/images/southern.png',
		tags: ['Next.js', 'Prisma', 'TailwindCSS'],
	},
	{
		title: 'Texas Tint',
		href: 'https://texastint.com/',
		description:
			'A static website built with Next.js and TailwindCSS. Features a contact form and a gallery of previous work.',
		imageUrl: '/images/texas-tint.png',
		tags: ['Next.js', 'TailwindCSS'],
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
		imageUrl: '/images/logos/cisco.png',
		width: 200,
		height: 100,
	},
	{
		name: 'San Francisco 49ers',
		imageUrl: '/images/logos/49ers.png',
		width: 170,
		height: 100,
	},
	{
		name: 'San Francisco Giants',
		imageUrl: '/images/logos/giants.png',
		width: 200,
		height: 100,
	},
	{
		name: 'Golden State Warriors',
		imageUrl: '/images/logos/warriors.png',
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
