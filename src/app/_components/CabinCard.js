import { UsersIcon } from "@heroicons/react/24/solid";
import Image from 'next/image'
import Link from "next/link.js";
function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className='flex-auto w-44 relative'>
        <Image
            src={image} quality={90}
            fill
            alt={`Cabin ${name}`}
            className="object-cover border-r border-primary-800"/>
      </div>

      <div className="flex-grow">
        <div className="bg-primary-950
        pt-2 sm:pt-5 md:pt-3 lg:pt-5
        pb-2 sm:pb-4 md:pb-2 lg:pb-4
        px-3 sm:px-7 md:px-4 lg:px-7 ">
          <h3 className="text-accent-500 font-semibold
          text-lg sm:text-2xl md:text-xl lg:text-2xl
          mb-1 sm:mb-3 md:mb-1 lg:mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-primary-200
            text-md sm:text-lg md:text-base lg:text-lg ">
              Up to
              <span className="font-bold"> {maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="font-[350]
                      sm:text-3xl md:text-xl lg:text-3xl ">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="font-[350]
                    sm:text-3xl md:text-xl lg:text-3xl">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950
         text-right">
            <Link
                href={`/cabins/${id}`}
                className="border-l border-t border-primary-800 inline-block hover:bg-accent-600 transition-all hover:text-primary-900
            py-2 px-3 text-xs
            sm:py-4 sm:px-6 sm:text-base
            md:py-2 md:px-2 md:text-sm
            lg:py-4 lg:px-6 lg:text-base">
              Details & reservation
              <span className='visible msx-lg:hidden lg:visible'>&rarr;</span>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
