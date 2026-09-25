import { Metadata } from 'next'
import Link from 'next/link'
import FloorPlansDirectoryClient from './FloorPlansDirectoryClient'

export const metadata: Metadata = {
  title: 'Architectural Floor Plans & Elevations | Hogg Homes',
  description:
    'Explore modern residential floor plans from 1,480 to 3,450 sq ft across our Heritage, Signature, and Pinnacle series with customizable elevations across Texas and the Sunbelt.',
}

export default function FloorPlansPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Floor Plans</span>
        </nav>

        {/* Directory Explorer Client */}
        <FloorPlansDirectoryClient />
      </div>
    </div>
  )
}
