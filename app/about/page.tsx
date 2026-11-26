import type { Metadata } from 'next'
import AboutMe from '../../components/sections/AboutMe'

export const metadata: Metadata = {
	title: 'About & Career Experience',
	description:
		'Learn about Jeff Hogg, Software Engineer building full-stack web apps with TypeScript, Angular, React, Next.js, native Swift iOS apps, APIs, and SQL databases.',
	alternates: { canonical: '/about' },
	openGraph: {
		title: 'About & Career Experience | Jeff Hogg',
		description:
			'Software Engineer — TypeScript, Angular, React, Next.js, Swift iOS apps, APIs, and SQL.',
		url: '/about',
	},
	twitter: {
		title: 'About & Career Experience | Jeff Hogg',
		description:
			'Software Engineer — TypeScript, Angular, React, Next.js, Swift iOS apps, APIs, and SQL.',
	},
}

export default function About() {
	return <AboutMe />
}