import type { Metadata } from 'next'
import AboutMe from '../../components/sections/AboutMe'

export const metadata: Metadata = {
	title: 'About & Career Experience',
	description:
		'Learn about Jeff Hogg, Full-Stack Developer at LGI Homes and former Cisco Software Engineer, specializing in DevOps automation, distributed SQL, and resilient system architecture.',
	alternates: { canonical: '/about' },
	openGraph: {
		title: 'About & Career Experience | Jeff Hogg',
		description:
			'Full-Stack Developer at LGI Homes — modernizing enterprise systems, managing distributed databases, and automating CI/CD pipelines.',
		url: '/about',
	},
	twitter: {
		title: 'About & Career Experience | Jeff Hogg',
		description:
			'Full-Stack Developer at LGI Homes — DevOps, distributed SQL, and enterprise system architecture.',
	},
}

export default function About() {
	return <AboutMe />
}