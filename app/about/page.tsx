import type { Metadata } from 'next'
import AboutMe from '../../components/sections/AboutMe'

export const metadata: Metadata = {
	title: 'About - Jeff Hogg',
	description:
		'Learn about Jeff Hogg, a software developer with enterprise-level experience in Angular, React, TypeScript, and Next.js, including his work at Cisco.',
}

export default function About() {
	return <AboutMe />
}