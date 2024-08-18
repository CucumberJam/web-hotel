'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import {useReservation} from "@/app/_context/ReservationContext.js";

function ReservationReminder() {
  const {range, resetRange} = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <ReminderWrapper>
      <p className={'max-w-80 sm:max-w-fit'}>
        <span>👋</span> Don&apos;t forget to reserve your dates <br className={'hidden md:visible'} /> from{' '}
        {format(new Date(range.from), 'MMM dd yyyy')} to{' '}
        {format(new Date(range.to), 'MMM dd yyyy')}
      </p>
      <button className='rounded-full p-1 hover:bg-accent-600 transition-all'
                onClick={resetRange}>
        <XMarkIcon className='h-3 md:h-5 w-3 md:w-5' />
      </button>
    </ReminderWrapper>
  );
}

export default ReservationReminder;
function ReminderWrapper({children}){
    return (
        <div className='fixed bottom-6 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex items-center
                    -translate-x-1/2 left-1/2
                    text-xs sm:text-sm md:text-base
                    py-2 sm:py-3 md:py-5
                    px-4 sm:px-6 md:px-8
                    gap-3 sm:gap-6 md:gap-8'>
            {children}
        </div>
    );
}
