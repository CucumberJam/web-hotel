import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {getCabin, getCabins} from "@/app/_lib/data-service.js";
import TextExpander from "@/app/_components/TextExpander.js";

import {Suspense} from "react";
import Spinner from "@/app/_components/Spinner.js";
import CabinReservation from "@/app/_components/CabinReservation.js";

export async function generateMetadata({params}){
    const {name} =  await getCabin(params.cabinId);
    return {
        title: `Cabin ${name}`
    }
}
export async function generateStaticParams(){
    const cabins =  await getCabins();
    const ids = cabins.map(cabin => ({
        cabinId: String(cabin.id)
    }))
    return ids;
}
export default async function Page({params}) {
    const cabin = await getCabin(params.cabinId);

    const { id, name, maxCapacity, regularPrice,
        discount, image, description } = cabin;

    return (
        <CabinContainer>
            <CabinTopContainer>
                <CabinImage image={image}
                            name={name}/>
                <CabinInfoWrapper>
                    <CabinName name={name}/>
                    <CabinDescription description={description}/>
                    <CabinFeatures maxCapacity={maxCapacity}/>
                </CabinInfoWrapper>
            </CabinTopContainer>

            <div>
                <CabinSlogan/>
                <Suspense fallback={<Spinner/>}>
                    <CabinReservation cabinId={id}
                                      regularPrice={regularPrice}
                                      discount={discount}
                                      maxCapacity={maxCapacity}/>
                </Suspense>
            </div>
        </CabinContainer>
    );
}
function CabinImage({image, name, quality= 90}){
    return (
        <div className="relative
                aspect-square md:aspect-auto
                col-span-2 md:col-span-1
                scale-[1] lg:scale-[1.15]
                -translate-x-1 md:-translate-x-2 lg:-translate-x-3">
            <Image src={image}
                   fill className='object-cover'
                   alt={`Cabin ${name}`}
                   quality={quality}/>
        </div>
    );
}
function CabinName({name}){
    return (
        <h3 className="text-accent-100 font-black  bg-primary-950
                    text-center sm:text-left
                    text-xl sm:text-3xl md:text-5xl lg:text-7xl
                    mb-2 md:mb-3 lg:mb-5
                    translate-x-[0] md:translate-x-[-154px] lg:translate-x-[-254px]
                    p-6
                    pb-1
                    w-[100%] sm:w-[150%]">
            Cabin {name}
        </h3>
    );
}
function CabinDescription({description}){
    return (
        <p className="text-primary-300
                    text-sm sm:text-md md:text-lg
                    mb-10">
            <TextExpander>
                {description}
            </TextExpander>
        </p>
    );
}
function CabinFeatures({maxCapacity}){
    return (
        <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
                <UsersIcon className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                    guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
                <MapPinIcon className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                Located in the heart of the{" "}
                    <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
                <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
        </ul>
    );
}
function CabinInfoWrapper({children}){
    return (
        <div className='max-w-full relative z-10
                order-first md:order-last
                col-span-2 md:col-span-1'>
            {children}
        </div>
    );
}
function CabinSlogan(){
    return (
        <h2 className="text-2xl sm:text-5xl font-semibold text-center text-accent-400">
            Reserve today. Pay on arrival.
        </h2>
    );
}
function CabinTopContainer({children}){
    return (
        <div className="grid border border-primary-800
            grid-cols-[auto_auto] sm:grid-cols-[1.5fr_2fr] md:grid-cols-[2fr_3fr] lg:grid-cols-[3fr_4fr]
            sm:gap-2 md:gap-5 lg:gap-20
            py-2 lg:py-3
            px-1 sm:px-3 md:px-6 lg:px-10
            mb-5 sm:mb-10 md:mb-14 lg:mb-18">
            {children}
        </div>
    );
}
function CabinContainer({children}){
    return (
        <div className="max-w-6xl mx-auto mt-2 sm:mt-5 md:mt-8">
            {children}
        </div>
    );
}
