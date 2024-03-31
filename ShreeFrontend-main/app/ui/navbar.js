"use client"
import { useEffect, useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useDebouncedCallback } from "use-debounce";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Navbar({ logo, cat_data }) {

    const [Sidebar_Toggle, setSidebar_Toogle] = useState(false); //true -> open , false -> closed 
    const [search_data, setsearch_data] = useState(0);
    const [cart_items, setCart_items] = useState(0);

    const handleSearch = useDebouncedCallback(async (search_word) => {
        if (search_word.length === 0) {
            setsearch_data(0);
        }
        else {
            setsearch_data('loading');
            setTimeout(async () => {
                const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
                // console.log(search_word);
                const response = await fetch(`${URI}/data/query/production?query=*%5B_type+%3D%3D+%22Product%22+%26%26+%28name+match+%22*${search_word}*%22+%7C%7C+desc+match+%22*${search_word}*%22%29%5D%5B0...10%5D+&perspective=published`);
                const data = await response.json();
                // console.log(data.result);

                setsearch_data(data.result);
            }, 2000);
        }
    }, 300);


    const check_cart = () => {
        const cart = JSON.parse(window.localStorage.getItem('shreebackend_cart'));
        if (cart !== null) {
            setCart_items(cart.length);
            // setSeconds(seconds => seconds + 1);
        }
    }


    useEffect(() => {
        check_cart();
        const interval = setInterval(() => {
            check_cart();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Sidebar logo={logo} cat_data={cat_data} toggle={Sidebar_Toggle} change_toggle={setSidebar_Toogle} />

            <div className=" z-40 fixed top-0 font-bold text-secondaryText text-2xl bg-secondary min-h-14 h-fit w-full flex items-center justify-around">

                <div onClick={() => { setSidebar_Toogle(!Sidebar_Toggle) }} className="px-3 cursor-pointer flex items-center">
                    <Bars3Icon className="text-secondaryText h-8 w-10" />
                    <Link className="lg:hidden mx-3" href="/">
                        {
                            logo ?

                                <Image
                                    src={logo}
                                    width={50}
                                    height={50}
                                    alt="COMPANY LOGO"
                                />
                                :
                                <>
                                    <div className="my-1">
                                        <Skeleton enableAnimation={true} width={50} height={50} duration={0.7} />
                                    </div>
                                </>
                        }
                    </Link>
                </div>
                <div className="lg:mr-40" />

                {/* SEARCH */}
                <div className=" group fixed top-14 sm:relative sm:top-0 bg-secondary w-full sm:w-2/5 lg:mr-56">
                    <label className=" absolute z-10 left-[8vw] top-[18px] sm:left-4 "> <MagnifyingGlassIcon className=" h-5 w-5 text-tertiary " /> </label>
                    <input
                        type="text"
                        placeholder="Search Your Products"
                        className=" placeholder-primaryText/80 peer relative left-1/2 -translate-x-1/2 w-[90vw] sm:w-full rounded-md my-3 h-8 outline-none pl-12 sm:pl-12 py-4 bg-primary font-light text-primaryText text-base "
                        onChange={(e) => { handleSearch(e.target.value); }}
                    />
                    <div 
                        id="search-dropdown" 
                        className={`  ${typeof (search_data) !== 'number' && 'overflow-auto'} absolute w-[90vw] sm:w-full top-12 max-h-0 hover:max-h-72 peer-focus:max-h-72  px-3 left-1/2 -translate-x-1/2 border-transparent bg-primary/80 text-primaryText transition-all  font-light text-lg  rounded-b-md backdrop-blur-md `}
                    >
                        {
                            typeof (search_data) === 'string' ?
                                <div className=" animate-pulse text-3xl  pb-4 text-center w-full"> . . . </div>
                                :
                                typeof (search_data) === 'object' &&
                                (
                                    search_data.length === 0 ?
                                        <div className="py-3">
                                            No products related to given text
                                        </div>
                                        :
                                        search_data.map((product, idx) => (
                                            <div key={idx}>
                                                {idx !== 0 && <div className="w-full border-t border-primaryText/20" />}
                                                {/* PRODUCT NAME, price, is discounted, discounted price maybe */}
                                                <Link href={'/product/' + product._id} key={idx} className=" transition-all py-3 flex justify-between cursor-pointer hover:opacity-90 ">
                                                    <span>{product.name}</span>
                                                    <span> $ {product.price}</span>
                                                </Link>
                                            </div>
                                        ))
                                )
                        }
                    </div>
                </div>

                {/* GSTIN */}
                <span className="flex items-center text-sm bg-tertiary p-2 sm: mr-2">
                    GSTIN: 07AEXPN8429H1ZQ
                </span>

                {/* cart */}
                <div className="flex items-center">
                    <div className=" transition-all font-light text-base hover:opacity-90">
                        <Link href='/cart'>
                            Cart&nbsp;({cart_items})
                        </Link>
                    </div>
                </div>

            </div>
        </>
    );
}
