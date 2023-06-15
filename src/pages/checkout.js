import React, { useEffect, useState } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';

function Checkout({ cart, clearCart, addToCart, removeFromCart, subTotal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [user, setUser] = useState({ value: null });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {

    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email);
      fetchUserData(myuser.token);
    }
  }, []);

  useEffect(() => {

    if (name.length > 3 && email.length > 3 && address.length > 3 && phone.length > 3 && pincode.length > 3) {
        setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, phone, address, pincode])

  const fetchUserData = async (token) => {
    let data = { token: token }
    let req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await req.json()
    setName(res.name);
    setAddress(res.address);
    setPhone(res.phone);
    setPincode(res.pincode);
    getPincode(res.pincode)
  }

  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1])
      setCity(pinJson[pin][0])
    } else {
      setState('')
      setCity('')
    }
  }

  // handling billing details

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name == 'name') {
      setName(value);
    } else if (name == 'email') {
      setEmail(value)
    } else if (name == 'address') {
      setEmail(value)
    } else if (name == 'phone') {
      setEmail(value)
    }
    else if (name == 'pincode') {
      setPincode(value);
      if (value.length == 6) {
        getPincode(value);
      }
    }
  }

  //handling payment
  async function initiatePayment() {
    let oid = Math.floor(Math.random() * Date.now());
    const products = { cart, subTotal, oid, email, name, city, state, address, pincode, phone };
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
          }).then((t) => t.json())
          Router.push(`/order?clearCart=1&id=${res.id}`)
        },
      };
      const paymentObject = new Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert(response.error.description);
      });
    } else {
      if (data.cartClear) {
        clearCart();
      }
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

  return (
    <>
    <div className='container px-2 sm:m-auto min-h-screen pb-10'>
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
        <title>Checkout - Shopnation.in</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        />
      {/* <Script type='application/javascript' crossOrigin='anonymous' src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}/> */}
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <main>
        <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" name="name" onChange={handleChange} value={name} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              {user && user.token ? <input readOnly type="email" id="email" name="email" value={user.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> :
                <input type="email" id="email" name="email" onChange={handleChange} value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea rows={2} cols={30} type="text" id="address" name="address" onChange={handleChange} value={address} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input placeholder='Your 10 Digit Phone Number' type="tel" id="phone" name="phone" onChange={handleChange} value={phone} pattern="[0-9]{10}" maxLength={10} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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

        <div className="sideCart shadow-xl border m-2 mt-6 p-6 mb-6">
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is empty!</div>}
            {Object.keys(cart).map((item) => {
              return <li key={item._id} className="flex py-6">
              <div className="ml-4 flex flex-1 flex-col">
                  <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                              {cart[item].name}
                          </h3>
                          <p className="ml-4">₹{cart[item].price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Color: {cart[item].variant}</p>
                      <p className="mt-1 text-sm text-gray-500">Size: {cart[item].size}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm mt-2">
                      <div className="flex items-center border-gray-100">
                          <p className='text-gray-500 mr-2'>Qty</p>
                          <span onClick={() => { removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-orange-500 hover:text-orange-50"> - </span>
                          <p className="py-1 px-3.5 border bg-white text-center text-xs outline-none">{cart[item].qty}</p>
                          <span onClick={() => { addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-orange-500 hover:text-orange-50"> + </span>
                      </div>
                  </div>
              </div>
          </li>
            })
            }
          </ol>
          <span className='total font-bold'>Subtotal: ₹{subTotal}</span>

        </div>

        <div className="mx-4">
          <Link href={'/checkout'}>
            <button disabled={disabled} onClick={initiatePayment} className=" disabled:bg-orange-200   flex mr-2 text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md"><BsFillBagCheckFill className='m-1 mt-1' />Pay</button>
          </Link>
        </div>
    </main >
    </div>
</>
  )
}

export default Checkout;