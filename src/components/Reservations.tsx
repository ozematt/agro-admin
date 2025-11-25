"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getReservation, getReservationDetails } from "@/lib/data";
import { ReservationViewer } from "@/components";
import { cacheLife, cacheTag } from "next/cache";

type Prop = {
  slug: string;
};

const Reservations = async ({ slug }: Prop) => {
  // NOTE: przyda mi się prze dodaniu nowej rezerwacji
  "use cache";
  const { reservations, error } = await getReservation(slug);
  cacheTag(`reservation-${slug}`);
  cacheLife("minutes");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ostatnie rezerwacje</CardTitle>
        <CardDescription>Najnowsze rezerwacje i zapytania</CardDescription>
      </CardHeader>
      <CardContent>
        {reservations?.length === 0 || !reservations ? (
          <span className="text-muted-foreground/50 grid h-80 place-items-center">
            {error ? (
              <span className="text-center">
                Coś poszło nie tak,
                <br /> odśwież stronę
              </span>
            ) : (
              <span>Brak rezerwacji</span>
            )}
          </span>
        ) : (
          <ReservationViewer reservations={reservations} />
        )}
      </CardContent>
    </Card>
  );
};

export default Reservations;
