import Image from "next/image";
import about1 from '../../../public/about-1.jpg'
import about2 from '../../../public/about-2.jpg'
import Link from "next/link.js";
export const metadata = {
    title: 'About'
}
export default function Page(){
    return (
        <div className="grid items-center
                grid-cols-5
                gap-x-8 md:gap-x-12 lg:gap-x-24
                gap-y-4 lg:gap-y-5">
            <div className="col-span-5 lg:col-span-3">
                <h1 className="text-accent-400 font-medium
                            text-xl sm:text-2xl md:text-4xl
                            mb-3 sm:mb-5 md:mb-10">
                    Welcome to The Wild Oasis
                </h1>

                <div className="space-y-2 sm:space-y-4 md:space-y-8">
                    <p className='text-sm sm:text-base md:text-lg'>
                        Where nature beauty and comfortable living blend seamlessly.
                        Hidden away in the heart of the Italian Dolomites, this is your
                        paradise away from home. But it is not just about the luxury cabins.
                        It is about the experience of reconnecting with nature and enjoying
                        simple pleasures with family.
                    </p>
                    <p className='text-sm sm:text-base md:text-lg'>
                        Our 8 luxury cabins provide a cozy base, but the real freedom and
                        peace you will find in the surrounding mountains. Wander through lush
                        forests, breathe in the fresh air, and watch the stars twinkle above
                        from the warmth of a campfire or your hot tub.
                    </p>
                    <p className='text-sm sm:text-base md:text-lg'>
                        This is where memorable moments are made, surrounded by nature
                        splendor. It is a place to slow down, relax, and feel the joy of
                        being together in a beautiful setting.
                    </p>
                </div>
            </div>

            <div className="relative aspect-square
                    col-span-5 lg:col-span-2">
                <Image src={about1}
                       placeholder='blur'
                       quality={90}
                       alt="Family sitting around a fire pit in front of cabin"/>
            </div>

            <div className="relative aspect-square
                    col-span-5 lg:col-span-2
                    order-4 lg:order-3">
                <Image src={about2}
                       fill className='object-cover'
                       placeholder='blur'
                       quality={90}
                       alt="Family that manages The Wild Oasis" />
            </div>

            <div className="col-span-5 lg:col-span-3
                    order-3 lg:order-4">
                <h1 className="text-accent-400 font-medium
                            text-xl sm:text-2xl md:text-4xl
                            mb-3 sm:mb-5 md:mb-10">
                    Managed by our family since 1962
                </h1>

                <div className="space-y-2 sm:space-y-4 md:space-y-8">
                    <p className='text-sm sm:text-base md:text-lg'>
                        Since 1962, The Wild Oasis has been a cherished family-run retreat.
                        Started by our grandparents, this haven has been nurtured with love
                        and care, passing down through our family as a testament to our
                        dedication to creating a warm, welcoming environment.
                    </p>
                    <p className='text-sm sm:text-base md:text-lg'>
                        Over the years, we have maintained the essence of The Wild Oasis,
                        blending the timeless beauty of the mountains with the personal
                        touch only a family business can offer. Here, you are not just a
                        guest; you are part of our extended family. So join us at The Wild
                        Oasis soon, where tradition meets tranquility, and every visit is
                        like coming home.
                    </p>

                    <div className='flex justify-end lg:justify-start'>
                        <Link
                            href="/cabins"
                            className="inline-block bg-accent-500 text-primary-800 font-semibold hover:bg-accent-600 transition-all
                            mt-2 lg:mt-4
                            px-5 lg:px-8
                            py-3 lg:py-5
                            text-base lg:text-lg">
                            Explore our luxury cabins
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}