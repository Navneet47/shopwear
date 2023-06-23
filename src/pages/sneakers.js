import React, { useState } from "react";
import Product from "../../models/Product";
import mongoose from "mongoose";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import Products from "@/Components/Products";

function Sneakers({ products, allCount }) {
    const [productList, setProductList] = useState(products)
    const [count, setCount] = useState(9);

    const fetchData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproducts?count=${count + 9}`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: 'sneaker' }),
        }).then((t) => t.json());
        setCount(count + 9);
        setProductList(res);
    }


    return (
        <div>
            <Head>
                <title>Buy Sneakers at best price in India</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <header>
            <div className="flex flex-col mx-14 lg:mx-32">
                <h1 className="font-semibold m-2 mb-4 text-2xl md:text-4xl text-center capitalize">Explore Our Sneaker Collection</h1>
                <p className="text-sm font-medium dark:text-gray-400 mb-3">
                    Stay stylish with the wide selection of Sneakers available at Shopnation.com. All of our Sneakers are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect Sneaker for you!
                </p>
                {products.length === 0 && <p className="font-bold text-xl mt-20">Sorry all the Sneakers are currently out of stock. New stock coming soon. Stay Tuned!</p>}
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
                <section id="Sneakers"
                    className="w-fit min-h-screen mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {productList.map((item) => {
                        return <Products key={item._id} item= {item} />
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
    let products = await Product.find({ category: 'sneaker' })
    let tshirt = {}
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
    let newResult = result.slice(0, 9);
    let allCount = result.length;

    return {
        props: { products: JSON.parse(JSON.stringify(newResult)), allCount }, // will be passed to the page component as props
    };
}

export default Sneakers;
