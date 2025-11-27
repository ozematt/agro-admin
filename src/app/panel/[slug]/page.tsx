"use cache";
import {
  Gallery,
  ImageUpload,
  ReservationCalendar,
  Reservations,
} from "@/components";
import {
  GallerySkeleton,
  ReservationCalendarSkeleton,
  ReservationSkeleton,
} from "@/components/skeletons";
import { Suspense } from "react";

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="space-y-8">
        {/* Top Section: Calendar and Reservations */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Suspense fallback={<ReservationCalendarSkeleton />}>
            <ReservationCalendar propertyName={slug} />
          </Suspense>
          <Suspense fallback={<ReservationSkeleton />}>
            <Reservations propertyName={slug} />
          </Suspense>
        </div>

        {/* Bottom Section: Image Management */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ImageUpload bucketName={slug} />
          <Suspense fallback={<GallerySkeleton />}>
            <Gallery bucketName={slug} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default PropertyPage;
