// import {cross} from "@heroicons/react"
import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import down from "@/public/down.svg"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Sidebar({ logo, cat_data, toggle, change_toggle }) {

    const [toggle_cat, setToggle_cat] = useState(Array.from({ length: cat_data.length }, (v, i) => false));

    // Handling toggling in sidebar catgeories sub categories
    const handleToggleSub = (idx) => {
        let temp = [...toggle_cat]
        temp[idx] = !temp[idx]
        setToggle_cat(temp)
    }

    return (
        <>
            <div onClick={() => { change_toggle(!toggle) }} className={` ${toggle ? "" : "hidden"} lg:hidden fixed opacity-30 h-screen w-screen `} />
            <div id="sidebar" className={` ${toggle ? "w-56" : "w-0"} z-50 transition-all fixed top-0 text-secondaryText text-2xl bg-secondary h-screen lg:w-56 overflow-y-scroll`}>
                {/* Logo */}
                <Link className="hidden lg:block" href="/">
                    {
                        logo ?
                            <Image
                                className=" mx-auto my-4"
                                src={logo}
                                width={150}
                                height={150}
                                alt="COMPANY LOGO"
                            />
                            :
                            <div className="flex justify-center items-center my-10">
                                <Skeleton enableAnimation={true} width={150} height={150} duration={0.7} />
                            </div>
                    }
                </Link>

                {/* Categories list */}
                <div className=" mt-3 mx-2 flex flex-col h-1/2 ">
                    {
                        cat_data.length === 0 &&
                        <div className="flex flex-col gap-2">
                            <Skeleton height={32} enableAnimation={true} borderRadius={5} duration={0.7} />
                            <Skeleton height={32} enableAnimation={true} borderRadius={5} duration={0.7} />
                            <Skeleton height={32} enableAnimation={true} borderRadius={5} duration={0.7} />
                            <Skeleton height={32} enableAnimation={true} borderRadius={5} duration={0.7} />
                            <Skeleton height={32} enableAnimation={true} borderRadius={5} duration={0.7} />
                        </div>
                    }
                    {
                        cat_data.map((e, idx) => (
                            <div key={idx} className=" transition-all text-[18px] font-normal px-1 py-2 ">
                                <div onClick={() => { handleToggleSub(idx) }} className=" cursor-pointer flex w-full justify-between">

                                    {/* check if it has sub categories */}
                                    {
                                        e.SubCats.length === 0 ?
                                            <>
                                                <Link href={`/Category/${e.name}`} className=" font-normal hover:font-medium">
                                                    {e.name}
                                                </Link>
                                            </>
                                            :
                                            <>
                                                <span className="transition-all  ">
                                                    {e.name}
                                                </span>
                                                <Image height={20} width={20} src={down} className={` transition-all duration-700 cursor-pointer ${toggle_cat[idx] ? 'rotate-180 ' : ''} `} alt="down svg" />
                                            </>
                                    }
                                </div>
                                <div className={`flex flex-col overflow-hidden transition-all duration-700 ${toggle_cat[idx] ? ' max-h-96 ' : ' max-h-0 '} `} >
                                    {e.SubCats.map((x, idx) => (
                                        <Link href={`/Category/${e.name}#${x.name}`} key={idx} className=" ml-5 hover:font-normal font-light">
                                            {x.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}