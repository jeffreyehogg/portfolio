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
			'Angular',
			'React',
			'Next.js',
			'Node.js',
			'Python',
			'Swift',
			'SwiftUI',
			'iOS Development',
			'REST APIs',
			'Microsoft SQL Server',
			'MySQL',
			'PostgreSQL',
			'Docker',
			'GitHub Actions',
		],
	}

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Jeff Hogg Portfolio',
		url: 'https://www.jeffhogg.com',
		description:
			'Software Engineer building full-stack web applications (TypeScript, Angular, React, Next.js), native Swift iOS apps, APIs, and SQL-backed services.',
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
