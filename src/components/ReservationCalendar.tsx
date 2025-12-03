import { getReservedDays } from "@/lib/data";
import { ReservationCalendarContent } from ".";
import { createReservationDaysArr } from "@/lib/reservations";

type Prop = {
  propertyId: number;
};
const ReservationCalendar = async ({ propertyId }: Prop) => {
  const data = await getReservedDays(propertyId);

  const reservedDates = data.reservationDays
    .map((d) => createReservationDaysArr(d.check_in, d.check_out))
    .flat();

  return <ReservationCalendarContent reservedDates={reservedDates} />;
};

export default ReservationCalendar;
