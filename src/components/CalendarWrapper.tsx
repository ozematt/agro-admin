"use client";
import React, { useState } from "react";
import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";
const CalendarWrapper = () => {
  const [events, setEvents] = useState([]);

  const handleEventAdd = (event) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventDelete = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
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
