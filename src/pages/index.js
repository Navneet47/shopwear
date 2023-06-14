import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Link from 'next/link';
import Product from '../../models/Product';
import mongoose from 'mongoose';
const inter = Inter({ subsets: ['latin'] });


export default function Home({ products }) {

  const [product, setProduct] = useState(products);

  const slides = [
    {
      url: 'https://images.complex.com/complex/images/c_limit,dpr_auto,q_90,w_720/fl_lossy,pg_1/iok1arb8zaowqc3wecs9/complex-sneakers-sneaker-sale-2019'
    },
    {
      url: 'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHNoaXJ0JTIwc2FsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60',
    },
    {
      url: 'https://img1.etsystatic.com/130/0/8811518/isla_fullxfull.21928939_f5qh5fw9.jpg',
    },
  ]

  const category = [
    {
      img: 'http://www.chameleonmenswear.co.uk/images/products/zoom/1304610482-39859400.jpg',
      name: 'Hoodies',
      alt: 'hoodie-image',
      link: '/hoodies',
    },
    {
      img: 'https://i-teez.com/wp-content/uploads/2016/02/graphic-designer-tee-shirt-t-men.jpg',
      name: 'T-shirts',
      alt: 'tshirt-image',
      link: '/tshirts',
    },
    {
      // img:'https://img1.etsystatic.com/198/0/11971667/il_fullxfull.1278107315_fcw0.jpg',
      img: 'https://www.giftsforyounow.com/images/products/2139770LM-2-L.jpg',
      name: 'Mugs',
      alt: 'mug-image',
      link: '/mugs',

    },
    {
      img: 'https://media.gq.com/photos/57ffbb79bcbaa8b0566b4c7b/master/w_1600%2Cc_limit/best-stuff-common-cos-01.jpg',
      name: 'Sneakers',
      alt: 'sneaker-image',
      link: '/sneakers',
    },

  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }


  return (
    <>
      <Head>
        <title>Online Shopping - Buy Tshirts,Hoodies,Mugs,Sneakers... </title>
        <meta name="description" content="ShopWear.com - shop the cloth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
              <link rel="manifest" href="/site.webmanifest"></link>
              </Head>
              <main>
                <section id='carousel' className='border border-b-4 mb-6'>
                  <div className='max-w-[600px] h-[580px] sm:max-w-[1200px] sm:h-[680px] w-full m-auto py-16 px-4 relative group'>
                    <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className='max-w-full h-full rounded-xl bg-center bg-cover duration-500'>
                    </div>
                    <div className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                      <BsChevronCompactLeft onClick={prevSlide} size={30} />
                    </div>
                    <div className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                      <BsChevronCompactRight onClick={nextSlide} size={30} />
                    </div>
                    <div className='hidden top-4 justify-center py-2'>
                      {slides.map((slide, slideIndex) => (
                        <div className='text-2xl cursor-pointer' key={slideIndex}>
                          <RxDotFilled className='text-gray-600' onClick={() => goToSlide(slideIndex)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                <section id='categories'>
                  <div className='flex flex-col'>
                    <div>
                      <h1 className='text-center font-semibold text-2xl'>Shop By Category</h1>
                    </div>
                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                          {category.map((item, index) => {
                            return <Link key={index} href={item.link} className="group">
                              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img src={item.img} alt={item.alt} className="h-full w-full object-cover object-center group-hover:opacity-75" />
                                <h3 className="p-2 text-xl text-center uppercase bg-white">{item.name}</h3>
                              </div>
                            </Link>
                          })
                          }
                          {/* <!-- More products... --> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section id='featured'>
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Bestselling Products</h2>

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {product.map((item, index) => {

                          return <div key={index} className="group relative shadow-md">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img src={item.img[0]} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700 ml-2">
                                  <Link href={`/product/${item.slug}`}>
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    {item.title}
                                  </Link>
                                </h3>
                                <div className='flex gap-2'>
                                  <p className="mt-1 text-md font-semibold text-black ml-2 mb-1">₹{item.salePrice ? item.salePrice : item.price}</p>
                                  <del className={`mt-1 text-sm font-medium ${item.salePrice ? "" : "hidden"} ${item.salePrice ? "text-underline" : ""} text-gray-600`}>₹{item.salePrice && item.price}</del>
                                </div>
                              </div>
                            </div>
                          </div>
                        })
                        }

                        {/* <!-- More products... --> */}
                      </div>
                    </div>
                  </div>
                </section>
                <section id='highlights' className="text-gray-600 body-font">
                  <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">

                      <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">100% Satisfaction</h2>
                          <p className="leading-relaxed text-base">User satisfaction guarantee</p>
                        </div>
                      </div>
                      <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                            <svg width="30" height="30" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M8 19C9.10457 19 10 18.1046 10 17C10 15.8954 9.10457 15 8 15C6.89543 15 6 15.8954 6 17C6 18.1046 6.89543 19 8 19Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" id="mainIconPathAttribute"></path> <path d="M18 19C19.1046 19 20 18.1046 20 17C20 15.8954 19.1046 15 18 15C16.8954 15 16 15.8954 16 17C16 18.1046 16.8954 19 18 19Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" id="mainIconPathAttribute"></path> <path d="M10.05 17H15V6.6C15 6.26863 14.7314 6 14.4 6H1" stroke="currentColor" strokeLinecap="round" id="mainIconPathAttribute"></path> <path d="M5.65 17H3.6C3.26863 17 3 16.7314 3 16.4V11.5" stroke="currentColor" strokeLinecap="round" id="mainIconPathAttribute"></path> <path d="M2 9L6 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" id="mainIconPathAttribute"></path> <path d="M15 9H20.6101C20.8472 9 21.0621 9.13964 21.1584 9.35632L22.9483 13.3836C22.9824 13.4604 23 13.5434 23 13.6273V16.4C23 16.7314 22.7314 17 22.4 17H20.5" stroke="currentColor" strokeLinecap="round" id="mainIconPathAttribute"></path> <path d="M15 17H16" stroke="currentColor" strokeLinecap="round" id="mainIconPathAttribute"></path> </svg>
                          </div>
                          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Free Shipping</h2>
                          <p className="leading-relaxed text-base">Super Fast and Free Delivery</p>
                        </div>
                      </div>
                      <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          </div>
                          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Secured Shopping</h2>
                          <p className="leading-relaxed text-base">Super Secure Payment System</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </>
            )
}

            export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
              await mongoose.connect(process.env.MONGO_URI);
  }
            let products = await Product.find({category: 'tshirt' })
            let tshirt = { }
            let result = []
            for (let item of products) {
    if (item.title in tshirt) {
      if (!tshirt[item.title].color.includes(item.color) && item.availableQty > 0) {
              tshirt[item.title].color.push(item.color)
            }
      if (!tshirt[item.title].size.includes(item.size) && item.availableQty > 0) {
              tshirt[item.title].size.push(item.size)
            }
    } else {
              tshirt[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
              tshirt[item.title].color = [item.color]
        tshirt[item.title].size = [item.size]
      } else {
              tshirt[item.title].color = []
        tshirt[item.title].size = []
      }
    }
  }
  Object.keys(tshirt).map((item) => {
              result.push(tshirt[item])
            })
            let newResult = result.slice(0, 5);

            return {
              props: {products: JSON.parse(JSON.stringify(newResult)) }, // will be passed to the page component as props
  };
}

