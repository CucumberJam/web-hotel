import CabinList from "@/app/_components/CabinList.js";
import {Suspense} from "react";
import Spinner from "@/app/_components/Spinner.js";
import Filter from "@/app/_components/Filter.js";

export const revalidate = 360; //Do not need it bc use of searchParams it's dynamically render now anyway
export const metadata = {
    title: 'Cabins'
}
export default async function Page({searchParams}){
    const filter = searchParams?.capacity ?? 'all';
    return (
        <div>
            <h1 className="mb-5 text-accent-400 font-medium
                text-xl sm:text-2xl md:text-4xl">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 mb-10
                text-sm sm:text-base md:text-lg">
                Cozy yet luxurious cabins, located right in the heart of the Italian
                Dolomites. Imagine waking up to beautiful mountain views, spending your
                days exploring the dark forests around, or just relaxing in your private
                hot tub under the stars. Enjoy nature beauty in your own little home
                away from home. The perfect spot for a peaceful, calm vacation. Welcome
                to paradise.
            </p>
            <Filter/>
            <Suspense fallback={<Spinner/>}
                      key={filter}>
                <CabinList filter={filter}/>
            </Suspense>
        </div>
    );
}