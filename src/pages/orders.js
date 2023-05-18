import React, { useEffect } from 'react';
import Order from '../../models/Order';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';

function Orders() {
  
  const router = useRouter();
 
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      router.push('/');
    }
  })
  return (
    <>
      <div>
        <h1 className='font-bold text-xl p-8 text-center'>My Orders</h1>
      </div>
      <div className='container border-solid border-4 mx-auto'>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                  Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">
                  Silver
                </td>
                <td className="px-6 py-4">
                  Laptop
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
              </tr>
              <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white light:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                  Black
                </td>
                <td className="px-6 py-4">
                  Accessories
                </td>
                <td className="px-6 py-4">
                  $99
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>

  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find({})
  let colorSizeSlug = {};

  return {
    props: { orders: orders }, // will be passed to the page component as props
  };
}

export default Orders;


