import type { Metadata } from 'next'
import AboutMe from '../../components/sections/AboutMe'

export const metadata: Metadata = {
	title: 'About & Career Experience',
	description:
		'Learn about Jeff Hogg, Software Engineer specializing in DevOps automation, distributed SQL, modern web & iOS applications, and resilient system architecture.',
	alternates: { canonical: '/about' },
	openGraph: {
		title: 'About & Career Experience | Jeff Hogg',
		description:
			'Software Engineer — modernizing enterprise systems, managing distributed databases, and automating CI/CD pipelines.',
		url: '/about',
	},
	twitter: {
		title: 'About & Career Experience | Jeff Hogg',
		description:
			'Software Engineer — DevOps, distributed SQL, and enterprise system architecture.',
	},
}

export default function About() {
	return <AboutMe />
}