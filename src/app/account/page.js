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
            <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
                Welcome, {session.user?.name || session.user?.fullName}!
            </h2>
        </div>
    );
}