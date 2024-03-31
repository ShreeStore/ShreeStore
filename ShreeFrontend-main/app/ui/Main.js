"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { get_banner } from '@/app/lib/data_retrieval'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Main() {

    const [banner, setBanner] = useState();

    useEffect(() => {

        const fetch_data = async () => {
            const data = await get_banner();
            setBanner(data[0].image);
        }
        if (banner === undefined)
            fetch_data();
    })

    const val = 440;
    return (
        <>
            <div className=" font-bold text-2xl bg-primary h-[25vw] min-h-80  w-full overflow-hidden">
                {
                    banner ?
                        <Image
                            className=" h-full w-full object-cover object-center"
                            src={banner}
                            height={2 * val}
                            width={3 * val}
                            alt='img1'
                        />
                        :
                        <div className='flex justify-center items-center my-4'>
                            <Skeleton duration={0.7} enableAnimation={true} height={2 * val - 12} width={3 * val - 72} />
                        </div>
                }

            </div>
        </>
    );
}