import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Orders() {

  const router = useRouter();

  const [orders, setOrders] = useState([]);

    useEffect(() => {
      const fetchOrders = async ()=>{
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myOrders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token })
        })
        let res = await a.json()
        setOrders(res.orders);
      }
      if (!localStorage.getItem('myuser')) {
        router.push('/');
      } else {
        fetchOrders()
    }
    },[])
  
  return (
    <>
      <div>
        <h1 className='font-bold text-xl p-8 text-center'>My Orders</h1>
      </div>
      <div className='container min-h-screen border-solid border-4 mx-auto'>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item)=>{ 
              return <tr key={item._id} className="bg-white border-b light:bg-gray-800 light:border-gray-700">
                <td className="px-6 py-4">
                  {item.orderId}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                  {item.email}
                </th>
                <td className="px-6 py-4">
                  <Link href={'/order?id=' + item._id}>Details</Link>
                </td>
                <td className="px-6 py-4">
                ₹{item.amount}
                </td>
              </tr>
              })
              }
            </tbody>
          </table>
        </div>

      </div>
    </>

  )
}

export default Orders;


