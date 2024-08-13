import bg from '../../public/bg.png'
import Image from "next/image.js";
import Link from "next/link.js";
export default function Home() {
  return (
      <main className="mt-24">
          <Image src={bg} fill opacity={85}
                 placeholder='blur' className='object-cover object-top'
                 alt="Mountains and forests with two cabins" />

          <div className="relative z-10 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-8xl text-primary-50 mb-10 tracking-tight font-normal">
                  Welcome to paradise.
              </h1>
              <Link href="/cabins"
                    className="bg-accent-500 text-primary-800 font-semibold hover:bg-accent-600 transition-all
                    px-8 py-6
                    text-xs sm:text-sm md:text-lg">
                  Explore luxury cabins
              </Link>
          </div>
      </main>
  );
}
