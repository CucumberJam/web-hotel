import {getBooking, getCabin} from "@/app/_lib/data-service.js";
import {updateBooking} from "@/app/_lib/actions.js";
import SubmitButton from "@/app/_components/SubmitButton.js";

export default async function Page({params}) {

  const {bookingId} = params;
  const {numGuest, observations, cabinId} = await getBooking(bookingId);
  const {maxCapacity} = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-accent-400 mb-7
      text-base md:text-lg lg:text-2xl">
        Edit Reservation #{bookingId}
      </h2>

      <form action={updateBooking} className="bg-primary-900 flex flex-col
      py-4 md:py-6 lg:py-8
      px-6 md:px-8 lg:px-12
      text-sm md:text-base lg:text-lg
      gap-3 md:gap-5 lg:gap-6">
        <input type='hidden' value={bookingId} name='bookingId'/>
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuest}
            className="bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm
            px-2 md:px-3 lg:px-5
            py-1 md:py-2 lg:py-3 "
            required>
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm
            px-2 md:px-3 lg:px-5
            py-1 md:py-2 lg:py-3 "/>
        </div>

        <SubmitButton  labelLoading='Update reservation'/>
      </form>
    </div>
  );
}
