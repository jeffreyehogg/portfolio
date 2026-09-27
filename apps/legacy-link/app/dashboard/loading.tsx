export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-900" />
            <div className="h-4 w-96 animate-pulse rounded-lg bg-slate-900/60" />
          </div>
          <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-900" />
        </div>

        {/* Bento Grid Skeleton */}
        <div className="mb-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 h-44 animate-pulse rounded-2xl bg-slate-900/60 border border-white/[0.05]" />
          <div className="col-span-12 lg:col-span-5 h-44 animate-pulse rounded-2xl bg-slate-900/60 border border-white/[0.05]" />
          <div className="col-span-12 lg:col-span-5 h-36 animate-pulse rounded-2xl bg-slate-900/60 border border-white/[0.05]" />
          <div className="col-span-12 lg:col-span-7 h-36 animate-pulse rounded-2xl bg-slate-900/60 border border-white/[0.05]" />
        </div>

        {/* Table Skeleton */}
        <div className="h-72 animate-pulse rounded-2xl bg-slate-900/60 border border-white/[0.05]" />
      </div>
    </div>
  )
}
