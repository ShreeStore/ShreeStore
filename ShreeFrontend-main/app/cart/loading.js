export default function Loading() {
    return(
        <div className=" p-20 min-h-96 text-3xl bg-primary text-primaryText animate-pulse ">
            Loading &nbsp;
            <div className=" inline-block animate-bounce" >.</div>
            <div className=" inline-block animate-bounce" >.</div>
            <div className=" inline-block animate-bounce" >.</div>
        </div>
    );
  }