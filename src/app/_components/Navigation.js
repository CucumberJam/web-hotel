import Link from "next/link.js";
import {auth} from "@/app/_lib/auth.js";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex
                      pr-2 sm:pr-0
                      flex-col sm:flex-row sm:items-center
                      gap-1 sm:gap-10 md:gap-16">
        <li className='h-5 sm:h-fit'>
          <Link href="/cabins" className="text-sm sm:text-base md:text-xl hover:text-accent-400 transition-colors ">
            Cabins
          </Link>
        </li>
        <li className='h-5 sm:h-fit'>
          <Link href="/about" className="text-sm sm:text-base md:text-xl hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li className='h-5 sm:h-fit'>
          {session?.user?.image ? (
              <Link href="/account" className="flex items-center gap-4 text-sm sm:text-base md:text-xl hover:text-accent-400 transition-colors">
                <img className='h-8 rounded-full'
                     src={session.user.image}
                     alt={session.user.name}
                     referrerPolicy={"no-referrer"}/>
                <span>Account</span>
              </Link>
              ):
              <Link href="/account" className="text-sm sm:text-base md:text-xl hover:text-accent-400 transition-colors">
                Account
              </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
