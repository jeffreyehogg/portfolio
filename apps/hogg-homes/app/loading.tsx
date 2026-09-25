export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl animate-pulse space-y-12">
        {/* Top telemetry badge skeleton */}
        <div className="flex justify-center">
          <div className="h-7 w-72 rounded-full bg-slate-800/80 border border-slate-700/50" />
        </div>

        {/* Hero headline skeleton */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="mx-auto h-12 w-4/5 rounded-2xl bg-slate-800/70" />
          <div className="mx-auto h-10 w-3/5 rounded-2xl bg-slate-800/50" />
          <div className="mx-auto h-5 w-2/3 rounded-lg bg-slate-800/30 pt-2" />
        </div>

        {/* Search bar & metro filter skeleton */}
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="flex justify-center gap-2">
            <div className="h-8 w-24 rounded-full bg-slate-800/60" />
            <div className="h-8 w-24 rounded-full bg-slate-800/60" />
            <div className="h-8 w-24 rounded-full bg-slate-800/60" />
            <div className="h-8 w-24 rounded-full bg-slate-800/60" />
          </div>
          <div className="h-16 w-full rounded-2xl bg-slate-900/90 border border-slate-800/80" />
        </div>

        {/* Hero Spotlight card skeleton */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] w-full rounded-2xl bg-slate-800/60" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="h-4 w-32 rounded bg-amber-500/20" />
              <div className="h-8 w-48 rounded-lg bg-slate-800/80" />
              <div className="h-12 w-full rounded bg-slate-800/40" />
              <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-800">
                <div className="h-10 rounded bg-slate-800/50" />
                <div className="h-10 rounded bg-slate-800/50" />
                <div className="h-10 rounded bg-slate-800/50" />
                <div className="h-10 rounded bg-slate-800/50" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-8 w-28 rounded bg-slate-800/60" />
                <div className="h-6 w-24 rounded bg-slate-800/40" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="h-10 rounded-xl bg-slate-800/70" />
                <div className="h-10 rounded-xl bg-amber-500/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Cards Grid Skeleton */}
        <div className="pt-8">
          <div className="flex justify-between items-end border-b border-slate-800/80 pb-6 mb-8">
            <div className="space-y-2">
              <div className="h-4 w-36 rounded bg-amber-500/20" />
              <div className="h-8 w-64 rounded-lg bg-slate-800/80" />
            </div>
            <div className="h-8 w-32 rounded-lg bg-slate-800/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-4"
              >
                <div className="aspect-[16/10] w-full rounded-xl bg-slate-800/60" />
                <div className="flex justify-between">
                  <div className="h-6 w-36 rounded bg-slate-800/80" />
                  <div className="h-6 w-20 rounded bg-slate-800/80" />
                </div>
                <div className="grid grid-cols-4 gap-1.5 py-2 border-y border-slate-800/60">
                  <div className="h-8 rounded bg-slate-800/40" />
                  <div className="h-8 rounded bg-slate-800/40" />
                  <div className="h-8 rounded bg-slate-800/40" />
                  <div className="h-8 rounded bg-slate-800/40" />
                </div>
                <div className="h-9 w-full rounded-xl bg-slate-800/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
