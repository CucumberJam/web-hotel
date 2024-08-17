import {usePathname, useRouter, useSearchParams} from "next/navigation.js";
export default function useSetSearchURL(initialFilterName, initialFilterValue){
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    let activeFilter =  searchParams.get(initialFilterName) ?? initialFilterValue;
    const setParams = (name, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        router.replace(`${pathName}?${params.toString()}`, {scroll: false});
    }
    return {setParams, activeFilter};
}