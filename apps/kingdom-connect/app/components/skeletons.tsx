export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="h-40 bg-gray-200 animate-pulse relative" />

      {/* Content Skeleton */}
      <div className="p-5 grow flex flex-col">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3 animate-pulse" />

        {/* Description (2 lines) */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-100 rounded-md w-full animate-pulse" />
          <div className="h-3 bg-gray-100 rounded-md w-5/6 animate-pulse" />
        </div>

        {/* Metadata (Date & Location) */}
        <div className="space-y-3 mt-auto mb-6">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-3 bg-gray-100 rounded-md w-1/3 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-3 bg-gray-100 rounded-md w-1/2 animate-pulse" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="pt-4 border-t border-gray-50 mt-auto">
          <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function EventsGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
