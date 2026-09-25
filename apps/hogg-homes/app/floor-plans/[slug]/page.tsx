import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FLOOR_PLANS, COMMUNITIES, QUICK_MOVE_IN_LOTS } from '../../../lib/data'
import FloorPlanDetailView from './FloorPlanDetailView'

interface PageProps {
  params: Promise<{ slug: string }>
}

function findPlan(slug: string) {
  const normalized = slug.toLowerCase()
  return FLOOR_PLANS.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized ||
      p.slug.toLowerCase() === normalized.replace(/^the-/, '') ||
      p.id.toLowerCase() === `the-${normalized}`
  )
}

export async function generateStaticParams() {
  const params: { slug: string }[] = []
  for (const plan of FLOOR_PLANS) {
    params.push({ slug: plan.slug })
    params.push({ slug: plan.id })
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const plan = findPlan(slug)
  if (!plan) return { title: 'Floor Plan Not Found | Hogg Homes' }

  return {
    title: `${plan.name} (${plan.sqft.toLocaleString()} Sq Ft) | Hogg Homes Floor Plans`,
    description: `Explore ${plan.name} floor plan from the ${plan.series}. Featuring ${plan.bedrooms} bedrooms, ${plan.bathrooms}.${plan.halfBaths} baths, customizable elevations, and starting at $${plan.basePrice.toLocaleString()}.`,
    openGraph: {
      title: `${plan.name} | Hogg Homes Architectural Series`,
      description: `${plan.sqft.toLocaleString()} sq ft • ${plan.bedrooms} beds • ${plan.bathrooms}.${plan.halfBaths} baths • Starting from $${plan.basePrice.toLocaleString()}`,
      images: [{ url: plan.elevations[0].imageUrl }],
    },
  }
}

export default async function FloorPlanDetailPage({ params }: PageProps) {
  const { slug } = await params
  const plan = findPlan(slug)

  if (!plan) {
    notFound()
  }

  // Related communities building this plan
  const communitiesBuilding = COMMUNITIES.filter((c) =>
    plan.availableInCommunities.includes(c.id)
  )

  // Move-in ready lots of this plan
  const readyLots = QUICK_MOVE_IN_LOTS.filter((lot) => lot.floorPlanId === plan.id)

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/floor-plans" className="hover:text-amber-400 transition">
            Floor Plans
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">{plan.name}</span>
        </nav>

        {/* Interactive Client Detail View */}
        <FloorPlanDetailView
          plan={plan}
          communitiesBuilding={communitiesBuilding}
          readyLots={readyLots}
        />
      </div>
    </div>
  )
}
