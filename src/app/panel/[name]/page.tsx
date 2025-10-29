import { BookingCalendar } from "@/components/booking-calendar";
import { ImageUpload } from "@/components/image-upload";
import { PhotoGallery } from "@/components/photo-gallery";
import { RecentBookings } from "@/components/recent-bookings";

type Reservation = {
  id: string;
  first_name: string;
  last_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  status: "oczekujący" | "potwierdzony";
  guests: number;
  property: string;
  created_at?: string;
};

const reservation: Reservation[] = [
  {
    id: "1",
    first_name: "Anna",
    last_name: "Kowalska",
    check_in: "25-10-2025",
    check_out: "28-10-2025",
    nights: 3,
    status: "potwierdzony",
    guests: 2,
    property: "domek-1",
  },
  {
    id: "2",
    first_name: "Jan",
    last_name: "Nowak",
    check_in: "20-10-2025",
    check_out: "22-10-2025",
    nights: 2,
    status: "oczekujący",
    guests: 1,
    property: "domek-1",
  },
  {
    id: "3",
    first_name: "Ewa",
    last_name: "Wiśniewska",
    check_in: "27-10-2025",
    check_out: "30-10-2025",
    nights: 3,
    status: "potwierdzony",
    guests: 3,
    property: "domek-1",
  },
  {
    id: "4",
    first_name: "Piotr",
    last_name: "Zieliński",
    check_in: "18-10-2025",
    check_out: "21-10-2025",
    nights: 3,
    status: "oczekujący",
    guests: 4,
    property: "domek-1",
  },
  {
    id: "5",
    first_name: "Magda",
    last_name: "Lewandowska",
    check_in: "26-10-2025",
    check_out: "29-10-2025",
    nights: 3,
    status: "potwierdzony",
    guests: 2,
    property: "domek-1",
  },
];

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  // await slowData();

  const { name } = await params;
  // logika pobrania rezerwacji
  console.log(name);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="space-y-8">
        {/* Top Section: Calendar and Bookings */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BookingCalendar />
          <RecentBookings reservations={reservation} />
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
