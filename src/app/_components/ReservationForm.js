'use client';
import Image from "next/image";
import {useReservation} from "@/app/_context/ReservationContext.js";

function ReservationForm({maxCapacity}) {
    const {range} = useReservation();
  return (
    <div className='col-span-2 md:col-span-1
                    scale-[1] md:scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        {/* <ImageWrapper src={user.image}
                      name={user.name}/> */}
      </div>
        {range?.from && range?.to && (
            <p>
            {String(range?.from) + ' to ' + String(range?.to)}
            </p>
        )}

      <form className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <SelectNumGuests maxCapacity={maxCapacity}/>
        <AddCommentsTextArea/>
        <ButtonReserve/>
      </form>
    </div>
  );
}

export default ReservationForm;

function SelectNumGuests({maxCapacity}){
  return (
      <div className='space-y-2 overflow-y-visible
            text-sm sm:text-base md:text-lg'>
        <label htmlFor='numGuests'>How many guests?</label>
        <select
            name='numGuests'
            id='numGuests'
            className='bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm
            px-3 md:px-5
            py-2 md:py-3'
            size={1}
            required>
          <option value='' key=''>
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
          ))}
        </select>
      </div>
  );
}
function AddCommentsTextArea(){
  return (
      <div className='space-y-2
            text-sm sm:text-base md:text-lg'>
        <label htmlFor='observations'>
          Anything we should know about your stay?
        </label>
        <textarea
            name='observations'
            id='observations'
            className='bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm
            px-3 md:px-5
            py-2 md:py-3'
            placeholder='Any pets, allergies, special requirements, etc.?'/>
      </div>
  );
}
function ButtonReserve(){
  return (
      <div className='flex justify-end items-center gap-6'>
        <p className='text-primary-300
        text-center md:text-left
        text-sm md:text-base'>
          Start by selecting dates
        </p>

        <button className='bg-accent-500 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300
        text-sm md:text-base
         px-4 sm:px-6 md:px-8
         py-2 sm:py-3 md:py-4'>
          Reserve now
        </button>
      </div>
  );
}
function ImageWrapper({src, name}){
  return (
      <div className='flex gap-4 items-center'>
        <Image
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={src}
            alt={name}
        />
        <p>{name}</p>
      </div>
  );
}