import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation.js';
import Image from "next/image";
import Link from "next/link.js";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <ReservationCardBox>
      <ReservationImage image={image}
                        name={name}/>

      <ReservationInfo>
        <ReservationInfoTitle startDate={startDate}
                              numNights={numNights}/>
        <ReservationInfoDates startDate={startDate}
                              endDate={endDate}/>

        <ReservationInfoTotal totalPrice={totalPrice}
                              numGuests={numGuests}
                              created_at={created_at}/>
      </ReservationInfo>

      <ReservationActions startDate={startDate}
                          id={id}/>
    </ReservationCardBox>
  );
}

export default ReservationCard;
function ReservationCardBox({children}){
  return (
      <div className='flex border border-primary-800
      flex-col sm:flex-row'>
        {children}
      </div>
  );
}
function ReservationImage({image, name}){
  return (
      <div className='relative aspect-square
      h-32 sm:h-40 md:h-36 lg:32'>
        <Image
            src={image}
            alt={`Cabin ${name}`}
            fill className='object-cover border-r border-primary-800'/>
      </div>
  );
}
function ReservationInfo({children}){
  return (
      <div className='flex-grow flex flex-col
      px-4 sm:px-6
      py-2 sm:py-3
      gap-1 sm:gap-0'>
        {children}
      </div>
  );
}
function ReservationInfoTitle({numNights, startDate, name}){
  return (
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold
        text-base sm:text-lg md:text-xl'>
          {numNights} nights in Cabin {name}
        </h3>

        {isPast(new Date(startDate)) ? (
            <span className='bg-yellow-800 text-yellow-200 text-xs uppercase font-bold flex items-center rounded-sm
             h-5 sm:h-7
             px-2 sm:px-3'>
              past
            </span>
        ) : (
            <span className='bg-green-800 text-green-200 text-xs uppercase font-bold flex items-center rounded-sm
            h-5 sm:h-7
            px-2 sm:px-3'>
              upcoming
            </span>
        )}
      </div>
  );
}
function ReservationInfoDates({startDate, endDate}){
  return (
      <p className='text-primary-300
                    text-sm sm:text-base md:text-lg'>
        {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
        {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
        ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
      </p>
  );
}
function ReservationInfoTotal({totalPrice, numGuests, created_at}){
  return (
      <div className='flex mt-auto items-baseline flex-wrap
      gap-2 lg:gap-5'>
        <p className='font-semibold text-accent-400
        text-lg lg:text-xl
        order-last lg:order-first'>${totalPrice}</p>

        <p className='text-primary-300
                       text-md lg:text-lg'>
            &bull; {numGuests} guest{numGuests > 1 && 's'} &bull;
        </p>
        <p className='text-primary-400
                    text-xs lg:text-sm
                    order-first lg:order-last
                    ml-0'>
          Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
        </p>
      </div>
  );
}
function ReservationActions({startDate, id}){
  if(isPast(new Date(startDate))) return null;
  return (
      <div className='flex border-l border-primary-800 w-[100px]
      border-t sm:border-t-0
      flex-row sm:flex-col
      self-end sm:self-auto
      min-w-[180px] sm:min-w-[99px]
      min-h-10 md:min-h-max'>
        <Link href={`/account/reservations/edit/${id}`}
              className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow hover:bg-accent-600 transition-colors hover:text-primary-900 px-3
              border-r sm:border-r-0 sm:border-b border-primary-800'>
          <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors'/>
          <span className='mt-1'>Edit</span>
        </Link>
        <DeleteReservation bookingId={id}/>
      </div>
  );
}
