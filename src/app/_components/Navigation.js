import Link from "next/link.js";

export default function Navigation() {
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
          <Link href="/account" className="text-sm sm:text-base md:text-xl hover:text-accent-400 transition-colors">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}
