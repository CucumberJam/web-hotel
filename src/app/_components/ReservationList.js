'use client';
import ReservationCard from "@/app/_components/ReservationCard.js";
import { useOptimistic } from 'react';
import {deleteBooking} from "@/app/_lib/actions.js";
export default function ReservationList({bookings}){
    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings,  // initialState and updatingFunc
        (curBookings, bookingId) => curBookings.filter(el => el.id === bookingId));
    async function handleDeleteByBookingId(bookingId){
        optimisticDelete(bookingId)
        await deleteBooking(bookingId);
    }
    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking}
                                 key={booking.id}
                                 onDelete={handleDeleteByBookingId}/>
            ))}
        </ul>
    );
}