import type { Metadata } from 'next'
import { Suspense } from 'react'
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
	return (
		<Suspense fallback={<div className='min-h-screen bg-slate-950' />}>
			<ProjectList />
		</Suspense>
	)
}