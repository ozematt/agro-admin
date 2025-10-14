"use client";

const DashboardSkeleton = () => {
  return (
    <main className="flex-1 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="animate-pulse rounded bg-gray-200" />

      {/* Calendar Card */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-40 animate-pulse rounded-lg bg-blue-100" />
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between py-4">
          <div className="size-8 animate-pulse rounded bg-gray-100" />
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="size-8 animate-pulse rounded bg-gray-100" />
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          <div className="h-10 rounded bg-blue-50" />
          <div className="h-10 rounded bg-blue-50" />
          <div className="h-10 rounded bg-blue-50" />
          <div className="h-10 rounded bg-blue-50" />
          <div className="h-10 rounded bg-blue-50" />
          <div className="h-10 rounded bg-blue-50" />
          <div className="h-10 rounded bg-blue-50" />

          {/* Calendar Days - 5 weeks */}
          <div className="h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[20ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[40ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[60ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[80ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[100ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[120ms] h-16 animate-pulse rounded bg-gray-50" />

          <div className="animate-delay-[140ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[160ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[180ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[200ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[220ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[240ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[260ms] h-16 animate-pulse rounded bg-gray-50" />

          <div className="animate-delay-[280ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[300ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[320ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[340ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[360ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[380ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[400ms] h-16 animate-pulse rounded bg-gray-50" />

          <div className="animate-delay-[420ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[440ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[460ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[480ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[500ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[520ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[540ms] h-16 animate-pulse rounded bg-gray-50" />

          <div className="animate-delay-[560ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[580ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[600ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[620ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[640ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[660ms] h-16 animate-pulse rounded bg-gray-50" />
          <div className="animate-delay-[680ms] h-16 animate-pulse rounded bg-gray-50" />
        </div>
      </div>

      {/* Reservations Card */}
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />

        {/* Reservation Items */}
        <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
          <div className="size-10 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-8 w-28 animate-pulse rounded-full bg-green-100" />
        </div>

        <div className="animate-delay-100 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
          <div className="size-10 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-8 w-28 animate-pulse rounded-full bg-yellow-100" />
        </div>

        <div className="animate-delay-200 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
          <div className="size-10 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-8 w-28 animate-pulse rounded-full bg-green-100" />
        </div>
      </div>

      {/* Gallery Card */}
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-32 animate-pulse rounded-lg bg-blue-100" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="aspect-video animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-50" />
          </div>

          <div className="animate-delay-100 space-y-2">
            <div className="aspect-video animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-50" />
          </div>

          <div className="animate-delay-200 space-y-2">
            <div className="aspect-video animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-50" />
          </div>

          <div className="animate-delay-300 space-y-2">
            <div className="aspect-video animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-50" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardSkeleton;
