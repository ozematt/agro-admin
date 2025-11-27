import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AddReservationDialog from "../AddReservationDialog";

const ReservationCalendarSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Kalendarz rezerwacji</CardTitle>
            <CardDescription>
              Zarządzaj rezerwacjami i dostępnością
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <AddReservationDialog />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Nawigacja między miesiącami */}
          <div className="flex justify-between text-center">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>

          {/* Dni tygodnia */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>

          {/* Komórki kalendarza */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>

          {/* Legenda */}
          <div className="flex items-center justify-center gap-6 border-t pt-4 text-sm">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ReservationCalendarSkeleton;
