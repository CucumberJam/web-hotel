'use server';
import {signIn, signOut} from '@/auth.js'

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
export async function sinUpAction(){

}