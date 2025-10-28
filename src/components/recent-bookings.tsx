import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, DollarSign, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

type Reservation = {
  id: string;
  first_name: string;
  last_name: string;
  check_in: string; // ISO date string
  check_out: string; // ISO date string
  created_at?: string;
};

export function RecentBookings({
  reservations = [],
}: {
  reservations?: Reservation[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ostatnie rezerwacje</CardTitle>
        <CardDescription>Najnowsze rezerwacje i zapytania</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[550px] space-y-4 overflow-y-auto">
          {reservations.map((booking) => (
            <div
              key={booking.id}
              className="bg-card hover:bg-secondary/50 flex flex-col justify-between gap-4 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium">
                    {booking.first_name} {booking.last_name}
                  </span>
                  <Badge variant="secondary">potwierdzone</Badge>
                </div>

                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {booking.check_in} - {booking.check_out}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{/* nights could be derived client-side later */}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-lg font-semibold">
                <DollarSign className="text-primary h-4 w-4" />
                {/* amount optional */}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {reservations.length === 0 && (
            <div className="text-muted-foreground text-sm">Brak rezerwacji</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
