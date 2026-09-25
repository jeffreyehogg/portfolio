import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COMMUNITIES, FLOOR_PLANS, QUICK_MOVE_IN_LOTS, METROS } from '../../../lib/data'
import CommunityDetailView from './CommunityDetailView'

interface PageProps {
  params: Promise<{ slug: string }>
}

function findCommunity(slug: string) {
  const normalized = slug.toLowerCase()
  return COMMUNITIES.find(
    (c) => c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized
  )
}

export async function generateStaticParams() {
  return COMMUNITIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const community = findCommunity(slug)
  if (!community) return { title: 'Community Not Found | Hogg Homes' }

  return {
    title: `${community.name} (${community.city}, ${community.state}) | Master-Planned Community`,
    description: `Discover ${community.name} in ${community.city}, ${community.state}. Homes from ${community.priceRange}. ${community.schoolDistrict}, resort amenities, and ${community.moveInReadyCount} move-in ready homes available.`,
    openGraph: {
      title: `${community.name} | Hogg Homes Communities`,
      description: `${community.city}, ${community.state} • ${community.priceRange} • ${community.schoolDistrict}`,
      images: [{ url: community.heroImage }],
    },
  }
}

export default async function CommunityDetailPage({ params }: PageProps) {
  const { slug } = await params
  const community = findCommunity(slug)

  if (!community) {
    notFound()
  }

  const metro = METROS.find((m) => m.id === community.metroId)

  // Plans offered in this community
  const plans = FLOOR_PLANS.filter((p) =>
    community.activeFloorPlanIds.includes(p.slug) ||
    community.activeFloorPlanIds.includes(p.id) ||
    p.availableInCommunities.includes(community.id)
  )

  // Lots available in this community
  const lots = QUICK_MOVE_IN_LOTS.filter((lot) => lot.communityId === community.id)

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/communities" className="hover:text-amber-400 transition">
            Communities
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">{community.name}</span>
        </nav>

        {/* Client Interactive Detail View */}
        <CommunityDetailView
          community={community}
          metro={metro}
          plans={plans}
          lots={lots}
        />
      </div>
    </div>
  )
}
