import NextAuth from "next-auth";
import bcrypt from 'bcryptjs';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {createGuest, getGuest} from "@/app/_lib/data-service.js";
import CredentialProvider from "next-auth/providers/credentials";
export const { auth,
    handlers: {GET, POST},
    signIn,
    signOut } = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials){
                if(!credentials) return null;
                try{
                    console.log(credentials);
                    const user = await getGuest(credentials?.email);
                    console.log(user);
                    if (user) {
                        const isMatch = await bcrypt.compare(credentials?.password, user.password);
                        if(isMatch) return user;
                        else throw new Error("Password does not match");
                    } else throw new Error("User not found.");
                }catch (e) {
                    throw new Error(e);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        })

    ],
    pages:{
        signIn: '/login'
    },
    callbacks:{
        authorized({auth, request}){
            return !!auth?.user;
        },
        async signIn({user, account, profile}){ //before auth completed
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
        async session({session, user}){
            const guest = await getGuest(session.user.email);
            session.user.guestId = guest.id;
            if(!session.user?.fullName) session.user.fullName = guest.fullName;
            if(!session.user?.nationalID) session.user.nationalID = guest.nationalID;
            if(!session.user?.nationality) session.user.nationality = guest.nationality;
            if(!session.user?.countryFlag) session.user.countryFlag = guest.countryFlag;
            if(!session.user?.phone) session.user.phone = guest.phone;
            return session;
        }
    },
})