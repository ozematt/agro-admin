"use client"; // Ważne dla Next.js 15 App Router

import { Suspense } from "react";

import { Calendar, Plus } from "lucide-react";
import { SectionTitle } from "@/components";
import CalendarSkeleton from "./CalendarSkeleton";
import CalendarWrapper from "./CalendarWrapper";

const UnitCalendar = () => {
  async function getEvents() {
    await new Promise((r) => setTimeout(r, 200)); // 3 sekundy
    return [{ title: "Test", date: "2025-10-01" }];
  }

  return (
    <div className="sectionContainer">
      <div className="mb-6 flex items-center justify-between">
        <SectionTitle Icon={Calendar} title="Terminarz" />
        <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600">
          <Plus size={20} />
          Dodaj rezerwacje
        </button>
      </div>
      <Suspense fallback={<CalendarSkeleton />}>
        <CalendarWrapper eventsPromise={getEvents()} />
      </Suspense>
      {/* Lista wydarzeń */}
      {/* <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 text-lg font-semibold">Nadchodzące wydarzenia:</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">Brak wydarzeń</p>
        ) : (
          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 rounded bg-white p-2"
              >
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: event.color }}
                />
                <span className="font-medium">{event.title}</span>
                <span className="text-sm text-gray-500">
                  {new Date(event.start).toLocaleDateString("pl-PL")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UnitCalendar;
