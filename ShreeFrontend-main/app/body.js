"use client"

import { useState, useEffect } from 'react'
import Navbar from './ui/navbar'
import Footer from './ui/Footer'
import { get_categories, get_logo } from './lib/data_retrieval'

import { Karla } from 'next/font/google'

const karla = Karla({
    subsets: ['latin'],
    display: 'swap'
  })  

export default function Body({children}) {

    const [cat, setCat] = useState([]);
    const [logo, setLogo] = useState();
    // console.log(children)

    useEffect(() => {
        const fetch_data = async () => {
            const data_logo = await get_logo();
            const data_categories = await get_categories();
            setLogo(data_logo[0].image);
            setCat(data_categories);
        }
        if (cat.length === 0 && logo === undefined) {
            fetch_data();
        }
    })

    return (
        <body className={karla.className} >
            <div className='bg-primary'>

                <Navbar logo={logo} cat_data={cat} />

                <div className=' pt-32 sm:pt-14 lg:pl-56 bg-primary  sm:mt-0 min-h-96'>
                    {children}
                </div>

                <Footer logo={logo} cat_data={cat} />

            </div>
        </body>
    )
}