import {auth} from "@/auth.js";
import {redirect} from 'next/navigation'
export const metadata = {
    title: 'Account'
}
export default async function Page(){
    const session = await auth();
    if(!session?.user) redirect('/login');
    return (
        <div>
            <h2 className='font-semibold text-accent-400 mb-7
            text-base md:text-lg lg:text-2xl'>
                Welcome, { session.user?.fullName || session.user?.name}!
            </h2>
        </div>
    );
}