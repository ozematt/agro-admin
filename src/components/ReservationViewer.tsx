import ReservationCard from "./ReservationCard";

type Guest = {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number | string;
};

export type Reservation = {
  id: number;
  created_at: string;
  reservation_number: string;
  check_in: string;
  check_out: string;
  nights: number;
  status: "oczekujący" | "potwierdzony" | "odrzucony" | string;
  guests: number;
  adults: number;
  children: number;
  guest_id: Guest;
  notes: string | null;
};

type Prop = {
  reservations: Reservation[];
};

const ReservationViewer = ({ reservations }: Prop) => {
  return (
    <div className="space-y-4 overflow-y-auto">
      {reservations.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

export default ReservationViewer;
