import { Metadata } from 'next'
import Link from 'next/link'
import CommunitiesDirectoryClient from './CommunitiesDirectoryClient'

export const metadata: Metadata = {
  title: 'Master-Planned Communities across Texas & Sunbelt | Hogg Homes',
  description:
    'Explore premier residential communities across Houston, Dallas-Fort Worth, Austin, and Phoenix East Valley with resort amenities, top school districts, and acreage homesites.',
}

export default function CommunitiesPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Communities</span>
        </nav>

        <CommunitiesDirectoryClient />
      </div>
    </div>
  )
}
