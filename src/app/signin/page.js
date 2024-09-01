import Link from "next/link.js";
import {SignUpForm} from "@/app/_components/SignUpForm.js";
import SignInButton from "@/app/_components/SignInButton.js";

export const metadata = {
    title: 'Sign Up'
}
export default function Page() {

    return (
        <div className="flex flex-col gap-10 mt-10 items-center ">
            <h2 className="text-3xl font-semibold">
                Sign up to access your guest area
            </h2>
            <div className='border border-gray-500 px-10 py-10 flex flex-col space-y-10'>
                <SignUpForm/>
                <SignInButton />
                <div className='w-full text-center'>
                    <p>Already have an account?</p>
                    <Link href='/login' className='mx-2 underline hover:text-accent-400'>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
