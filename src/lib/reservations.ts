import { getReservation } from "./data";

// Sprawdza dostepność rezerwacji, zwraca boolean
export async function checkReservation(
  startDate: string,
  endDate: string,
  propertyName?: string,
  propertyId?: number,
) {
  try {
    const datesToCheck = createReservationDaysArr(startDate, endDate);
    const data = await getReservation(propertyName, propertyId);

    if (!data.success) {
      throw new Error(`Błąd Supabase: ${data.error}`);
    }

    const reservedDates: Date[][] = [];

    data.reservations.map((res) => {
      const reservationsDates = createReservationDaysArr(
        res.check_in,
        res.check_out,
      );
      reservedDates.push(reservationsDates);
    });

    const isAvailable = checkAvailability(reservedDates, datesToCheck);

    return isAvailable;
  } catch (error) {
    return { error: error };
  }
}

// Tworzy tablice dat, od daty poczętkowej do daty koncowej
export function createReservationDaysArr(
  dataStartu: string | Date,
  dataKonca: string | Date,
): Date[] {
  const days: Date[] = [];
  const start = new Date(dataStartu);
  const end = new Date(dataKonca);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const currentDate = new Date(start);

  while (currentDate <= end) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

// Sprawdza czy daty sie nakładają,
// .getTime() - zwraca liczbę stworzoną z daty aby porównanie było możliwe
export function checkAvailability(
  reservedDates: Date[][],
  datesToCheck: Date[],
): boolean {
  const reservedSet = new Set(reservedDates.flat().map((d) => d.getTime()));

  return !datesToCheck.some((d) => reservedSet.has(d.getTime()));
}
