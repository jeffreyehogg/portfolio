import type { Metadata } from 'next'
import ProjectList from '../../components/sections/ProjectList'

export const metadata: Metadata = {
	title: 'Projects & Systems Architecture',
	description:
		'Explore production systems, data migration utilities, and full-stack applications architected by Jeff Hogg.',
}

export default function Portfolio() {
	return <ProjectList />
}