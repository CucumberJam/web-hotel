import Link from "next/link.js";

function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4'>
      <h1 className='text-lg sm:text-xl md:text-3xl font-semibold'>
        This page could not be found :(
      </h1>
      <Link href='/'
        className='inline-block bg-accent-500 text-primary-800
        px-3 sm:px-4 md:px-6
        py-1.5 sm:py-2 md:py-3
        text-sm sm:text-base md:text-lg'>
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
