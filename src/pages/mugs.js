import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Product from "../../models/Product";
import mongoose from "mongoose";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";

function Mugs({ products, allCount }) {
    const color = ['red', 'blue', 'black', 'green', 'yellow', 'white', 'purple', 'brown', 'pink'];
    const [productList, setProductList] = useState(products)
    const [count, setCount] = useState(9);

    const fetchData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproducts?count=${count + 9}`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: 'mug' }),
        }).then((t) => t.json());
        setCount(count + 9);
        setProductList(res);
    }


    return (
        <div>
            <Head>
                <title>Buy Mugs at best price in India - Shopnation.in</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <header>
            <div className="flex flex-col mx-14 lg:mx-32">
                <h1 className="font-semibold m-2 mb-4 text-2xl md:text-4xl text-center capitalize">Explore Our mugs Collection</h1>
                <p className="text-sm font-medium dark:text-gray-400 mb-3">
                    Stay warm and stylish with the wide selection of mugs available at Shopnation.com. All of our mugs are made with high-quality materials and are designed to be durable. Shop now and find the perfect mugs for you!
                </p>
                {products.length === 0 && <p className="font-bold text-xl mt-20">Sorry all the Mugs are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            </div>
            </header>
            {/* // <!-- ✅ Grid Section - Starts Here 👇 --> */}
            <InfiniteScroll dataLength={productList.length}
                next={() => {
                    setTimeout(() => {
                        fetchData()
                    }, 1500)
                }}
                hasMore={allCount !== productList.length}
                loader={<h4 className="text-2xl text-center text-orange-600 mt-5 mb-5">Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>
                        <b className="bg-slate-200 p-2">You have reached the end of the list</b>
                    </p>
                }

            >
                <main>
                <section id="Mugs"
                    className="w-fit min-h-screen mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {productList.map((item) => {
                        return <Link passHref={true} key={item._id} href={`/product/${item.slug}`}>
                            <div className="w-72 bg-slate-100 shadow-md rounded-xl hover:shadow-xl">
                                <Image loading="lazy" style={{ maxHeight: "22rem" }} width={500} height={100} src={item.img[0]}
                                    alt="mug image" className="h-90 w-72 object-cover rounded-t-xl" />
                                <div className='mt-2 text-md  text-gray-900 pl-2'>
                                    {color.map((val, index) => {
                                        if (item.color.includes(val)) {
                                            return <button key={index} className={`border-2 border-gray-300 ml-1 ${val == 'red' && `bg-red-500`} ${val == 'white' || val == 'black' ? `bg-${val}` : `bg-${val}-500`} rounded-full w-6 h-6 focus:outline-none`}></button>
                                        }
                                    })}
                                </div>
                                <div className="px-4 py-3 w-72">
                                    <span className="text-gray-400 mr-3 uppercase text-xs">mug</span>
                                    <p className="text-lg font-bold text-black truncate block capitalize">{item.title.slice(0, 30)}</p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-black cursor-auto my-3">₹{item.salePrice ? item.salePrice : item.price}</p>
                                        <del>
                                            <p className={`text-sm ${item.salePrice ? "" : "hidden"} text-gray-600 cursor-auto ml-2`}>₹{item.salePrice && item.price}</p>
                                        </del>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })}
                </section>
                </main>
            </InfiniteScroll>
            {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}

        </div>
    );
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find({ category: 'mug' })
    let mug = {}
    let result = []
    for (let item of products) {
        if (item.title in mug) {
            if (!mug[item.title].color.includes(item.color) && item.availableQty > 0) {
                mug[item.title].color.push(item.color)
            }
            if (!mug[item.title].size.includes(item.size) && item.availableQty > 0) {
                mug[item.title].size.push(item.size)
            }
        } else {
            mug[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                mug[item.title].color = [item.color]
                mug[item.title].size = [item.size]
            } else {
                mug[item.title].color = []
                mug[item.title].size = []
            }
        }
    }
    Object.keys(mug).map((item) => {
        result.push(mug[item])
    })
    let newResult = result.slice(0, 9);
    let allCount = result.length;

    return {
        props: { products: JSON.parse(JSON.stringify(newResult)), allCount }, // will be passed to the page component as props
    };
}

export default Mugs;
