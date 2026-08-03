import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-dark.css'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CalendarView() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="h-screen w-full bg-black p-4">
      <Calendar
        className="full-calendar"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}