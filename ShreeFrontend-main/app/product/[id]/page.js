import Client_product from "./client_product"

export const metadata= {
    title: 'product',
    description: 'product of the hardware store'
}

export default function Page({ params }) {

    return (
        <>
           <Client_product params={params} />
        </>
    )
}

