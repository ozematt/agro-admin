import { BookingCalendar } from "@/components/booking-calendar";
import { ImageUpload } from "@/components/image-upload";
import { PhotoGallery } from "@/components/photo-gallery";
import { RecentBookings } from "@/components/recent-bookings";

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  // await slowData();

  const { name } = await params;
  console.log(name);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="space-y-8">
        {/* Top Section: Calendar and Bookings */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BookingCalendar />
          <RecentBookings />
        </div>

        {/* Bottom Section: Image Management */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ImageUpload />
          <PhotoGallery />
        </div>
      </div>
    </main>
  );
};

export default PropertyPage;
