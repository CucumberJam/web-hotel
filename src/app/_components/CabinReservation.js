import {getBookedDatesByCabinId, getSettings} from "@/app/_lib/data-service.js";
import DateSelector from "@/app/_components/DateSelector.js";
import ReservationForm from "@/app/_components/ReservationForm.js";
import {auth} from "@/app/_lib/auth.js";
import LoginMessage from "@/app/_components/LoginMessage.js";

export default async function CabinReservation({cabinId, regularPrice, discount, maxCapacity}){
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabinId)
    ]);
    const session = await auth();
    return (
        <div className='grid border border-primary-800
                                mt-5 sm:mt-8
                                grid-cols-2
                                min-h-[400px]'>
            <DateSelector regularPrice={regularPrice || 100}
                          discount={discount || 10}
                          minBookingLength={settings?.minBookingLength || 1}
                          maxBookingLength={settings?.maxBookingLength || 21}
                          bookedDates={bookedDates}/>
            {session?.user ? (
                <ReservationForm maxCapacity={maxCapacity || 1}
                                userName={session.user?.name}
                                userImage={session.user?.image}/>
            ) : (
                <LoginMessage/>
            )}
        </div>
    );
}