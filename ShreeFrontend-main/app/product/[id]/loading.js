import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <>
            <div className=' h-fit w-full overflow-hidden '>

                <div className="flex flex-col md:flex-row justify-between pt-12 ">
                    <div className="mx-auto">
                        <Skeleton enableAnimation={true} duration={0.7} height={480} width={350} />
                    </div>

                    {/* product */}
                    <div className=" max-w-lg lg:w-fit md:w-1/3 min-w-72 mr-8 ml-[12vw] md:ml-2 my-2 ">
                        {/* title */}
                        <div className=" mt-3">
                            <Skeleton enableAnimation={true} duration={0.7} height={32} width={240} />
                        </div>
                        {/* price */}
                        <div className="flex mt-5 items-center gap-5">
                            <Skeleton enableAnimation={true} duration={0.7} height={28} width={60} />
                            <Skeleton enableAnimation={true} duration={0.7} height={32} width={240} />
                        </div>
                        {/* form (quantity) */}
                        <div className="mt-10 mb-4 flex gap-8">
                            <Skeleton enableAnimation={true} duration={0.7} height={28} width={100} />
                            <Skeleton enableAnimation={true} duration={0.7} height={42} width={160} />
                        </div>
                        {/* button */}
                        <div className="">
                            <Skeleton enableAnimation={true} duration={0.7} height={48} />
                        </div>
                        {/* description */}
                        <div className="my-8">
                            <Skeleton enableAnimation={true} duration={0.7} />
                            <Skeleton enableAnimation={true} duration={0.7} />
                            <Skeleton enableAnimation={true} duration={0.7} />
                            <Skeleton enableAnimation={true} duration={0.7} />
                            <Skeleton enableAnimation={true} duration={0.7} width={160} />
                        </div>
                    </div>
                </div>

                {/* <div className=" mt-10 mb-5 w-4/5 border-black opacity-25 border-t-2 mx-auto" /> */}

                <div className=" w-full h-fit mt-12 mx-20 bg-[var(--primary)] text-xl ">
                    {/* <div className="text-black ml-[10vw]  ">You may also need ~</div> */}
                    <Skeleton enableAnimation={true} duration={0.7} width={280} height={32} />
                    <div className="mt-4 mb-16  flex gap-4 flex-wrap">
                        <Skeleton enableAnimation={true} duration={0.7} width={280} height={448} />
                        <Skeleton enableAnimation={true} duration={0.7} width={280} height={448} />
                        <Skeleton enableAnimation={true} duration={0.7} width={280} height={448} />
                        <Skeleton enableAnimation={true} duration={0.7} width={280} height={448} />
                    </div>
                </div>
            </div>
        </>
    );
}