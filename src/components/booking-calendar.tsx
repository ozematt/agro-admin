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
import { ChevronLeft, ChevronRight } from "lucide-react";
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

// Sample booking data
const bookedDates = [
  new Date(2025, 9, 5),
  new Date(2025, 9, 6),
  new Date(2025, 9, 7),
];

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === currentYear && today.getMonth() === currentMonth;

  const firstDayRaw = new Date(currentYear, currentMonth, 1).getDay();
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  // Pomocnicza funkcja do porównywania dat (tylko rok-miesiąc-dzień)
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Funkcja sprawdzająca czy data jest zarezerwowana
  const isDateBooked = (
    day: number,
    month: number,
    year: number,
    bookedDates: Date[],
  ): boolean => {
    const checkDate = new Date(year, month, day);
    return bookedDates.some((bookedDate) => isSameDay(checkDate, bookedDate));
  };

  // W komponencie:
  const days = [];
  // const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(currentYear, currentMonth, day);
    const isBooked = bookedDates.some((bookedDate) =>
      isSameDay(currentDate, bookedDate),
    );
    const isToday = isSameDay(currentDate, today);
    const isSelected = selectedDate === day && isCurrentMonth; // opcjonalnie dodaj sprawdzenie miesiąca

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={isBooked} // opcjonalnie - blokuj kliknięcie w zarezerwowane dni
        className={`hover:bg-secondary aspect-square rounded-lg text-sm font-medium transition-colors ${
          isBooked
            ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-not-allowed"
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
}
