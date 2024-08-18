'use server';
import {signIn} from '@/app/_lib/auth.js'
export async function signInAction(){
    await signIn('google', {redirectTo: '/account'})
}