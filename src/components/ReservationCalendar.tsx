import { getReservationDays } from '@/lib/data';
import { ReservationCalendarContent } from '.';
import { createReservationDaysArr } from '@/lib/reservations';

type Prop = {
  propertyName: string;
};
const ReservationCalendar = async ({ propertyName }: Prop) => {
  const data = await getReservationDays(propertyName);

  const reservedDates = data.reservationDays
    .map((d) => createReservationDaysArr(d.check_in, d.check_out))
    .flat();

  return <ReservationCalendarContent reservedDates={reservedDates} />;
};

export default ReservationCalendar;
