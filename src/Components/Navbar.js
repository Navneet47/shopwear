import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { BsTrashFill } from 'react-icons/bs';
import axios from 'axios';

function Navbar({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, sideBarCheck }) {
    const [menu, setMenu] = useState(false);
    const [expired, setExp] = useState(true);
    const profileRef = useRef();
    const [mobileMenu, setMobileMenu] = useState(false);
    const MobileRef = useRef();
    const [openCart, setCart] = useState(true);
    const cartRef = useRef();
    const router = useRouter();

    async function get() {

        const user = JSON.parse(localStorage.getItem('myuser'));

        if (user && user.token) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/verifyTokenAuthentication`, { token: user.token }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (res.data.msg == 'jwt expired') {
                setExp(false);
                localStorage.removeItem('myuser');
            } else {
                setExp(true);
            }
        }
    }

    useEffect(() => {
        get();
    }, [router.pathname])

    const handleMenu = () => {
        setMenu(!menu);
    }

    const handleMobileMenu = () => {
        setMobileMenu(!mobileMenu)
    }

    const handleCartClick = () => {
        setCart(!openCart);
        if (openCart) {
            cartRef.current.classList.remove("hidden");
            sideBarCheck();
        } else {
            cartRef.current.classList.add("hidden");
            sideBarCheck();
        }
    }

    return (
        <>
            <nav className="bg-gray-800 z-30 sticky top-0">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button onClick={handleMobileMenu} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                {/* <!--
                                Icon when menu is closed.

                                Menu open: "hidden", Menu closed: "block"
          --> */}
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {/* <!--
                                Icon when menu is open.

                                Menu open: "block", Menu closed: "hidden"
          --> */}
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href={"/"}>
                                    <p className="block h-6 w-auto text-white lg:hidden">SHOPNATION</p>
                                </Link>
                                <Link href={"/"}>
                                    <p className="hidden h-6 text-white w-auto lg:block">SHOPNATION</p>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                    <Link href={"/tshirts"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">T-shirts</Link>
                                    <Link href={"/hoodies"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Hoodies</Link>
                                    <Link href={"/mugs"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Mugs</Link>
                                    <Link href={"/sneakers"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Sneakers</Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button onClick={handleCartClick} className="flex items-center rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {Object.keys(cart).length > 0 && <span className="flex absolute -mt-5 ml-4">
                                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500">
                                    </span>
                                </span>}
                            </button>

                            {/* <!-- Profile dropdown --> */}
                            <div className="relative ml-3">
                                <div>
                                    {user.value && expired ? <button disabled={!expired} onClick={handleMenu} type="button" className="flex rounded-full disabled:bg-orange-300 bg-orange-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="sr-only">Open user menu</span>
                                        <MdAccountCircle className='h-8 w-8 rounded-full' />
                                    </button> : <Link href={"/login"}>
                                        <button
                                            className="rounded-full bg-orange-500 cursor-pointer py-2 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            data-ripple-light="true"
                                        >
                                            Login
                                        </button>
                                    </Link>}
                                </div>

                                {/* <!--
                                    Dropdown menu, show/hide based on menu state.

                                    Entering: "transition ease-out duration-100"
                                    From: "transform opacity-0 scale-95"
                                    To: "transform opacity-100 scale-100"
                                    Leaving: "transition ease-in duration-75"
                                    From: "transform opacity-100 scale-100"
                                    To: "transform opacity-0 scale-95"
          --> */}
                                <div ref={profileRef} className={`absolute ${menu ? "" : "hidden"} right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1"`}>
                                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                    {!expired && <Link href={"/login"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabIndex="-1" id="user-menu-item-0">Login</Link>}
                                    <Link href={"/myaccount"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabIndex="-1" id="user-menu-item-0">My Account</Link>
                                    <Link href={"/orders"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabIndex="-1" id="user-menu-item-1">My Orders</Link>
                                    <p onClick={() => { logout() }} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-slate-200" role="menuitem" tabIndex="-1" id="user-menu-item-2">Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                <div ref={MobileRef} className={`sm:hidden ${mobileMenu ? "" : 'hidden'}`} id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <Link href={"/tshirts"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">T-shirts</Link>
                        <Link href={"/hoodies"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Hoodies</Link>
                        <Link href={"/mugs"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Mugs</Link>
                        <Link href={"/sneakers"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Sneakers</Link>
                    </div>
                </div>
                <div ref={cartRef} className="relative z-10 hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    {/* <!--
    Background backdrop, show/hide based on slide-over state.
    
    Entering: "ease-in-out duration-500"
    From: "opacity-0"
    To: "opacity-100"
    Leaving: "ease-in-out duration-500"
    From: "opacity-100"
    To: "opacity-0"
--> */}
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                {/* <!--
          Slide-over panel, show/hide based on slide-over state.
          
          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
        --> */}

                                {/* Cart  */}
                                <div className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button onClick={handleCartClick} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">Close panel</span>
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {Object.keys(cart).length === 0 && <div className='my-6 text-center font-semibold'>Your cart is empty!</div>}

                                                        {Object.keys(cart).map((item,index) => {
                                                            return <li key={index} className="flex py-6">
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                {cart[item].name}
                                                                            </h3>
                                                                            <p className="ml-4">₹{cart[item].salePrice ? cart[item].salePrice : cart[item].price}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">Color: {cart[item].variant}</p>
                                                                        <p className="mt-1 text-sm text-gray-500">Size: {cart[item].size}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                                                        <div className="flex items-center border-gray-100">
                                                                            <p className='text-gray-500 mr-2'>Qty</p>
                                                                            {cart[item].qty > 1 ? <span onClick={() => { removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 hover:bg-orange-500 hover:text-orange-50"> - </span> : <span onClick={() => { removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className="cursor-pointer rounded-l bg-gray-100 py-1.5 px-3.5 duration-100 hover:bg-orange-500 hover:text-orange-50"> {<BsTrashFill/>} </span>}
                                                                            <p className="py-1 px-3.5 border bg-white text-center text-xs outline-none">{cart[item].qty}</p>
                                                                            <span onClick={() => { addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant, cart[item].salePrice) }} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-orange-500 hover:text-orange-50"> + </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        })}
                                                        {/* <!-- More products... --> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>₹{subTotal}</p>
                                            </div>
                                            <div className="mt-6">
                                                <div className='flex flex-row items-center justify-between'>
                                                    <Link href={"/checkout"}>
                                                        <button disabled={Object.keys(cart).length === 0} className=" disabled:bg-orange-300 rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700">Checkout</button>
                                                    </Link>
                                                    <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className=" disabled:bg-orange-300 rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700">Clear Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

        </>
    )
}


export default Navbar;