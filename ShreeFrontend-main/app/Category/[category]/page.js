"use client"
import { get_subCategories } from "@/app/lib/data_retrieval.js"
import CardWrapper from "@/app/ui/Card.js";
import { useState, useEffect } from "react";
import Loading from '@/app/Category/loading'

export default function Page({ params }) {

    const [Cat_data, setCat_Data] = useState([]);

    useEffect(() => {
        if(Cat_data.length === 0) {
            get_subCategories(params.category).then((data)=> { setCat_Data(data) })
        }
    })
    return (
        <>
            { 
                Cat_data.length!==0 ?
                Cat_data.map((cat, idx) =>
                    <div className=" bg-primary text-primaryText flex items-center justify-center flex-col p-8" key={idx}>
                        <h1 className=" w-4/5 text-center text-5xl ">{cat.name}</h1>
                        <p className=" text-center py-2 w-4/5 ">{cat.desc}</p>
                        {
                            cat.SubCats.map((sub, idx) => 
                                <div className=" my-4 container-subCategory w-full flex items-center justify-center flex-col" key={idx}>
                                    <h2 className="subcategory-name w-4/5 text-3xl border-b-2 border-b-primaryText/20 pb-2">{sub.name}</h2>
                                    {
                                        sub.Products.length === 0 ?
                                        <>
                                            <h1 className="my-5">
                                                No Product Available in this Sub Category
                                            </h1>
                                        </> 
                                        : 
                                        <>
                                            <CardWrapper products={sub.Products} />
                                        </>
                                    }
                                </div>
                            )
                        }
                    </div>
                )
                :
                <>
                   <Loading/>
                </>
            }
        </>
    )
  }