"use client";

import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateRange } from "react-aria-components";

import { RangeCalendar } from "@/components/ui/calendar-rac";

export default function Component() {
  const now = today(getLocalTimeZone());
  const [date, setDate] = useState<DateRange | null>({
    start: now,
    end: now.add({ days: 3 }),
  });

  return (
    <div>
      <RangeCalendar
        className="rounded-md border p-2"
        value={date}
        onChange={setDate}
      />
    </div>
  );
}
