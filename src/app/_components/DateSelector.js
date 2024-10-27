'use client';
import {differenceInDays, isPast, isSameDay, isWithinInterval} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useWindowDimensions from "@/app/_hooks/useWindowDimensions.js";
import {useReservation} from "@/app/_context/ReservationContext.js";
import {isAlreadyBooked} from "@/app/_lib/validateHelper.js";


function DateSelector({regularPrice, discount,
                        minBookingLength, maxBookingLength,
                        bookedDates}) {
    const {range, setRange, resetRange} = useReservation();
    const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
    const { width } = useWindowDimensions();
    const numNights = differenceInDays(displayRange?.to, displayRange?.from);
    const cabinPrice = numNights * (regularPrice - discount) ;
    return (
    <div className="flex flex-col justify-between
    col-span-2 md:col-span-1">
      <DayPicker
        className="pt-4 sm:pt-8 md:pt-12 place-self-center"
        mode="range"
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 1}
        captionLayout="dropdown"
        numberOfMonths={width < 630 ? 1: 2}
        disabled={(curDate)=> isPast(curDate) ||
            bookedDates.some((date) => isSameDay(date, curDate))
        }
        onSelect={(selectedRange) => selectedRange && setRange(selectedRange)}/>
        <div>
            {range.from || range.to ? (
                <ButtonClearDates reset={resetRange}/>
            ) : null}

            <TotalLabel from={range.from} to={range.to}
                        className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
                <div className="flex items-baseline gap-6">
                    <PriceForNightLabel discount={discount}
                                        regularPrice={regularPrice}/>
                    {numNights ? (
                        <>
                            <TotalNights numNights={numNights}/>
                            <TotalPrice cabinPrice={cabinPrice}/>
                        </>
                    ) : null}
                </div>
            </TotalLabel>
        </div>
    </div>
  );
}

export default DateSelector;

function PriceForNightLabel({discount, regularPrice}){
    return (
        <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
                <>
                    <span className="text-base sm:text-lg md:text-2xl">
                        ${regularPrice - discount}
                    </span>
                    <span className="line-through font-semibold text-primary-700
                    text-base sm:text-lg md:text-2xl">
                  ${regularPrice}
                </span>
                </>
            ) : (
                <span className="text-base sm:text-lg md:text-2xl">
                    ${regularPrice}
                </span>
            )}
            <span className="">/night</span>
        </p>
    );
}
function TotalNights({numNights}){
    return (
            <p className="bg-accent-600
            px-1 sm:px-2 md:px-3
            py-1 sm:py-2
            text-base sm:text-lg md:text-2xl">
                <span>&times;</span>
                <span>{numNights}</span>
            </p>
    );
}
function TotalPrice({cabinPrice}){
    return (
        <p>
            <span className="text-xs sm:text-base md:text-lg
                    font-bold uppercase">
                Total</span>
            {" "}
            <span className="text-base sm:text-xl md:text-2xl
                    font-semibold">
                ${cabinPrice}
            </span>
        </p>
    );
}
function TotalLabel({children, from, to}){
    return (
        <div className={`flex items-center bg-accent-500 text-primary-800
            ${from || to ? 'md:justify-between' : 'justify-center'}
            px-8
            h-14 md:h-[72px]`}>
            {children}
        </div>
    );
}
function ButtonClearDates({reset}){
    return (
        <button
            className="border border-primary-800  w-full
                    py-2 px-4 text-sm
                    mb-10
                    font-semibold hover:bg-primary-700"
            onClick={reset}>
            Clear
        </button>
    );
}