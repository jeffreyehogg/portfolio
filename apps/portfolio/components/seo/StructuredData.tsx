import { githubUrl, linkedInUrl, twitterUrl } from '../../lib/data'

export default function StructuredData() {
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Jeff Hogg',
		jobTitle: 'Full-Stack Developer',
		worksFor: {
			'@type': 'Organization',
			name: 'LGI Homes',
			url: 'https://www.lgihomes.com',
		},
		url: 'https://jeffhogg.com',
		image: 'https://jeffhogg.com/images/headshots/me.jpg',
		sameAs: [githubUrl, linkedInUrl, twitterUrl],
		knowsAbout: [
			'Full-Stack Development',
			'TypeScript',
			'JavaScript',
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
		url: 'https://jeffhogg.com',
		description:
			'Full-Stack Developer specializing in DevOps automation, system architecture, API middleware, and distributed databases.',
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
