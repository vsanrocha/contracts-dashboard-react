"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import dayjs from 'dayjs';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  to?: Date;
  from?: Date;
  onSelect?: (date: DateRange) => void;
}

export default function DatePickerWithRange({
  from,
  to,
  onSelect,
  className,
}: React.HTMLAttributes<HTMLDivElement> & DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from,
    to,
  });

  const changeDate = (date: DateRange) => {
    setDate(date);
    onSelect?.(date);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("MMM DD, YYYY")} -{" "}
                  {dayjs(date.to).format("MMM DD, YYYY")}
                </>
              ) : (
                dayjs(date.from).format("MMM DD, YYYY")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={changeDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
