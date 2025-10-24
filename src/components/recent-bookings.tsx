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

const bookings = [
  {
    id: 1,
    guest: "Sarah Johnson",
    checkIn: "Oct 5, 2025",
    checkOut: "Oct 7, 2025",
    nights: 2,
    amount: "$480",
    status: "potwierdzone",
  },
  {
    id: 2,
    guest: "Michael Chen",
    checkIn: "Oct 12, 2025",
    checkOut: "Oct 15, 2025",
    nights: 3,
    amount: "$720",
    status: "potwierdzone",
  },
  {
    id: 3,
    guest: "Emily Rodriguez",
    checkIn: "Oct 20, 2025",
    checkOut: "Oct 21, 2025",
    nights: 1,
    amount: "$240",
    status: "oczekuje",
  },
  {
    id: 4,
    guest: "David Park",
    checkIn: "Oct 27, 2025",
    checkOut: "Oct 30, 2025",
    nights: 3,
    amount: "$720",
    status: "potwierdzone",
  },
  {
    id: 5,
    guest: "David Park",
    checkIn: "Oct 27, 2025",
    checkOut: "Oct 30, 2025",
    nights: 3,
    amount: "$720",
    status: "potwierdzone",
  },
  {
    id: 6,
    guest: "David Park",
    checkIn: "Oct 27, 2025",
    checkOut: "Oct 30, 2025",
    nights: 3,
    amount: "$720",
    status: "potwierdzone",
  },
];

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ostatnie rezerwacje</CardTitle>
        <CardDescription>Najnowsze rezerwacje i zapytania</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[550px] space-y-4 overflow-y-scroll">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-card hover:bg-secondary/50 flex flex-col justify-between gap-4 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium">{booking.guest}</span>
                  <Badge
                    variant={
                      booking.status === "potwierdzone"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {booking.checkIn} - {booking.checkOut}
                    </span>
                  </div>
                  <span>•</span>
                  <span>
                    {booking.nights} {booking.nights === 1 ? "night" : "nights"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-lg font-semibold">
                <DollarSign className="text-primary h-4 w-4" />
                {booking.amount}
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
        </div>
      </CardContent>
    </Card>
  );
}
