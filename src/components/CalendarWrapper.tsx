"use client";
import React, { useState } from "react";
import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";
const CalendarWrapper = () => {
  const [events, setEvents] = useState([] as CalendarEvent[]);

  const handleEventAdd = (event: CalendarEvent): void => {
    setEvents([...events, event] as never);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent): void => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventDelete = (eventId: string): void => {
    setEvents(events.filter((event: CalendarEvent) => event.id !== eventId));
  };

  return (
    <EventCalendar
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="month"
    />
  );
};

export default CalendarWrapper;
