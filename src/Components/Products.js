import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Product = (props) => {

    const { _id, img, color, title, price, salePrice, slug } = props.item;
    const colors = ['red', 'blue', 'black', 'green', 'yellow', 'white', 'purple', 'brown', 'pink'];


    return (
        <Link passHref={true} key={_id} href={`/product/${slug}`}>
            <div className="w-72 bg-slate-100 shadow-md rounded-xl hover:shadow-xl">
                <Image loading="lazy" style={{ maxHeight: "22rem" }} width={500} height={100} src={img[0]}
                    alt="Tshirt image" className="h-100 w-72 rounded-t-xl" />
                <div className='mt-2 text-md  text-gray-900 pl-2'>
                    {colors.map((val, index) => {
                        if (color.includes(val)) {
                            return <button key={index} className={`border-2 border-gray-300 ml-1 ${val == 'red' && `bg-red-500`} ${val == 'white' || val == 'black' ? `bg-${val}` : `bg-${val}-500`} rounded-full w-6 h-6 focus:outline-none`}></button>
                        }
                    })}
                </div>
                <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">Tshirt</span>
                    <p className="text-lg font-bold text-black truncate block capitalize">{title.slice(0, 30)}</p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">₹{salePrice ? salePrice : price}</p>
                        <del>
                            <p className={`text-sm ${salePrice ? "" : "hidden"} text-gray-600 cursor-auto ml-2`}>₹{salePrice && price}</p>
                        </del>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Product