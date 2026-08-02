import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function MyApp() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='h-screen w-full flex justify-center items-center '>
      <Calendar className={""} onChange={onChange} value={value} />
    </div>
  );
}