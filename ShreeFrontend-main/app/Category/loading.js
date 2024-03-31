import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <div className="flex items-center justify-center flex-col p-8">
            {/* <h1 className=" w-4/5 text-center text-5xl ">{cat.name}</h1> */}
            <div className="flex flex-col justify-center items-center gap-3">
                <Skeleton duration={0.7} enableAnimation={true} width={240} height={48} />
                <Skeleton duration={0.7} enableAnimation={true} width={440} height={24} />
            </div>

            <div className=" mt-4 mb-3 container-subCategory w-full flex items-center justify-center flex-col">
                <div className=" w-4/5 mb-12">
                    <Skeleton duration={0.7} enableAnimation={true} width={240} height={48} />
                </div>
                <div className=" w-4/5 flex flex-wrap gap-6 justify-center">
                    <Skeleton duration={0.7} enableAnimation={true} height={420} width={288} />
                    <Skeleton duration={0.7} enableAnimation={true} height={420} width={288} />
                    <Skeleton duration={0.7} enableAnimation={true} height={420} width={288} />
                </div>
            </div>
            <div className=" mt-4 mb-16 container-subCategory w-full flex items-center justify-center flex-col">
                <div className=" w-4/5 mb-12">
                    <Skeleton duration={0.7} enableAnimation={true} width={240} height={48} />
                </div>
                <div className=" w-4/5 flex flex-wrap gap-6 justify-center">
                    <Skeleton duration={0.7} enableAnimation={true} height={420} width={288} />
                    <Skeleton duration={0.7} enableAnimation={true} height={420} width={288} />
                    <Skeleton duration={0.7} enableAnimation={true} height={420} width={288} />
                </div>
            </div>
        </div>
    );
}