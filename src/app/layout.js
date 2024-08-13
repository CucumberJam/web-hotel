import { Josefin_Sans } from "next/font/google";
import '@/app/_styless/globals.css';
import Header from "@/app/_components/Header.js";

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
    <html lang="en">
      <body className={`${josefinSans.className} 
            bg-primary-950 text-primary-100 min-h-screen
            flex flex-col antialiasing`}>
          <Header/>
          <div className='flex-1 grid
          px-4 py-2 sm:px-5 sm:py-4 md:px-8 md:py-5'>
              <main className='max-w-7xl mx-auto w-full'>
                  {children}
              </main>
          </div>
          <footer>Copyright by The Web Hotel</footer>
      </body>
    </html>
  );
}
