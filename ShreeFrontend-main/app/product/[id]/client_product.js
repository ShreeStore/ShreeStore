"use client"

import Carousel from "@/app/ui/Carousel"
import CardWrapper from "@/app/ui/Card"
import Product_cart_form from "@/app/ui/Product_cart_form";
import { product_data, products_data } from "@/app/lib/data_retrieval"
import { useEffect, useState } from "react";

import Loading from "@/app/product/[id]/loading"

export default function Client_product({ params }) {
    
    const [product, setProduct] = useState(null);
    const [related_products, setRelatedProducts] = useState();

    useEffect(() => {
        if (!product) {
            product_data(params.id).then((data) => { setProduct(...data) });
        }
        else if (product) {
            products_data(10, 0, product.SubCategory.name).then((data) => { setRelatedProducts(data) });
        }
    }, [params.id, product])

    return (
        <>
            {product && related_products ?
                <div className=' h-fit w-full bg-primary text-primaryText'>

                    <div className="flex flex-col md:flex-row justify-between pt-12 ">

                        <Carousel Enlarge_for_phones={true} images={product ? product.images : []} />

                        {/* product */}
                        <div className=" max-w-lg lg:w-fit md:w-1/3 min-w-72 mr-8 ml-[12vw] md:ml-2 my-2 ">
                            {/* title */}
                            <div className=" mt-3 text-3xl sm:text-4xl font-semibold">
                                {product ? product.name : "Product Name"}
                            </div>
                            {/* price */}
                            <div className="flex items-center gap-5">
                                <div className="text-md">Price:</div>
                                <div className=" text-xl sm:text-2xl my-5">
                                    ₹
                                    <span className={`${product ? product.isDiscount ? " line-through " : " " : " "} mx-1`}>
                                        {Number(product ? product.price : 0).toFixed(2)}
                                    </span>
                                    <span className={`${product ? product.isDiscount ? " " : " hidden" : " "} mx-1`}>
                                        {Number(product ? product.discountedPrice : 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className=" border border-primaryText opacity-25 mt-4 mb-7" />
                            {/* add to cart */}
                            <Product_cart_form product_id={product._id} />

                            <div className=" hidden md:block border border-primaryText opacity-25 my-5" />

                            <div>
                                {product ? product.desc : "Product description"}
                            </div>

                        </div>
                    </div>

                    <div className=" mt-10 mb-5 w-4/5 border-primaryText opacity-25 border-t-2 mx-auto" />

                    <div className=" w-full h-fit mt-5 bg-primary text-xl ">
                        <div className="text-primaryText ml-[10vw]  ">You may also need ~</div>
                        <div className="mx-10">
                            <CardWrapper products={related_products} />
                        </div>
                    </div>
                </div>
                :
                <>
                    {
                        typeof (product) === 'undefined' ?
                            <h1 className="my-24 text-3xl flex justify-center min-h-96">
                                NO SUCH PRODUCT
                            </h1>
                            :
                            <Loading />
                    }
                </>
            }
        </>
    )
}