import NextAuth from 'next-auth';
import Google from "next-auth/providers/google";
import {createGuest, getGuest} from "@/app/_lib/data-service.js";

const config = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks:{
        authorized({auth, request}){
            return !!auth?.user;
        },
        async signIn(user, account, profile){ //before auth completed
            try{
                const existingGuest = await getGuest(user.email);
                if(!existingGuest){
                  const data = await createGuest({
                      email: user.email,
                      fullName: user.name
                  });
                }
                return true;
            }catch (e) {
                return false;
            }
        },
    },
    pages: {
        signIn: '/login'
    }
}
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(config);

