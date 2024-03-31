"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardWrapper({ products }) {
    return (
        <>
            {
                products.length === 0?
                    <>
                        <div className="w-full flex flex-wrap justify-center gap-5 py-12">
                            <Skeleton height={488} width={288} enableAnimation={true} duration={0.7}/>
                            <Skeleton height={488} width={288} enableAnimation={true} duration={0.7}/>
                            <Skeleton height={488} width={288} enableAnimation={true} duration={0.7}/>
                            <Skeleton height={488} width={288} enableAnimation={true} duration={0.7}/>
                            
                        </div>
                    </>
                    :
                    <>
                        <div className="w-full flex flex-wrap justify-center gap-5 py-12 ">
                            {
                                products ? products.map((ele, idx) => (
                                    <div className='mb-4'  key={idx}>
                                        <Card product={ele} />
                                    </div>
                                )) : "No Product Found"
                            }
                        </div>
                    </>
            }
        </>
    );
}

function Card({ product }) {

    const [toggleQuickview, SetToggleQuickview] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [submit_message, setsubmit_message] = useState(false);

    useEffect(() => {
        if (submit_message) {
            setTimeout(function () {
                setsubmit_message(false);
            }, 5000);
        }
    }, [submit_message]);

    const handleCart = () => {
        // e.preventDefault();

        let cart = JSON.parse(window.localStorage.getItem('shreebackend_cart'));
        const data = {
            "product_id": product._id,
            "quantity": quantity
        }
        if (cart === null) {
            window.localStorage.setItem('shreebackend_cart', JSON.stringify([data]));
        }
        else {
            let exist = false;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i]["product_id"] == product._id) {
                    cart[i]["quantity"] += 1;
                    exist = true;
                }
            }
            if (exist) {
                window.localStorage.setItem('shreebackend_cart', JSON.stringify(cart));
            }
            else {
                window.localStorage.setItem('shreebackend_cart', JSON.stringify([...cart, data]));
            }
        }

        setsubmit_message(true);
    }

    return (
        <div>
            <div className="group w-72 bg-white shadow-md rounded-xl duration-700 hover:scale-105 hover:shadow-lg">
                <div className=' '>
                    <Link href={`/product/${product._id}`} className=' '>
                        <Image src={product.images[0]} alt="Product" height={320} width={288} className=" h-80 object-cover rounded-t-xl" />
                    </Link>
                </div>
                <div onClick={() => { SetToggleQuickview(true) }} className=' h-0 sm:h-fit overflow-hidden absolute left-24 bottom-36 transition-all w-fit sm:p-2 rounded-sm bg-black text-white opacity-0 group-hover:opacity-100 cursor-pointer '>
                    QUICK VIEW
                </div>
                <div className="px-4 py-3 w-72">
                    <span className="text-gray-500 mr-3 uppercase text-xs border-l-transparent border-l-0 group-hover:border-l-8 transition-all duration-500 ">{product.SubCategory.name}</span>
                    <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                    {product.isDiscount ?
                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">₹{product.discountedPrice}</p>
                            <del>
                                <p className="text-sm text-gray-600 cursor-auto ml-2">₹{product.price}</p>  
                            </del>
                        </div>
                        :
                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">₹{product.price}</p>
                        </div>
                    }
                </div>
            </div>

            {/* Quick View  */}
            <div className={`${toggleQuickview ? " visible " : " hidden "} `}>
                <div onClick={() => { SetToggleQuickview(false) }} className=' z-10 fixed h-screen w-screen bg-black top-14 -left-4 opacity-50 ' />
                <div className=' z-10 flex fixed h-2/3 w-1/2 bg-white top-[20%] left-[30%]'>
                    <Image
                        className='m-8'
                        height={512}
                        width={288}
                        src={product.images[0]}
                        alt='product image'
                    />
                    <div className=' my-8 px-4 '>
                        <div className='font-semibold text-3xl'>{product.name}</div>
                        <div className=' font-normal text-2xl my-3'>
                            ₹
                            <span className={`${product.isDiscount ? " line-through " : " "} mx-1`}>
                                {Number(product.price).toFixed(2)}
                            </span>
                            <span className={`${product.isDiscount ? " " : " hidden"} mx-1`}>
                                {Number(product.discountedPrice).toFixed(2)}
                            </span>
                        </div>
                        <div className='border mb-4' />

                        <div className='flex flex-col flex-wrap items-center justify-evenly w-full '>
                            <div className=' text-xl' >Quantity </div>
                            {/* Quantity */}
                            <div className="flex gap-3 items-center my-2 ">
                                {/* SUB */}
                                <div className=" select-none p-2 cursor-pointer" onClick={() => { quantity > 1 && setQuantity(quantity - 1) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <div className=" px-4 py-2 text-xl">
                                    {quantity}
                                </div>
                                {/* ADD */}
                                <div className=" select-none p-2 cursor-pointer" onClick={() => { setQuantity(quantity + 1) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className=' mt-6 w-full rounded-sm h-16 text-xl font-bold text-white bg-black py-4 text-center px-5 cursor-pointer mx-10 ' onClick={() => handleCart()}>
                                ADD TO CART
                            </div>
                        </div>
                        <div className='border my-12' />
                        <Link href={`/product/${product._id}`} className=' transition-all text-primaryText hover:opacity-85 '>
                            See Full Details
                        </Link>
                    </div>
                </div>
            </div>
            {
                submit_message &&
                (<div className=" animate-bounce text-2xl fixed px-16 py-5 rounded-s-3xl bg-secondary text-secondaryText bottom-10 right-0  z-20 ">
                    Product Added to Cart
                </div>)
            }
        </div>
    );
}