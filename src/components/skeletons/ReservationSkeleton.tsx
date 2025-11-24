import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const ReservationSkeleton = () => {
  const array = Array.from({ length: 3 }).map((_, index) => index + 1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ostatnie rezerwacje</CardTitle>
        <CardDescription>Najnowsze rezerwacje i zapytania</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {array.map((_, i) => (
            <div key={i} className="space-y-3 rounded-xl border p-5">
              <div className="flex items-center gap-2">
                <Skeleton className="bg-muted-foreground/10 flex h-10 w-10 items-center justify-center rounded-full" />

                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>

              <Skeleton className="h-3 w-80" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationSkeleton;
