import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, DollarSign } from "lucide-react"

const bookings = [
  {
    id: 1,
    guest: "Sarah Johnson",
    checkIn: "Oct 5, 2025",
    checkOut: "Oct 7, 2025",
    nights: 2,
    amount: "$480",
    status: "confirmed",
  },
  {
    id: 2,
    guest: "Michael Chen",
    checkIn: "Oct 12, 2025",
    checkOut: "Oct 15, 2025",
    nights: 3,
    amount: "$720",
    status: "confirmed",
  },
  {
    id: 3,
    guest: "Emily Rodriguez",
    checkIn: "Oct 20, 2025",
    checkOut: "Oct 21, 2025",
    nights: 1,
    amount: "$240",
    status: "pending",
  },
  {
    id: 4,
    guest: "David Park",
    checkIn: "Oct 27, 2025",
    checkOut: "Oct 30, 2025",
    nights: 3,
    amount: "$720",
    status: "confirmed",
  },
]

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Latest reservations and inquiries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border bg-card hover:bg-secondary/50 transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{booking.guest}</span>
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                <DollarSign className="h-4 w-4 text-primary" />
                {booking.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
