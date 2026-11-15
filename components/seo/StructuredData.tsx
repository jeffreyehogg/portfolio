import { githubUrl, linkedInUrl, twitterUrl } from '../../lib/data'

export default function StructuredData() {
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Jeff Hogg',
		jobTitle: 'Software Engineer',
		url: 'https://www.jeffhogg.com',
		image: 'https://www.jeffhogg.com/images/headshots/me.jpg',
		sameAs: [githubUrl, linkedInUrl, twitterUrl],
		knowsAbout: [
			'Software Engineering',
			'TypeScript',
			'JavaScript',
			'Swift',
			'SwiftUI',
			'iOS Development',
			'React',
			'Next.js',
			'Node.js',
			'Docker',
			'Nginx',
			'DevOps Automation',
			'CI/CD Pipelines',
			'GitHub Actions',
			'Microsoft SQL Server',
			'MySQL',
			'PostgreSQL',
			'API Middleware Architecture',
			'System Architecture',
			'Turborepo',
			'Agentic Workflows',
		],
	}

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Jeff Hogg Portfolio',
		url: 'https://www.jeffhogg.com',
		description:
			'Software Engineer specializing in DevOps automation, system architecture, API middleware, full-stack web, and native iOS applications.',
		publisher: {
			'@type': 'Person',
			name: 'Jeff Hogg',
		},
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
		</>
	)
}
