import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import Product from '../../../models/Product';
import mongoose from "mongoose";
import Error from 'next/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Head from 'next/head';


function Slug({ buyNow, addToCart, product, variants, error }) {
  const colors = ['red', 'blue', 'black', 'green', 'yellow', 'white', 'purple', 'brown', 'multi', 'pink','orange','gray'];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "STANDARD", "MEDIUM", "LARGE", "6", "7", "8", "9", "10", "11"];
  const [images, setImages] = useState(product.img);
  const [activeImg, setActiveImage] = useState(images[0])
  const [btn, setBtn] = useState('');
  const router = useRouter();
  const { slug } = router.query;
  const [pinToDeliver, setPin] = useState(0);
  const [delivery, setDelivery] = useState({
    pin: "",
    service: null
  });

  const [color, setColor] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    if (!error) {
      setColor(product.color)
      setSize(product.size)
    }
  }, [router.query])


  const onChangePin = (e) => {
    const { value } = e.target;
    setPin(value)
  }

  const checkService = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pinToDeliver)) {
      setDelivery({ pin: pinToDeliver, service: true })
      toast.success('Your Pincode is Serviceable!', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setDelivery({ pin: pinToDeliver, service: false })
      toast.error('Sorry, Pincode not serviceable!', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  const refreshVariant = async (newColor, newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`;
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproduct`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({slug: variants[newColor][newSize]['slug']}),
    }).then((t)=>t.json());
    setImages(res.img);
    setActiveImage(res.img[0]);
    router.push(url);
  }

  const handleClass = (i) => {
    setBtn(i);
    console.log(btn);
  }

  if (error == 404) {
    return <Error statusCode={404} />
  }

  return <>
    <Head>
      <title>Buy {product.title} - Shopnation.com</title>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-5 py-5 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className='min-h-screen py-10 flex flex-col justify-between lg:flex-row gap-16 lg:items-center '>
            <div className='flex flex-col gap-6 lg:w-2/4'>
              <Image width={600} height={100} src={activeImg} alt={product.title.slice(0,15)+"image"} className='w-full h-full border object-cover rounded-xl' />
              <div className='flex flex-row justify-between h-24'>
                {images.map((item, index) => {
                  return <Image width={600} height={100} key={index} src={item} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(item)} />
                })}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">SHOPNATION</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color[0].toUpperCase() + product.color.slice(1)})</h1>


              <div className="flex mb-4">
                {/* <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span> */}
              </div>

              <div className='flex flex-col'>
                <p className='font-bold text-lg'>Product Description:</p>
                <p className="leading-relaxed">{product.desc}</p>
              </div>
              <div className='flex flex-col pt-6'>
                <p className='font-bold text-lg'>Product Details:</p>
                <ul className='list-disc pl-7'>
                  {product.highlight.map((item, index) => {
                    return <li key={index}>{item}</li>
                  })}
                </ul>
              </div>
              <div className="flex mt-6 items-center border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-2">Color:</span>
                  {Object.keys(variants).map((col, index) => {
                    if (colors.includes(col)) {
                      if (Object.keys(variants[col]).includes(size)) {
                        return <button key={col} onClick={() => { refreshVariant(col, size); }} className={`border-2 ${color === col ? 'border-black' : 'border-gray-300'} ${col === 'white' || col === 'black' ? `bg-${col}` : `bg-${col}-500`} rounded-full ml-1 w-6 h-6 focus:outline-none`}></button>
                      }
                    }
                  })}
                  {/* {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreshVariant('white', size) }} className={`border-2 ${color === 'white' ? 'border-black' : 'border-gray-300'} rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVariant('red', size) }} className={`border-2 ${color === 'red' ? 'border-black' : 'border-gray-300'} ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVariant('blue', size) }} className={`border-2 ${color === 'blue' ? 'border-black' : 'border-gray-300'} ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVariant('green', size) }} className={`border-2 ${color === 'green' ? 'border-black' : 'border-gray-300'} ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => { refreshVariant('black', size) }} className={`border-2 ${color === 'black' ? 'border-black' : 'border-gray-300'} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => { refreshVariant('yellow', size) }} className={`border-2 ${color === 'yellow' ? 'border-black' : 'border-gray-300'} ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVariant('purple', size) }} className={`border-2 ${color === 'purple' ? 'border-black' : 'border-gray-300'} ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('brown') && Object.keys(variants['brown']).includes(size) && <button onClick={() => { refreshVariant('brown', size) }} className={`border-2 ${color === 'brown' ? 'border-black' : 'border-gray-300'} ml-1 bg-amber-900 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('pink') && Object.keys(variants['pink']).includes(size) && <button onClick={() => { refreshVariant('pink', size) }} className={`border-2 ${color === 'pink' ? 'border-black' : 'border-gray-300'} ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none`}></button>} */}
                </div>
              </div>
              <div className="flex mt-6 items-center mb-6">
                <span className="mr-2">Size:</span>
                <div className="relative">
                  {color && Object.keys(variants[color]).map((siz, index) => {
                    if (sizes.includes(siz)) {
                      return <button key={siz} onClick={() => { handleClass(siz); refreshVariant(color, siz); }} className={`${btn === siz ? `bg-orange-100` : ""} text-base p-1 pr-2 pl-2 ml-2 cursor-pointer rounded border appearance-none border-gray-300`}>{siz}</button>
                    }
                  })}
                  {/* <select value={size} onChange={(e) => { refreshVariant(color, e.target.value) }} className={`rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10 cursor-pointer`}> */}
                  {/* {color && Object.keys(variants[color]).includes('S') && <button  onClick={() => { handleClass("S"); refreshVariant(color, "S"); }} className={`${btn === "S" ? `bg-orange-300`:""} text-base p-1 pr-2 pl-2 ml-2 cursor-pointer rounded border appearance-none border-gray-300`}>S</button> }
                      {color && Object.keys(variants[color]).includes('XS') && <button  onClick={() => { handleClass("XS"); refreshVariant(color, "XS"); }} className={` ${btn === "XS" ? `bg-orange-300`:""} XS text-base p-1 pr-2 pl-2 ml-2 cursor-pointer rounded border appearance-none border-gray-300`} >XS</button> }
                      {color && Object.keys(variants[color]).includes('M') && <button  onClick={() => { handleClass("M"); refreshVariant(color, "M"); }} className={` ${btn === "M" ? `bg-orange-300`:""} M text-base p-1 pr-2 pl-2 ml-2 cursor-pointer rounded border appearance-none border-gray-300`}>M</button> }
                      {color && Object.keys(variants[color]).includes('L') && <button  onClick={() => { handleClass("L"); refreshVariant(color, "L"); }} className={` L text-base p-1 pr-2 pl-2 ml-2 cursor-pointer rounded border appearance-none border-gray-300`}>L</button> }
                      {color && Object.keys(variants[color]).includes('XL') && <button  onClick={() => { handleClass("XL"); refreshVariant(color, "XL"); }} className={` XL text-base p-1 pr-2 pl-2 ml-2 cursor-pointer rounded border appearance-none border-gray-300`}>XL</button> }
                      {color && Object.keys(variants[color]).includes('XXL') && <button  onClick={() => { handleClass("XXL"); refreshVariant(color, "XXL"); }} className={` XXl text-base p-1 pr-2 pl-2 ml-2 cursor-pointer rounded border appearance-none border-gray-300`}>XXL</button>} */}
                  {/* </select> */}
                </div>
              </div>
              <div className='flex flex-row pb-4'>
                {product.availableQty > 0 && <span className={`title-font font-medium text-2xl ${product.salePrice ? "text-decoration-line: line-through text-color-gray-100" : ""} ${product.salePrice ? 'text-gray-400' : 'text-gray-800'} pr-3`}>₹{product.price}</span>}
                {product.availableQty > 0 && <p className={`title-font font-medium text-2xl ${product.salePrice ? "" : "hidden"} text-gray-900`}>₹{product.salePrice}</p>}
                {product.availableQty == 0 && <span className="title-font font-medium text-2xl text-gray-900">Out of stock!</span>}
              </div>
              <div className="flex">
                <button disabled={product.availableQty == 0} onClick={() => {
                  addToCart(product.slug, 1, product.price, product.title, product.size, product.color, product.salePrice); toast.success('Item added to cart', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }} className="flex text-white disabled:bg-orange-300 bg-orange-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded text-sm">Add to Cart</button>
                <button disabled={product.availableQty == 0} onClick={() => { buyNow(product.slug, 1, product.price, product.title, product.size, product.color, product.salePrice) }} className="flex ml-4 text-white disabled:bg-orange-300 bg-orange-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded text-sm">Buy Now</button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input maxLength={6} placeholder='Check Serviceability' onChange={onChangePin} type='text' className='px-2 border-2 border-gray-400 rounded-md focus:outline-orange-500' />
                <button onClick={checkService} className=" text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Check</button>
              </div>
              {!delivery.service && delivery.service != null && <div className="text-red-700 text-sm mt-3">Sorry! {delivery.pin} is not Serviceable</div>}
              {delivery.service && delivery.service != null && <div className="text-green-700 text-sm mt-3">{delivery.pin} is Serviceable</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if (product == null) {
    return {
      props: { error: 404 }
    }
  }
  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    } else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }


  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  };
}

export default Slug;