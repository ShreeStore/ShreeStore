import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return(
        <>
            {/* <Skeleton duration={0.7} enableAnimation={true} height={42} width={500} /> */}
            <div className='my-5'>
                <Skeleton duration={0.7} enableAnimation={true} height={48} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} width={250} />
            </div>
            <div className='my-5'>
                <Skeleton duration={0.7} enableAnimation={true} height={48} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} />
                <Skeleton duration={0.7} enableAnimation={true} height={20} width={650} />
            </div>
        </>
    );
  }