'use server';
import {auth, signIn, signOut} from '@/auth.js'
import bcrypt from "bcryptjs";
import {userData} from "@/app/_lib/constants.js";
import validateData from "@/app/_lib/validateHelper.js";
import {getBookings, updateGuest, updateBooking as fetchUpdateBooking} from "@/app/_lib/data-service.js";
import {revalidatePath} from "next/cache";
import {supabase} from "@/app/_lib/supabase.js";
import {redirect} from "next/navigation";

export async function signInAction(formData){
    const action = formData.get('action');
    await signIn(action, {redirectTo: '/account'});
}
export async function signOutAction(){
    await signOut({redirectTo: '/'});
}
export async function signInCredentialAction(formData){
    try{
        const res =  await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        return res;
    }catch (error) {
        throw new Error(error);
    }

}
export async function updateGuestAction(formData = null){
    const session = await auth();
    if(!session) throw new Error('You must be logged in');

    const updatedParams = {};
    for(const feature in userData){
       const value = formData.get(feature);
       if(value){
           if(feature === 'nationality'){
               const array = value.split('%');
               updatedParams.nationality = array[0];
               updatedParams.countryFlag = array[1];
           }else {
               if(session.user[feature] !== value){
                   updatedParams[feature] = value;
               }
           }
       }
    }
    const isValidated = validateData(updatedParams);
    if(isValidated.success) {
        if(updatedParams.password) updatedParams.password = await bcrypt.hash(updatedParams.password, 5);
    }else{
        const errorMessage = Object.values(isValidated.errors)[0].title;
        throw new Error(errorMessage);
    }
    try{
        await updateGuest(session.user.guestId, updatedParams);
        revalidatePath('/account/profile', 'page');
    }catch (e) {
        throw new Error(e.message);
    }
}

export async function deleteReservation(bookingId){
    try{
        const guestId = await checkUserSession(bookingId);
        if(guestId){
            const { error } = await supabase.
            from('bookings').
            delete().
            eq('id', bookingId).
            eq("guestId", guestId);

            if (error) {
                console.error(error);
                throw new Error('Booking could not be deleted');
            }
            revalidatePath('/account/reservations');
        } else throw new Error('No authorized guest with this id found');
    }catch (e) {
        throw new Error(e.message);
    }

}
export async function updateBooking(formData = null){
    let data = null;
    const bookingId = Number(formData.get('bookingId'));
    try{
        const guestId = await checkUserSession(bookingId, 'update');
        if(guestId){
            const updateData = {
                numGuests: Number(formData.get('numGuests')),
                observations: formData.get('observations').slice(0, 1000)
            }
            data = await fetchUpdateBooking(bookingId, updateData);
        }else throw new Error('No authorized guest with this id found');
    }catch (e) {
        throw new Error(e.message);
    }
    if(bookingId === data?.id) revalidatePath('/account/reservations', 'layout');
    redirect('/account/reservations');
}
async function checkUserSession(bookingId, message = 'delete'){
    // Authentication:
    const session = await auth();
    if(!session) throw new Error('You must be logged in');

    // Authorization:
    const bookings = await getBookings(session.user.guestId);
    if (!bookings.some((el) => el.id === bookingId)) {
        throw new Error(`You are not allowed to ${message} this booking`);
    }

    return session?.user?.guestId;
}