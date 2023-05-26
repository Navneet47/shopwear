import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';

function Checkout({cart, clearCart, addToCart, removeFromCart, oid, subTotal, email }) {
  const [userDetails, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [user, setUser] = useState();

  useEffect(()=>{

    const user = JSON.parse(localStorage.getItem('myuser'));
   if(user.token){
    setUser(user)
     setDetails({...userDetails, email:user.email})
   }
  }, [])

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDetails({ ...userDetails, [name]: value });

    if (name == 'pincode') {
      setPincode(value);
      if (value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(value)) {
          setState(pinJson[value][1])
          setCity(pinJson[value][0])
        } else {
          setState('')
          setCity('')
        }

      }
    } else {
      setState('')
      setCity('')
    }
  }

  async function initiatePayment() {
    let oid = Math.floor(Math.random() * Date.now());
    const products = { cart, subTotal, oid, email: userDetails.email, name: userDetails.name, address: userDetails.address, pincode: userDetails.pincode, phone: userDetails.phone };
    localStorage.setItem("orderId", oid);
    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ products }),
    }).then((t) => t.json());

    if (data.success) {
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        name: "ShopNation Pvt Ltd",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank You For Ordering",
        // callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/verify`,
        handler: async function (response) {
          alert("Payment Successfull");
          const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verify`, {
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(response),
          }).then((t) => t.json());

          data["oid"] = oid;

          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, {
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((t)=>t.json())
          Router.push(`/order?clearCart=1&id=${res.id}`)
        },
      };
      const paymentObject = new Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
      });
    } else {
      clearCart();
      toast.error(data.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  //  async function initiatePayment() {
  //     let oid = Math.floor(Math.random() * Date.now())
  //     //Get a transaction token
  //     const data = { cart, subTotal, oid, email: userDetails.email, name: userDetails.name, address: userDetails.address, pincode: userDetails.pincode, phone: userDetails.phone};
  //     let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
  //       method: 'POST',
  //       headers:{
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     })
  //     let txnRes = await a.json()
  //      console.log(txnRes);
  //      let txnToken = txnRes.txnToken;


  //     let config = {
  //       "root": "",
  //       "style": {
  //         "bodyColor": "",
  //         "themeBackgroundColor": "",
  //         "themeColor": "",
  //         "headerBackgroundColor": "",
  //         "headerColor": "",
  //         "errorColor": "",
  //         "successColor": ""
  //       },
  //       "flow": "DEFAULT",
  //       "data": {
  //         "orderId": oid,
  //         "token": txnToken,
  //         "tokenType": "TXN_TOKEN",
  //         "amount": subTotal,
  //         "userDetail": {
  //           "mobileNumber": "",
  //           "name": ""
  //         }
  //       },
  //       "merchant": {
  //         "mid": "",
  //         "name": "",
  //         "redirect": true
  //       },
  //       "labels": {},
  //       "payMode": {
  //         "labels": {},
  //         "filter": [],
  //         "order": []
  //       },
  //       "handler": {
  //         "notifyMerchant": function (eventName, data) {
  //           console.log("notifyMerchant handler function called");
  //           console.log("eventName =>", eventName);
  //           console.log("data => ", data);
  //         }
  //       }
  //     };

  //         window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
  //           window.Paytm.CheckoutJS.invoke();
  //         }).catch(function (error) {
  //           console.log("error => ", error);
  //         })
  //   }

  return (
    <div className='container px-2 sm:m-auto'>
      <ToastContainer
        position="top-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {/* <Script type='application/javascript' crossOrigin='anonymous' src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}/> */}
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} value={userDetails.name} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
           {user && user.value ? <input readOnly type="email" id="email" name="email" value={user.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />:
            <input type="email" id="email" name="email" onChange={handleChange} value={userDetails.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea rows={2} cols={30} type="text" id="address" name="address" onChange={handleChange} value={userDetails.address} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input placeholder='Your 10 Digit Phone Number' type="tel" id="phone" name="phone" onChange={handleChange} value={userDetails.phone} pattern="[0-9]{10}" maxLength={10} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pincode" name="pincode" onChange={handleChange} value={pincode} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
            <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>

      <div className="sideCart bg-orange-100 m-2 p-6">
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className=' font-semibold flex justify-center item-center w-1/3 text-lg'><AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-orange-500 cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-orange-500 cursor-pointer' /></div>
              </div>
            </li>
          })
          }
        </ol>
        <span className='total font-bold'>Subtotal: ₹{subTotal}</span>

      </div>

      <div className="mx-4">
        <Link href={'/checkout'}>
          <button disabled={(userDetails.name.length > 3 && userDetails.email.length > 3 && userDetails.address.length > 3 && userDetails.phone.length > 3 && pincode.length > 3) ? false : true} onClick={initiatePayment} className=" disabled:bg-orange-200   flex mr-2 text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md"><BsFillBagCheckFill className='m-1 mt-1' />Pay</button>
        </Link>
      </div>

    </div>
  )
}

export default Checkout