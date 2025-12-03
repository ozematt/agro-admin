import { getReservation } from "./data";

// TODO: rezerwacja kończy sie jednego dnia i druga może sie zaczać tego samego

// Sprawdza dostepność rezerwacji, zwraca boolean
export async function checkReservation(
  startDate: string,
  endDate: string,
  propertyId: number,
  reservationToExcludeId: number | null = null,
) {
  try {
    const datesToCheck = createReservationDaysArr(startDate, endDate);
    const data = await getReservation(propertyId);

    if (!data.success) {
      throw new Error(`Błąd Supabase: ${data.error}`);
    }

    const reservedDates: Date[][] = [];

    data.reservations.map((res) => {
      if (reservationToExcludeId && res.id === reservationToExcludeId) {
        return; // Pomiń tę rezerwację
      }

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
  startDate: string | Date,
  endDate: string | Date,
): Date[] {
  const days: Date[] = [];
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

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
