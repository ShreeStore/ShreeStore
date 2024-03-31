"use client"
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function Carousel({ images }) {
    //image of aspect ratio 3:2

    const [page, Setpage] = useState(0);
    const window_w = 2;
    const window_h = 3;
    const scale = 160;

    return (
        <div className="flex items-center mx-auto">
            {/* Left Click */}
            <div
                onClick={() => {
                    if (page > 0) {

                        // console.log('left');
                        Setpage(page - 1);
                    }
                }}
                className=" z-10 transition-all -mx-5  sm:mx-3 rounded-full bg-secondary hover:bg-opacity-80 text-slate-900 cursor-pointer w-10 h-10" >
                <ArrowLeftCircleIcon />
            </div>

            {/* Carousel with img pointer  */}
            <div className="flex flex-col items-center gap-4">

                <div style={{ width: window_w * scale }} className="overflow-hidden">
                    <div style={{ translate: `${-page * (window_w * scale)}px` }} className=" transition-all duration-500 flex w-fit select-none">
                        {
                            images ? images.map((ele, idx) => (
                                <div 
                                    style={{ height: window_h * scale, width: window_w * scale }} 
                                    key={idx} 
                                    className={` relative flex items-center object-contain `}
                                >
                                    <Image src={ele} height={480} width={320} alt="a product image" />
                                </div>
                            )) : "Product Images Not Available "
                        }
                    </div>
                </div>

                <div className=" flex gap-2">
                    {
                        Array.apply(null, Array(images ? images.length : 0)).map((ele, idx) => (
                            <div key={idx} className={` transition-all rounded-full h-2 w-2 ${idx == page ? 'opacity-90' : 'opacity-60'} bg-secondary `}></div>
                        ))
                    }
                </div>
            </div>

            {/* Right Click  */}
            <div
                onClick={() => {
                    if (images && page < images.length - 1) {
                        // console.log('right');
                        Setpage(page + 1);
                    }
                }}
                className=" z-10 -mx-5 sm:mx-3 transition-all rounded-full text-sm bg-secondary hover:bg-opacity-80 text-slate-900 cursor-pointer w-10 h-10"
            >
                <ArrowRightCircleIcon />
            </div>


        </div>
    )
}
