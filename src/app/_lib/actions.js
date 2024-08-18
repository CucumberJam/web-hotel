'use server';
import {signIn, signOut} from '@/app/_lib/auth.js'

export async function signInAction(){
    await signIn('google', {redirectTo: '/account'})
}
export async function signOutAction(){
    await signOut({redirectTo: '/'});
}