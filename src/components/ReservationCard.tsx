import { formatDateRange } from "@/utils/helpers";
import { Reservation } from "./ReservationViewer";
import { ReservationCardItem } from "@/components";

type Prop = {
  reservation: Reservation;
};

const ReservationCard = ({ reservation }: Prop) => {
  const {
    guest_id: { first_name, last_name },
    check_in,
    check_out,
    nights,
    guests,
    id,
    status,
  } = reservation;

  const reservationDate = formatDateRange(check_in, check_out);

  return (
    <ReservationCardItem
      first_name={first_name}
      last_name={last_name}
      reservationDate={reservationDate}
      nights={nights}
      guests={guests}
      status={status}
      reservationId={id}
    />
  );
};

export default ReservationCard;
