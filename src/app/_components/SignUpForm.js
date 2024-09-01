'use client'
import {useRouter} from "next/navigation.js";
import {useState} from "react";

export function SignUpForm() {
    const [errMessage, setErrMessage] = useState('');
    const router = useRouter();
    async function handleSubmit(event){
        event.preventDefault();
        try{
            const formData = new FormData(event.currentTarget);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await fetch('/api/register',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    name, email, password
                })
            })
            if(response.status === 201){
                router.push('/')
            }else throw new Error(response.error);

        }catch (e) {
            setErrMessage(e);
            setTimeout(()=>{
                setErrMessage('')
            }, 2000)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='w-80 flex flex-col'>
            {errMessage.length > 0 && <div className='text-red-600 text-lg'>
                {errMessage}
            </div>}
            <div className='flex justify-end items-center space-x-3'>
                <label htmlFor='name'>Name:</label>
                <input id='name' type='text' name='name'
                       className='w-60 border mx-2 border-gray-500 rounded bg-inherit px-2 py-1'/>
            </div>
            <div className='mt-4 flex justify-end items-center space-x-3'>
                <label htmlFor='email'>Email:</label>
                <input id='email' type='email' name='email'
                       className='w-60 border mx-2 border-gray-500 rounded bg-inherit px-2 py-1'/>
            </div>
            <div className='mt-4 flex justify-end items-center space-x-3'>
                <label htmlFor='password'>Password:</label>
                <input id='password' type='password' name='password'
                       className='w-60 border mx-2 border-gray-500 rounded bg-inherit px-2 py-1'/>
            </div>
            <button type='submit'
                    className='mt-8 py-4 px-20 self-center bg-inherit border border-primary-300 hover:border-white rounded flex justify-center items-center'>
                Sign Up
            </button>
        </form>
    )
}