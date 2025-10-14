"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import { use, useRef, useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  color?: string;
}

const CalendarWrapper = ({
  eventsPromise,
}: {
  eventsPromise: Promise<any[]>;
}) => {
  const events = use(eventsPromise);
  const calendarRef = useRef<FullCalendar>(null);

  //   const [events, setEvents] = useState<Event[]>([
  //     {
  //       id: "1",
  //       title: "Meeting z klientem",
  //       start: "2024-12-20T10:00:00",
  //       end: "2024-12-26T11:00:00",
  //       color: "#3b82f6",
  //     },
  //     {
  //       id: "2",
  //       title: "Prezentacja projektu",
  //       start: "2024-12-20T14:00:00",
  //       end: "2024-12-24T15:30:00",
  //       color: "#ef4444",
  //     },
  //     {
  //       id: "3",
  //       title: "Prezentacja projektu",
  //       start: "2024-12-20T14:00:00",
  //       end: "2024-12-24T15:30:00",
  //       color: "#ef5252",
  //     },
  //     {
  //       id: "4",
  //       title: "Prezentacja projektu",
  //       start: "2024-12-20T14:00:00",
  //       end: "2024-12-24T15:30:00",
  //       color: "#ef5252",
  //     },
  //   ]);

  // Obsługa wyboru daty/czasu
  //   const handleDateSelect = (selectInfo: DateSelectArg) => {
  //     const title = prompt("Wprowadź tytuł wydarzenia:");

  //     if (title) {
  //       const newEvent: Event = {
  //         id: Date.now().toString(),
  //         title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         color: "#10b981",
  //       };

  //       setEvents((prev) => [...prev, newEvent]);
  //     }

  //     selectInfo.view.calendar.unselect();
  //   };

  //   // Obsługa kliknięcia w wydarzenie
  //   const handleEventClick = (clickInfo: EventClickArg) => {
  //     if (confirm(`Czy chcesz usunąć wydarzenie '${clickInfo.event.title}'?`)) {
  //       setEvents((prev) =>
  //         prev.filter((event) => event.id !== clickInfo.event.id),
  //       );
  //     }
  //   };

  //   // Obsługa przeciągnięcia wydarzenia
  //   const handleEventDrop = (dropInfo: any) => {
  //     const updatedEvent: Event = {
  //       id: dropInfo.event.id,
  //       title: dropInfo.event.title,
  //       start: dropInfo.event.startStr,
  //       end: dropInfo.event.endStr,
  //       color: dropInfo.event.backgroundColor,
  //     };

  //     setEvents((prev) =>
  //       prev.map((event) =>
  //         event.id === updatedEvent.id ? updatedEvent : event,
  //       ),
  //     );
  //   };
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next",
        center: "",
        right: "title",
      }}
      firstDay={1}
      events={events}
      selectable={true}
      selectMirror={true}
      editable={true}
      droppable={true}
      //   select={handleDateSelect}
      //   eventClick={handleEventClick}
      //   eventDrop={handleEventDrop}
      height="auto"
      locale="pl"
      dayHeaderFormat={{ weekday: "short" }}
      dayHeaderContent={({ date }) => {
        const options: Intl.DateTimeFormatOptions = { weekday: "short" };
        const raw = new Intl.DateTimeFormat("pl-PL", options).format(date);
        // usunięcie kropki, pierwsza litera duża
        const clean = raw.replace(/\./g, "");
        return clean.charAt(0).toUpperCase() + clean.slice(1);
      }}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
      }}
    />
  );
};

export default CalendarWrapper;
