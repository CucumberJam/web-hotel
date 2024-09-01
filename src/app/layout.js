import { Josefin_Sans } from "next/font/google";
import '@/app/_styless/globals.css';
import { SessionProvider } from 'next-auth/react'
import Header from "@/app/_components/Header.js";
import {ReservationProvider} from "@/app/_context/ReservationContext.js";
import {AuthProvider} from "@/app/_context/AuthContext.js";

const josefinSans = Josefin_Sans({
    subsets: ['latin'],
    display: 'swap'
});
export const metadata = {
    title: {
        template: "%s / The Hotel",
        default: 'Welcome / The Hotel'
    },
    description: "Luxurious cabin hotel, " +
        "located in the heart of the Italian Dolomites, " +
        "surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <AuthProvider>
                <html lang="en">
                <BodyContainer>
                    <Header/>
                    <MainSection>
                        {children}
                    </MainSection>
                    <footer>Copyright by The Web Hotel</footer>
                </BodyContainer>
                </html>
            </AuthProvider>
        </SessionProvider>
    );
}
function BodyContainer({children}){
    return (
        <body className={`${josefinSans.className} 
            bg-primary-950 text-primary-100 min-h-screen
            flex flex-col antialiasing`}>
        {children}
        </body>
    );
}
function MainSection({children}){
    return (
        <div className='flex-1 grid
          px-4 py-2 sm:px-5 sm:py-4 md:px-8 md:py-5'>
            <main className='max-w-7xl mx-auto w-full'>
                <ReservationProvider>
                    {children}
                </ReservationProvider>
            </main>
        </div>
    );
}