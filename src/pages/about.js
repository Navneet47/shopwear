import React, { useState } from 'react';
import styles from '../styles/About.module.css';
import Head from 'next/head';
import Link from 'next/link';


function About() {
  return(<>
  <Head>

  </Head>
  <header>
     <h1 className=' text-4xl my-10 text-center m-auto font-semibold'>Welcome to Shopnation.in</h1>
      <div id='container' className='flex gap-3 justify-center items-center text-center text-xl'>
         <p>Buy</p>
         <p className='text-orange-600'>T-Shirts, Hoodies, Mugs, Sneakers</p>
      </div>
  </header>
  <main>
    <section id='intro'>
      <div className='m-auto flex flex-col justify-center items-center text-center text-lg max-w-[80%] my-2'>
        <p className='mb-6'>Introducing ShopNation, a revolutionary e-commerce platform that delivers amazing products at unbeatable prices. Built on a foundation of NextJs and MongoDB, our website offers a seamless shopping experience powered by server-side rendering. Whether you&apos;re a tech enthusiast or simply looking for a stylish geek T-shirt, ShopNation has something for everyone. Shop now and experience the future of online shopping.</p>
        <Link href={'/tshirts'}>
          <button className='text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md'>
            Start Shopping
          </button>
        </Link>
      </div>
    </section>
    <section id='About' className='my-10'>
    <div className='flex flex-col gap-4 max-w-[80%] justify-center items-center m-auto mt-4'>
                        <p className='text-3xl font-semibold'>About Shopnation</p>
                        <ul className=' justify-start items-start list-none text-lg'>
                            <li className='mb-4'>Shopnation.in is revolutionizing the way India shops for unique, geeky apparel. From our one-of-a-kind hoodie designs to our wide selection of stickers, mugs and other accessories, we have everything you need to express your individuality and stand out from the crowd. Say goodbye to the hassle of hopping from store to store in search of your perfect geeky look. With just a single click on our website, you can find it all!</li>
                            <li className='mt-4'>But what sets Shopnation apart from the competition? The answer is simple: our unique designs and commitment to providing the highest quality products. We understand the importance of style and durability, which is why we put so much effort into creating unique designs and using only the best materials. Don&apos;t settle for mediocre clothing and accessories - choose Shopnation and make a statement with your wardrobe.</li>
                            <li className='mt-4'>At Shopnation, we strive to be more than just an online store - we want to be a community where like-minded individuals can come together and express themselves through fashion. Whether you&apos;re a gamer, a programmer, or simply someone who loves all things geeky, we have something for you. Our collection is curated with the latest trends and fan favorites in mind, ensuring that you&apos;ll always find something new and exciting.</li>
                            <li className='mt-4'>We also understand the importance of affordability and convenience. That&apos;s why we offer competitive prices and fast shipping, so you can get your hands on your new geeky apparel as soon as possible. Plus, with our easy-to-use website and secure checkout process, shopping with us is a breeze.</li>
                            <li className='mt-4'>So why wait? Visit shopnation.in today and discover the latest in geeky fashion. With our unique designs and high-quality products, we&apos;re sure you&apos;ll find something you&apos;ll love. Join our community and express your individuality through fashion.</li>
                        </ul>
                    </div>
    </section>
  </main>
  </>)
}

export default About;