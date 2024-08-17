'use client';
import useSetSearchURL from "@/app/_hooks/useSetSearchURL.js";

const filters = [
    {label: 'All cabins', value: 'all'},
    {label: `1-3 guests`, value: 'small'},
    {label: '4-7 guests', value: 'medium'},
    {label: '8-12 guests', value: 'large'}
]
export default function Filter(){
    const {setParams, activeFilter} = useSetSearchURL('capacity', 'all');

    return (
        <div className='flex justify-end mb-5'>
            {filters.map(filter => (
                <Button key={filter.value}
                        label={filter.label}
                        value={filter.value}
                        activeBtn={activeFilter}
                        onClickHandler={setParams}/>

            ))}
        </div>
    );
}
function Button({label, value, activeBtn, onClickHandler}){
    return (
        <button className={`${activeBtn === value ? 'bg-primary-800' : ''} 
                hover:bg-primary-700 border-t border-b border-l border-primary-800
                text-xs sm:text-sm md:text-base
                px-2 sm:px-5
                py-1 sm:py-2`}
                onClick={()=> onClickHandler('capacity', value)}>
            {label}
        </button>
    );
}