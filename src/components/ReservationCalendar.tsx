import { getReservedDays } from "@/lib/data";
import { ReservationCalendarContent } from ".";
import { createReservationDaysArr } from "@/lib/reservations";

type Prop = {
  propertySlug: string;
};
const ReservationCalendar = async ({ propertySlug }: Prop) => {
  const data = await getReservedDays(propertySlug);

  const reservedDates = data.reservationDays
    .map((d) => createReservationDaysArr(d.check_in, d.check_out))
    .flat();

  return <ReservationCalendarContent reservedDates={reservedDates} />;
};

export default ReservationCalendar;
