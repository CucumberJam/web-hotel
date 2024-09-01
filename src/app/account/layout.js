import SideNavigation from "@/app/_components/SideNavigation.js";

export default function Layout({children}){
    return (
        <div className='grid
                        grid-cols-[4rem_1fr]
                        md:grid-cols-[11rem_1fr]
                        lg:grid-cols-[16rem_1fr]
                        h-full gap-12'>
            <SideNavigation/>
            <div className='py-1'>{children}</div>
        </div>
    );
}