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
import { AddReservationDialog } from "@/components";

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

type Prop = {
  reservedDates: Date[];
};

const BookingCalendar = ({ reservedDates }: Prop) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  const firstDayRaw = new Date(currentYear, currentMonth, 1).getDay();
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Pomocnicza funkcja do porównywania dat
  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  // Tablica do renderowania dni miesiąca
  const days = [];

  // Przesuwa pierwszy dzien miesiąca do właściwej kolunmy dnia tygodnia
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }
  // Dodaje dni do kalendarza, styluje dzisiejszy i zarezerwowany dzień
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(currentYear, currentMonth, day);

    const isBooked = reservedDates.some((reservedDate: Date) =>
      isSameDay(reservedDate, currentDate),
    );
    const isToday = isSameDay(currentDate, today);
    days.push(
      <button
        key={day}
        className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
          isBooked
            ? "bg-primary text-primary-foreground"
            : isToday && "bg-secondary ring-primary ring-2"
        }`}
      >
        {day}
      </button>,
    );
  }

  const trigger = (
    <Button variant="default" size="sm" className="gap-2">
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">Dodaj rezerwację</span>
    </Button>
  );

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
            <AddReservationDialog buttonTrigger={trigger} />
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
              {MONTHS[currentMonth]} {currentYear}
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
              <span className="text-muted-foreground">Zarezerwowany</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary ring-primary h-3 w-3 rounded ring-2" />
              <span className="text-muted-foreground">Dziś</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded border-2" />
              <span className="text-muted-foreground">Dostępny</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
