import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function Navbar() {
  return (
    <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md'>
        <div className="logo mx-5">
          <Link href={"/"}>
           <Image src="/home-image.png" alt="shop-logo" width={70} height={5}/>
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
        <div className="cart absolute right-0 top-6 mx-5">
            <AiOutlineShoppingCart className='text-xl md:text-2xl'/>
        </div>
    </div>
  )
}

export default Navbar;