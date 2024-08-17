import CabinCard from "@/app/_components/CabinCard.js";
import {getCabins} from "@/app/_lib/data-service.js";
//import {unstable_noStore as noStore} from 'next/cache'
export default async function CabinList({filter}){
    //noStore();
    const cabins = await getCabins();

    if(!cabins.length) return null;

    const displayedCabins = cabins.filter(el => {
        switch (filter) {
            case 'small':
                return el?.maxCapacity <= 3;
            case 'medium':
                return el?.maxCapacity >= 4 && el?.maxCapacity <= 7;
            case 'large':
                return el?.maxCapacity >= 8;
            case 'all':
            default:
                return true;
        }
    });

    return (
        <div className="grid
        sm:grid-cols-1 md:grid-cols-2
        gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}