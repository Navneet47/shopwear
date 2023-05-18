import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { MdShoppingCartCheckout, MdAccountCircle, MdShoppingCart } from 'react-icons/md';

function Navbar({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) {
  const cartRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const toggleCart = () => {
    if (cartRef.current.classList.contains('translate-x-full')) {
      cartRef.current.classList.remove("translate-x-full");
      cartRef.current.classList.add("translate-x-0");
    } else if (!cartRef.current.classList.contains('translate-x-full')) {
      cartRef.current.classList.remove("translate-x-0");
      cartRef.current.classList.add("translate-x-full");
    }
  }

  return (
    <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md border-b-2 sticky top-0 bg-white z-10'>
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          {/* <Image src="/home-image.png" alt="shop-logo" width={70} height={5} /> */}
          <p className='text-orange-600 text-xl ml-3 mt-3 mb-3'>SHOPNATION</p>
        </Link>
      </div>
      <div className="navbar">
        <ul className='flex items-center space-x-4 font-bold md:text-md'>
          <Link href={"/tshirts"}><li className='hover:text-orange-600'>T-shirts</li></Link>
          <Link href={"/hoodies"}><li className='hover:text-orange-600'>Hoodies</li></Link>
          <Link href={"/mugs"}><li className='hover:text-orange-600'>Mugs</li></Link>
          <Link href={"/stickers"}><li className='hover:text-orange-600'>Stickers</li></Link>
        </ul>
      </div>
      <div className=" sideCart items-center absolute right-0 top-6 mx-5 flex">
        <button onMouseOver={() => { setDropDown(true) }} onMouseLeave={() => { setDropDown(false) }}>
          {dropDown && <div onMouseOver={() => { setDropDown(true) }} onMouseLeave={() => { setDropDown(false) }} className="absolute right-8 bg-white shadow-lg top-5 py-4 border rounded-md px-5 w-32">
            <ul>
              <Link href={'/myaccount'}>
                <li className='py-1 cursor-pointer hover:text-orange-600 text-sm font-bold'>My Account</li>
              </Link>
              <Link href={'/orders'}>
                <li className='py-1 cursor-pointer hover:text-orange-600 text-sm font-bold'>Orders</li>
              </Link>
              <li onClick={() => {
                logout()
              }} className='py-1 cursor-pointer hover:text-orange-600 text-sm font-bold'>Logout</li>
            </ul>
          </div>}
          {user.value && <MdAccountCircle className='text-xl cursor-pointer md:text-2xl mx-2 hover:text-orange-600' />}
        </button>
        {!user.value && <Link href={"/login"}>
          <button
            className="rounded-lg bg-orange-500 cursor-pointer py-1 px-2 font-sans mx-2 text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Login
          </button>
        </Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className='cursor-pointer text-xl md:text-2xl hover:text-orange-600' />
      </div>


      <div ref={cartRef} className={`w-72 sideCart overflow-y-scroll absolute top-0 right-0 bg-orange-100 py-10 px-8 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-2 right-2 text-orange-500 cursor-pointer text-2xl"><AiOutlineCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='my-6 text-center font-semibold'>Your cart is empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className=' font-semibold flex justify-center item-center w-1/3 text-lg'><AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-orange-500 cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-orange-500 cursor-pointer' /></div>
              </div>
            </li>
          })
          }
        </ol>
        <div className='total font-bold my-2'>Subtotal: ₹{subTotal}</div>
        <div className='flex'>
          <Link href={"/checkout"}>
            <button className="flex mr-2 text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md"><MdShoppingCartCheckout className='m-1 mt-1' />Checkout</button>
          </Link>
          <button onClick={clearCart} className="flex mr-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-md">Clear <MdShoppingCart className='ml-1 mt-1' /></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;