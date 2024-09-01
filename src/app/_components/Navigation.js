'use client';
import Link from "next/link.js";
import Image from "next/image.js";
import {useAuth} from "@/app/_context/AuthContext.js";
import SpinnerMini from "@/app/_components/SpinnerMini.js";

export default function Navigation() {
  //const session = await auth();
  const { user, loading } = useAuth();
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
          {loading ? <SpinnerMini/>:
              (user?.image ? (
                      <Link href="/account" className="flex items-center gap-4 text-sm sm:text-base md:text-xl hover:text-accent-400 transition-colors">
                        <Image className='h-8 rounded-full'
                             src={user.image}
                               width={36} height={36}
                             alt={user.name}/>
                        <span>Account</span>
                      </Link>
                  ):
                  <Link href="/login" className="text-sm sm:text-base md:text-xl hover:text-accent-400 transition-colors">
                    Account
                  </Link>)
          }
        </li>
      </ul>
    </nav>
  );
}
