'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useEffect } from 'react';

export interface DatePickerProps {
  trackDate: Date;
  setPlanDate: (date: Date) => void;
}
export function DatePicker({ trackDate, setPlanDate }: DatePickerProps) {
  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    if (!date) return;
    setPlanDate(date);
  }, [date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[200px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          initialFocus
          className="border-muted"
        />
      </PopoverContent>
    </Popover>
  );
}
