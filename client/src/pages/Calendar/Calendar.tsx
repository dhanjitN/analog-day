import { useState } from 'react';
import { useNavigate } from 'react-router';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-dark.css'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


export function CalendarView() {
  const navigate = useNavigate();
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="h-screen w-full bg-black p-4">
      <Calendar
        onClickDay={(date)=>{
          const iso = date.toISOString().split('T')[0];
          navigate(`/day/${iso}`);

        }}
        className="full-calendar"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}