"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"];
const MONTHS = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

// Sample booking data
const bookedDates = [5, 6, 7, 12, 13, 14, 15, 20, 21, 27, 28, 29, 30];

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isBooked = bookedDates.includes(day);
    const isToday = isCurrentMonth && day === today.getDate();
    const isSelected = selectedDate === day;

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`hover:bg-secondary aspect-square rounded-lg text-sm font-medium transition-colors ${
          isBooked
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : isSelected
              ? "bg-accent text-accent-foreground ring-primary ring-2"
              : isToday
                ? "bg-secondary ring-primary ring-2"
                : "hover:bg-secondary"
        }`}
      >
        {day}
      </button>,
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Availability Calendar</CardTitle>
            <CardDescription>Manage bookings and availability</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Reservation</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-center">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">
              {MONTHS[month]} {year}
            </h3>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-muted-foreground py-2 text-center text-xs font-medium"
              >
                {day}
              </div>
            ))}
            {days}
          </div>

          <div className="flex items-center justify-center gap-6 border-t pt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-3 w-3 rounded" />
              <span className="text-muted-foreground">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary ring-primary h-3 w-3 rounded ring-2" />
              <span className="text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded border-2" />
              <span className="text-muted-foreground">Available</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
