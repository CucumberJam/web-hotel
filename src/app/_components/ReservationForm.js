'use client';
import {useReservation} from "@/app/_context/ReservationContext.js";
import {useAuth} from "@/app/_context/AuthContext.js";
import LoginMessage from "@/app/_components/LoginMessage.js";
import {differenceInDays} from "date-fns";
import {createBooking} from "@/app/_lib/actions.js";
import SubmitButton from "@/app/_components/SubmitButton.js";

function ReservationForm({cabinId, maxCapacity, regularPrice,
                             discount, breakfastPrice, bookedDates}) {
    const {range, resetRange} = useReservation();
    const session = useAuth();

    if(!session?.user) return <LoginMessage/>;

    const userName = session.user?.name || '';
    const userImage = session.user?.image || '';

    const startDate = range?.from;
    const endDate = range?.to;
    const numNights = Math.abs(differenceInDays(startDate, endDate));
    const cabinPrice = numNights * (regularPrice - discount) ;
    const bookingData = {
        startDate, endDate, numNights, cabinPrice, cabinId
    }
    const createBookingWithData = createBooking.bind(null,
        bookingData, breakfastPrice, range, bookedDates)
    return (
    <div className='col-span-2 md:col-span-1
                    scale-[1] md:scale-[1.01]
                    lg:min-h-[512px] bg-primary-900
                    md:min-h-[466px]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
          {(userImage && userName) && (
              <>
              <p>Logged in as </p>
              <ImageWrapper src={userImage}
                            name={userName}/>
              </>
          )}
      </div>
        {range?.from && range?.to && (
            <p className='m-auto text-center bg-primary-950'>
                {'From ' + (range?.from).toLocaleDateString() + ' to ' + (range?.to).toLocaleDateString()}
            </p>
        )}

      <form action={async(formData)=> {
          await createBookingWithData(formData);
          resetRange();
        }
      }
          className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <SelectNumGuests maxCapacity={maxCapacity}/>
        <CheckboxBreakfast/>
        <AddCommentsTextArea/>
          <div className='flex justify-end items-center gap-6'>
              {!(startDate && endDate) ? <p className='text-primary-300
                        text-center md:text-left
                        text-sm md:text-base'>
                  Start by selecting dates
              </p> :
                  <SubmitButton labelNormal='Reserving...'
                  labelLoading='Reserve now'/>}
          </div>
      </form>
    </div>
  );
}
function CheckboxBreakfast(){
    return (
        <div className='space-y-2 overflow-y-visible
            text-sm sm:text-base md:text-lg'>
            <label htmlFor='hasBreakfast'>
                <input type='checkbox'
                   name='hasBreakfast'
                   id='hasBreakfast'
                   className='w-10 h-4 ml-2'/>
                Include breakfast
            </label>
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
function ImageWrapper({src, name}){
  return (
      <div className='flex gap-4 items-center'>
        <img
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