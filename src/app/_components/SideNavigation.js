'use client';
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton.js';
import Link from "next/link.js";
import {usePathname} from "next/navigation.js";
import useWindowDimensions from "@/app/_hooks/useWindowDimensions.js";

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Profile',
    href: '/account/profile',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
];

function SideNavigation() {
  const pathName = usePathname();
  const { width } = useWindowDimensions();
  return (
    <nav className='border-r border-primary-900'>
      {width > 768 ? <ul className='flex flex-col gap-2 h-full text-lg'>
        {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                  className={`${pathName === link.href ? 'bg-primary-900' : ''} py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                  href={link.href}>
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
        ))}

        <li className='mt-auto'>
          <SignOutButton/>
        </li>
      </ul> :
          <ul className='flex flex-col gap-2 h-full text-lg'>
            {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                      className={`${pathName === link.href ? 'bg-primary-900' : ''} py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                      href={link.href}>
                    {link.icon}
                  </Link>
                </li>
            ))}

            <li className='mt-auto'>
              <SignOutButton withTitle={false}/>
            </li>
          </ul>
      }
    </nav>
  );
}

export default SideNavigation;
