import NextAuth from 'next-auth';
import Google from "next-auth/providers/google";

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
        }
    }
}
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(config);

