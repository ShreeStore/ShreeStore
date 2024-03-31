"use client"

import { useEffect, useState } from "react";

// import Link from "next/link";

export default function Product_cart_form({ product_id }) {

    const [submit_message, setsubmit_message] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (submit_message) {
            setTimeout(function () {
                setsubmit_message(false);
            }, 5000);
        }
    }, [submit_message]);

    const handleCart = (e) => {
        e.preventDefault();

        let cart = JSON.parse(window.localStorage.getItem('shreebackend_cart'));
        const data = {
            "product_id": product_id,
            "quantity": quantity
        }
        if (cart === null) {
            window.localStorage.setItem('shreebackend_cart', JSON.stringify([data]));
        }
        else {
            let exist = false;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i]["product_id"] == product_id) {
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
        <>
            <form action=" " onSubmit={(e) => { handleCart(e) }} className=''>
                <div className='flex flex-col items-center lg:gap-6 gap-0    '>
                    <div className='flex flex-wrap items-center justify-evenly w-full '>
                        <div className=' text-xl' >Quantity: </div>
                        {/* Quantity */}
                        <div className="flex gap-3 items-center">
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
                    </div>
                    <button
                        className=' w-full my-10 lg:m-0  rounded-md text-xl font-bold text-white bg-black text-center py-3 px-3 sm:py-4 sm:px-5 cursor-pointer mx-5 '
                        type="submit"
                    >
                        ADD TO CART
                    </button>
                </div>
            </form>
            {
                submit_message &&
                (<div className=" animate-bounce text-2xl fixed px-16 py-5 rounded-s-3xl bg-secondary text-secondaryText bottom-10 right-0  z-20 ">
                    Product Added to Cart
                </div>)
            }
        </>
    );
}
