import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = 'https://www.jeffhogg.com'

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/Jeff_Hogg_Resume.pdf'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	}
}
