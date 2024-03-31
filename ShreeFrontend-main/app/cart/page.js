import Client_cart from "./client_cart"

export const metadata = {
	title: "Cart"
}

export default function Page() {

	return (
		<div className=' min-h-96 p-10 w-full bg-primary text-black'>
			<Client_cart />
		</div>
	)
}