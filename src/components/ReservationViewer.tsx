import ReservationCard from "./ReservationCard";

export type Reservation = {
  id: number;
  guest_id: {
    id: number;
    first_name: string;
    last_name: string;
  };
  check_in: string;
  check_out: string;
  nights: number;
  status: "oczekujący" | "potwierdzony" | "odrzucony";
  guests: number;
  proprty: string;
  created_at?: string;
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
