import type { Metadata } from 'next'
import AboutMe from '../../components/sections/AboutMe'

export const metadata: Metadata = {
	title: 'About & Career Experience',
	description:
		'Learn about Jeff Hogg, Full-Stack Developer at LGI Homes and former Cisco Software Engineer, specializing in DevOps automation, distributed SQL, and resilient system architecture.',
}

export default function About() {
	return <AboutMe />
}