import type { Metadata } from 'next'
import ProjectList from '../../components/sections/ProjectList'

export const metadata: Metadata = {
	title: 'Portfolio - Jeff Hogg',
	description:
		'A selection of projects by Jeff Hogg, showcasing enterprise work with Angular and full-stack applications with Next.js, React, and Supabase.',
}

export default function Portfolio() {
	return <ProjectList />
}