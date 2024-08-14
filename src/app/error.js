'use client';
export default function Error({error, reset}) {
  console.log(error.message);
  return (
    <main className='flex justify-center items-center flex-col
    gap-6 py-2 sm:py-4'>
      <h1 className='text-center text-xl sm:text-3xl font-semibold'>Something went wrong...</h1>
      <p className='text-base sm:text-lg'>ERROR!</p>

      <button className='inline-block bg-accent-500 text-primary-800
                px-3 sm:px-6
                py-2 sm:py-3
                text-sm sm:text-base md:text-lg'
              onClick={reset}>
        Try again
      </button>
    </main>
  );
}
