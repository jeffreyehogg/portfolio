import type { MetadataRoute } from 'next'
import { COMMUNITIES, FLOOR_PLANS } from '../lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hogghomes.com'
  const currentDate = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/communities`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/floor-plans`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quick-move-ins`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const communityRoutes: MetadataRoute.Sitemap = COMMUNITIES.map((community) => ({
    url: `${baseUrl}/communities/${community.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const floorPlanRoutes: MetadataRoute.Sitemap = FLOOR_PLANS.map((plan) => ({
    url: `${baseUrl}/floor-plans/${plan.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...communityRoutes, ...floorPlanRoutes]
}
