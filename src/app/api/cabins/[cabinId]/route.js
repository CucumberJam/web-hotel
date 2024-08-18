import {getBookedDatesByCabinId, getCabin} from "@/app/_lib/data-service.js";

export async function GET(request, {params}){
    const {cabinId} = params
    try{
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId),
            getBookedDatesByCabinId(cabinId)
        ]);
        return Response.json({cabin, bookedDates})
    }catch (e) {
        console.log(e);
        return Response.json({message: 'Cabin not found'});
    }

}