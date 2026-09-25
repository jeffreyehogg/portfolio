import type { Metadata } from 'next'
import ProjectList from '../../components/sections/ProjectList'

export const metadata: Metadata = {
	title: 'Projects & Systems Architecture',
	description:
		'Explore production systems, data migration utilities, and full-stack applications architected by Jeff Hogg.',
	alternates: { canonical: '/portfolio' },
	openGraph: {
		title: 'Projects & Systems Architecture | Jeff Hogg',
		description:
			'Production systems, enterprise data migration, and modern full-stack applications.',
		url: '/portfolio',
	},
	twitter: {
		title: 'Projects & Systems Architecture | Jeff Hogg',
		description:
			'Production systems, enterprise data migration, and modern full-stack applications.',
	},
}

export default function Portfolio() {
	return <ProjectList />
}