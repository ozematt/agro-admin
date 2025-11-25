"use cache";
import {
  Gallery,
  ImageUpload,
  BookingCalendar,
  Reservations,
} from "@/components";
import { GallerySkeleton, ReservationSkeleton } from "@/components/skeletons";
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
        {/* Top Section: Calendar and Bookings */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <BookingCalendar />
          <Suspense key={slug} fallback={<ReservationSkeleton />}>
            <Reservations slug={slug} />
          </Suspense>
        </div>

        {/* Bottom Section: Image Management */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ImageUpload bucketName={slug} />
          <Suspense key={slug} fallback={<GallerySkeleton />}>
            <Gallery bucketName={slug} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default PropertyPage;
