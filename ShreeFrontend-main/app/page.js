"use client"

import Main from './ui/Main'
import CardWrapper from './ui/Card'
import { useState, useEffect } from 'react';
import { products_data } from '@/app/lib/data_retrieval'

export default function Home() {

  const [products, setProducts] = useState([]);

  // For Load More
  const [count, setCount] = useState(8);
  const [offset, setOffSet] = useState(0);

  useEffect(() => {
    if (products.length === 0 || products.length!==offset+count) {
      if(offset===0){
        products_data(count, 0, '').then((data) => { setCount(data.length); setProducts(data) })
      }
      else {
        products_data(count, offset, '').then((data) => { setCount(data.length); setProducts([...products, ...data]); })
      }
    }
  }, [offset, count, products]);

  return (
    <>
      <Main />
      <div className=' h-fit w-full bg-primary'>
        <h1 className=' text-center px-5 pt-10 text-4xl font-semibold' >Products</h1>
        <CardWrapper products={products} />
        {
          count === 8 &&
          <div className="flex justify-center items-center mb-10">
            <button id="button" onClick={() => setOffSet(offset + count)} className="bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-1 w-48 self-center">Load More</button>
          </div>
        }
      </div>
    </>
  )
}
