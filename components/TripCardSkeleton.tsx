import { Skeleton } from "@/components/ui/skeleton";

// Enhanced shimmer animation for a more polished loading experience
const shimmerClass = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function TripCardSkeleton() {
  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-100">
      {/* Image skeleton */}
      <div className="relative h-56">
        <Skeleton className="w-full h-full rounded-none" />
        {/* Heart button skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Location skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        {/* Duration skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Price skeleton */}
        <div className="mt-3">
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function FeaturedTripCardSkeleton() {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md">
      {/* Image skeleton */}
      <div className="relative h-64">
        <Skeleton className="w-full h-full rounded-none" />
        {/* Heart button skeleton */}
        <div className="absolute top-4 right-4">
          <Skeleton className="w-9 h-9 rounded-full" />
        </div>
        {/* Badge skeleton */}
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Title skeleton */}
        <Skeleton className="h-7 w-4/5" />
        
        {/* Location skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        
        {/* Duration skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        
        {/* Price and button skeleton */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Grid of skeleton cards for main trips section
export function TripsGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <TripCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Featured trips section skeleton
export function FeaturedTripsSkeleton() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section title skeleton */}
        <div className="mb-8">
          <Skeleton className="h-9 w-64" />
        </div>
        
        {/* Featured trips grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <FeaturedTripCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Loading state for search/filter section
export function SearchFiltersSkeleton() {
  return (
    <section className="bg-white py-8 border-b">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search input skeleton */}
        <div className="w-full md:w-96">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        {/* Filter buttons skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </section>
  );
}

// Main content area skeleton with tabs
export function MainContentSkeleton() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          {/* Tabs skeleton */}
          <div className="mb-6">
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-20 rounded-md" />
              ))}
            </div>
          </div>
          
          {/* Section title skeleton */}
          <Skeleton className="h-8 w-48 mb-6" />
        </div>

        {/* Trips grid skeleton */}
        <TripsGridSkeleton count={8} />
        
        {/* Pagination skeleton */}
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-9 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
