// Accordion.js
"use client";
import Image from "next/image";
import down from '@/public/down.svg';
import Loading from '@/app/faq/loading'

import { faq_data } from '../lib/data_retrieval';
import { useEffect, useState } from 'react';

const Accordion = ({  }) => {

  const [sections, setsections] = useState();

  useEffect(()=>{
    const fetch_data = async ()=>{
      const data = await faq_data();
      setsections(data);
    }

    if(!sections){
      fetch_data();
    }
  })

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex==-index ? -1:  index);
  };

  return (
    <div className=" w-full flex flex-col gap-6">
      {sections ?

        sections.length!==0 ?
          sections.map((section, idx) => (
            <div key={idx} className="">
              <div className={`bg-secondary text-secondaryText px-5 py-4 ${activeIndex === idx ? 'rounded-t-md' : 'rounded-md'} flex justify-between`} onClick={() => handleToggle(idx)}>
                {section.question}
                  <Image height={25} width={25} src={down}  className={` transition-all duration-700 cursor-pointer ${activeIndex===idx ? ' ' : 'rotate-180'} `}  alt="down svg" />
              </div>
              <div className={` ${activeIndex === idx ? ' max-h-72 overflow-y-auto py-6 ' : ' max-h-0 overflow-hidden py-0 '} text-secondaryText transition-all px-6  bg-tertiary rounded-b-md`}>
                {section.answer}
              </div>
            </div>
          ))
        :
        <div className="text-4xl text-center w-full"> NO FAQs </div>
        :
        <>
          <Loading/>
        </>
      }
    </div>
  );
};

export default Accordion;
