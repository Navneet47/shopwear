import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { MdShoppingCartCheckout, MdAccountCircle } from 'react-icons/md';

function Navbar({ cart, addToCart, removeFromCart, clearCart, subTotal }) {
  const cartRef = useRef();
  const toggleCart = () => {
    if (cartRef.current.classList.contains('translate-x-full')) {
      cartRef.current.classList.remove("translate-x-full");
      cartRef.current.classList.remove("hidden");
      cartRef.current.classList.add("translate-x-0");
    } else if (!cartRef.current.classList.contains('translate-x-full')) {
      cartRef.current.classList.remove("translate-x-0");
      cartRef.current.classList.add("translate-x-full");
      cartRef.current.classList.add("hidden");
    }
  }
  return (
    <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md border-b-2 sticky top-0 bg-white z-10'>
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image src="/home-image.png" alt="shop-logo" width={70} height={5} />
        </Link>
      </div>
      <div className="navbar">
        <ul className='flex items-center space-x-4 font-bold md:text-md'>
          <Link href={"/tshirts"}><li>T-shirts</li></Link>
          <Link href={"/hoodies"}><li>Hoodies</li></Link>
          <Link href={"/mugs"}><li>Mugs</li></Link>
          <Link href={"/stickers"}><li>Stickers</li></Link>
        </ul>
      </div>
      <div className="sideCart absolute right-0 top-6 mx-5 flex">
       <Link href={"/login"}>
        <MdAccountCircle className='text-xl md:text-2xl mx-2 cursor-pointer' />
       </Link>
        <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-2xl cursor-pointer' />
      </div>

      <div ref={cartRef} className={`w-72 sideCart absolute top-0 right-0 bg-orange-100 py-10 px-8 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-2 right-2 text-orange-500 cursor-pointer text-2xl"><AiOutlineCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='my-6 text-center font-semibold'>Your cart is empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3'>{cart[k].name}</div>
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
          <button onClick={clearCart} className="flex mr-2 text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md">Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;