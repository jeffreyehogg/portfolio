export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-indigo-500/20" />
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
          Initializing Legacy Link...
        </p>
      </div>
    </div>
  )
}
