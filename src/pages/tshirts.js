import Link from "next/link";
import React from "react";
import Product from "../../models/Product";
import mongoose from "mongoose";
// https://m.media-amazon.com/images/I/51PUMIBLvoL._UL1300_.jpg"
function tShirts({ products }) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {Object.keys(products).map((item) => {
                        return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`} className="group shadow-2xl">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img src={products[item].img} alt="T-shirt image" />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700 pl-2">T-Shirts</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900 pl-2">{products[item].title}</p>
                            <p className="mt-1 text-md  text-gray-900 pl-2">₹{products[item].price}</p>
                            <div className="mt-1 mb-2 text-md  text-gray-900 pl-2">
                                {products[item].size.includes('S') && <span className="border border-gray-300 px-1 mx-1">S</span>}
                                {products[item].size.includes('M') && <span className="border border-gray-300 px-1 mx-1">M</span>}
                                {products[item].size.includes('L') && <span className="border border-gray-300 px-1 mx-1">L</span>}
                                {products[item].size.includes('XL') && <span className="border border-gray-300 px-1 mx-1">XL</span>}
                                {products[item].size.includes('XXL') && <span className="border border-gray-300 px-1 mx-1">XXL</span>}
                            </div>
                            <div className="mt-1 mb-2 text-md  text-gray-900 pl-2">
                                {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                            </div>
                        </Link>
                    })}

                    {/* <!-- More products... --> */}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find({ category: 'tshirt' })
    let tshirts = {}
    for (let item of products) {
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                tshirts[item.title].color.push(item.color)
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                tshirts[item.title].size.push(item.size)
            }
        } else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            } else {
                tshirts[item.title].color = []
                tshirts[item.title].size = []
            }
        }
    }

    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
    };
}

export default tShirts;
