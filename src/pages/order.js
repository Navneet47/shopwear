import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose';
import Order from '../../models/Order';
import { useRouter } from 'next/router';

function MyOrder({order, clearCart}) {
  const products = order.products;
  const router = useRouter();
  const [date, setDate] = useState();
  useEffect(()=>{
    const d = new Date(order.createdAt);
    setDate(d)
    if(router.query.clearCart == 1){
      clearCart();
    }
  }, [])

  return <section className="text-gray-600 body-font overflow-hidden min-h-screen">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">SHOPNATION.COM</h2>
          <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
          <div className="flex mb-4">
          <a className="flex-grow text-center text-orange-500 py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow text-center text-orange-500 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow text-center text-orange-500 py-2 text-lg px-1">Item Total</a>
        </div>
          <p className="leading-relaxed mb-4">Yayy! Your order has been successfully placed.</p>
          <p className="leading-relaxed mb-4">Order placed on: {date && date.toLocaleString("en-IN",{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
          {Object.keys(products).map((item)=>{
            
          return <div key={item} className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">{products[item].name}</span>
            <span className="m-auto text-gray-900">{products[item].qty}</span>
            <span className="m-auto text-gray-900">₹{products[item].price} X {products[item].qty} = ₹{products[item].price * products[item].qty}</span>
          </div>
          })
          }
          <div className="flex flex-col">
            <span className="title-font my-8 font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</span>
            <div className='my-6'>
            <button className="flex mx-0 text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Track Order</button>
            </div>
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
      </div>
    </div>
  </section>

}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id)

  return {
    props: { order: JSON.parse(JSON.stringify(order))}// will be passed to the page component as props
  };
}

export default MyOrder;