"use client";

import { Calendar1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { formatLocalDate } from "@/utils/helpers";

interface Prop {
  label: string;
  name: string;
  id: string;
  defaultValue: Date | undefined;
}

const DatePicker = ({ label, name, id, defaultValue }: Prop) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? defaultValue : undefined,
  );

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>

      {/* Hidden input so form submission includes this date */}
      <input
        type="hidden"
        name={name}
        id={id}
        value={date ? formatLocalDate(date) : ""}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            type="button"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Wybierz datę"}
            <Calendar1 className="ml-2 h-4 w-4 opacity-70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selected) => {
              setDate(selected);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
