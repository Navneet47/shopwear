import React from 'react';
import Link from "next/link";
import Product from "../../models/Product";
import mongoose from "mongoose";
import Image from "next/image";

// https://m.media-amazon.com/images/I/51W0YDiJobL._UX425_.jpg
function Hoodies({ products }) {
    const color = ['red','blue','black','green','yellow','white','purple','brown','multi','pink'];
    return (
        <div>
        <div className="flex flex-col mx-14 lg:mx-32">
            <h1 className="font-semibold m-2 mb-4 text-2xl md:text-4xl text-center capitalize">Explore Our Hoodies Collection</h1>
            <p className="text-sm font-medium dark:text-gray-400 mb-3 text-center">
                Stay warm and stylish with the wide selection of Hoodies available at Shopnation.com. All of our Hoodies are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect Hoodies for you!</p>
        </div>

        {/* // <!-- ✅ Grid Section - Starts Here 👇 --> */}
        <section id="Projects"
            className="w-fit min-h-screen mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
            {Object.keys(products).length === 0 && <p className="font-bold">Sorry all the Hoodies are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
                return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}>
                    <div className="w-72 bg-slate-100 shadow-md rounded-xl hover:shadow-xl">
                            <Image width={500} height={160} src={products[item].img}
                                alt="Tshirt image" className="h-90 w-72 object-cover rounded-t-xl" />
                            <div className='mt-2 text-md  text-gray-900 pl-2'>
                            {color.map((val)=>{
                                if(products[item].color.includes(val)){
                                    return <button key={val} className={`border-2 border-gray-300 ml-1 bg-${val}-500 rounded-full w-6 h-6 focus:outline-none`}></button>
                                }
                            })}
                            </div>
                            <div className="px-4 py-3 w-72">
                                <span className="text-gray-400 mr-3 uppercase text-xs">Tshirt</span>
                                <p className="text-lg font-bold text-black truncate block capitalize">{products[item].title.slice(0,30)}</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">₹{products[item].salePrice ? products[item].salePrice : products[item].price}</p>
                                    <del>
                                        <p className={`text-sm ${products[item].salePrice ? "" : "hidden"} text-gray-600 cursor-auto ml-2`}>₹{products[item].salePrice && products[item].price}</p>
                                    </del>
                                </div>
                            </div>
                    </div>
                </Link>
            })}
        </section>
    </div>    
    );
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find({ category: 'hoodie' })
    let hoods = {}
    for (let item of products) {
        if (item.title in hoods) {
            if (!hoods[item.title].color.includes(item.color) && item.availableQty > 0) {
                hoods[item.title].color.push(item.color)
            }
            if (!hoods[item.title].size.includes(item.size) && item.availableQty > 0) {
                hoods[item.title].size.push(item.size)
            }
        } else {
            hoods[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                hoods[item.title].color = [item.color]
                hoods[item.title].size = [item.size]
            }
        }
    }

    return {
        props: { products: JSON.parse(JSON.stringify(hoods)) }, // will be passed to the page component as props
    };
}

export default Hoodies;
