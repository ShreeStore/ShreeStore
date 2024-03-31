'use client'

import { useEffect, useState } from "react";
import { getProductbyId } from '@/app/lib/data_retrieval'
import Link from "next/link";

export default function Client_cart (){
    const [products, setProducts] = useState(0);
	const [total, setTotal] = useState(0);
	const PhoneNo = process.env.PHONE;
	const [whatsappLink, setWhatsappLink] = useState('');

	useEffect(() => {
		// console.log('HI')
		if (products === 0) {

			let temp_products = []

			const cart_products = JSON.parse(window.localStorage.getItem('shreebackend_cart'));

			if (cart_products !== null && cart_products.length > 0) {
				// If products are present in cart then fetch the products info
				async function fp() {
					let sum = 0;
					for (let i = 0; i < cart_products.length; i++) {
						await getProductbyId(cart_products[i].product_id).then((p) => {
							temp_products.push({ ...p[0], quantity: cart_products[i].quantity });
							sum += temp_products[i].price * temp_products[i].quantity
						})
					}
					setTotal(sum);
					setProducts(temp_products);
				}
				fp()
			} else {
				// If no product is present in Cart
				setProducts(1);
			}

		} else if (products !== 1 && whatsappLink.length===0) {
			// If products are present in cart then set the link as below
			let text = "Hello%2C%20I%20am%20interested%20in%20availability%20of%20the%20products%20with%20the%20following%20details%3A-";
			products.map((product) => { 
				let name = product.name;	
				name = name.replace(/&/g,"+");
				text += "%0AProduct%20Name%3A%20" + name + "%2C%20Product%20Price%3A%20" + product.price + "%20Rs%3B"
			});
			text+="%0AThank+you+in+advance+for+your+assistance."
			text = text.replace(/ /g,"");
			console.log('message: ',text);
			setWhatsappLink(`https://wa.me/${PhoneNo}?text=${text}&app_absent=0`)
			// console.log(whatsappLink)
		}
	}, [products, whatsappLink, PhoneNo])

	const handle_qnt_change = (idx, sign) => {
		let cart = JSON.parse(window.localStorage.getItem('shreebackend_cart'));
		let p = [...products];

		if (sign === '-') {
			if (p[idx].quantity > 1) {
				p[idx].quantity -= 1;
				cart[idx].quantity -= 1;
			}
		} else {
			p[idx].quantity += 1;
			cart[idx].quantity += 1;
		}

		let sum = 0;
		for (let i = 0; i < p.length; i++) {
			sum += (p[i].price * p[i].quantity);
		}

		setProducts(p);
		setTotal(sum);
		window.localStorage.setItem('shreebackend_cart', JSON.stringify(cart));
	}

	const handleRemove = (idx) => {
		let p = [];
		let p_cart = []
		for (let i = 0; i < products.length; i++) {
			if (i !== idx) {
				p.push(products[i]);
				p_cart.push({ "product_id": products[i]._id, "quantity": products[i].quantity })
			}
		}
		window.localStorage.setItem('shreebackend_cart', JSON.stringify(p_cart))
		if (p.length === 0)
			setProducts(1);
		else
			setProducts(p);
	}

    return(
        <>
            {products == 0 && (
				<div className=' text-center text-4xl py-16 '>
					Loading <div className=" inline-block animate-bounce" >...</div>
				</div>
			)}
			{products == 1 && (
				<div className='text-center text-2xl py-16 '>
					CART EMPTY
				</div>
			)}
			{typeof (products) === 'object' && products.length && (
				<div className="bg-gray-100">
					<div className="container mx-auto mt-10">
						<div className="flex shadow-md my-10 flex-col md:flex-row">
							<div className="md:w-3/4 bg-white p-5 sm:p-10 w-auto">
								<div className="flex justify-between border-b pb-8">
									<h1 className="font-semibold text-2xl">Shopping Cart</h1>
									<h2 className="font-semibold text-2xl">{products.length} Items</h2>
								</div>
								<div className="flex mt-10 mb-5 justify-between">
									<h3 className="font-semibold text-gray-600 text-xs uppercase sm:w-2/5">Product Details</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase sm:w-1/5 ">Quantity</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase sm:w-1/5 ">Price</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase sm:w-1/5 ">Total</h3>
								</div>
								{products.map((product, idx) => (
									<div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={idx}>
										<div className="flex w-2/5">
											{/* <!-- product --> */}
											<div className="flex flex-col justify-evenly ml-4 flex-grow">
												<span className="font-bold text-sm mb-3">{product.name}</span>
												<div className=" w-fit cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => handleRemove(idx)}>Remove</div>
											</div>
										</div>
										<div className="flex sm:justify-center w-1/5 flex-col-reverse sm:flex-row items-center gap-1">
											<svg className="fill-current cursor-pointer text-gray-600 w-3" viewBox="0 0 448 512" onClick={() => handle_qnt_change(idx, '-')}>
												<path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
											</svg>
											<div className="mx-2 text-center w-8 select-none">{product.quantity}</div>
											<svg className="fill-current cursor-pointer text-gray-600 w-3" viewBox="0 0 448 512" onClick={() => handle_qnt_change(idx, '+')}>
												<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
											</svg>
										</div>
										<span className="text-center w-1/5 font-semibold text-sm">₹ {product.price}</span>
										<span className="text-center w-1/5 font-semibold text-sm">₹ {product.quantity * product.price}</span>
									</div>

								))}


								<Link href="/" className="flex font-semibold text-secondary hover:opacity-90 text-sm mt-10">
									<svg className="fill-current mr-2 text-secondary w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
									Continue Shopping
								</Link>
							</div>

							<div id="summary" className="md:w-1/4 px-8 py-10 w-auto">
								<h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
								<div className="flex justify-between mt-10 mb-5">
									<span className="font-semibold text-sm uppercase">Items {products.length}</span>
									<span className="font-semibold text-sm">₹ {total}</span>
								</div>

								<div className="border-t mt-8 flex flex-col gap-3">
									<div className="flex font-semibold justify-between py-6 text-sm uppercase">
										<span>Total cost</span>
										<span>₹ {total}</span>
									</div>
									{whatsappLink && <div
										onClick={() => {
											console.log("Hi")
											window.localStorage.clear()
											window.open(whatsappLink, '_blank');
											location.reload();
										}}
										className="bg-secondary cursor-pointer font-semibold hover:bg-secondary/90 transition-all duration-300 py-3 text-lg text-secondaryText uppercase w-full px-5 text-center">
										Checkout
									</div>}
								</div>
							</div>

						</div>
					</div>
				</div>
			)}
        </>
    )
}
