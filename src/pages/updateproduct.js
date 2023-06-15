import React, { useState, useEffect } from 'react'
import mongoose from 'mongoose';
import Product from '../../models/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Error from 'next/error';

const UpdateProduct = ({ product }) => {
    const [products, setProduct] = useState(product);

    const [admin, setAdmin] = useState(null);
    const [users, setUser] = useState(process.env.NEXT_PUBLIC_ADMIN_ID);
    const [productDetials, setProductDetails] = useState({
        ID: "",
        title: "",
        slug: "",
        desc: "",
        category: "",
        size: "",
        color: "",
        price: "",
        qty: "",
        salePrice:"", 
    });

    const [image, setImage] = useState([]);
    const [highlight, setHighLight] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('myuser');
        if (user) {
            setAdmin(JSON.parse(user));
        }
    }, []);

    useEffect(()=>{
       if(admin && admin.email == users){
          setProductDetails({
            ID: products._id,
            title: products.title,
            slug: products.slug,
            desc: products.desc,
            category: products.category,
            size: products.size,
            color: products.color,
            price: products.price,
            qty: products.availableQty,
            salePrice: products.salePrice ? products.salePrice : 0
        })
        setImage(products.img)
        setHighLight(products.highlight)
       }
    }, [admin])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetials, [name]: value })
        if (name == 'img') {
            setImage(value);
        }
        if (name == 'highlight') {
            setHighLight(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product: productDetials, image: image, highlight: highlight })
        })
        const res = await req.json();
        if (res.success) {
            toast.success(res.msg, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(res.msg, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
    }

    if (admin == null) {
        return <Error statusCode={404} />
    }

    if (admin.email !== users) {
        return <Error statusCode={404} />
    }

    return (
        <div className='container mx-auto my-9 pb-10'>
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
            <Head>
                <title>Myaccount - Shopnation.in</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <h1 className='text-3xl text-center font-bold mb-10'>Update Product</h1>
            <main>
                <section id='form' className='ml-4 mr-4'>
                    <div className="mx-auto flex my-2">
                        <div className="px-2 w-full">
                            <div className="mb-4">
                                <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                                <input type="text" id="title" name="title" onChange={handleChange} value={productDetials.title} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                        </div>
                    </div>
                    <div className="px-2 w-full">
                        <div className="mb-4">
                            <label htmlFor="slug" className="leading-7 text-sm text-gray-600">Slug</label>
                            <input type="text" id="slug" name="slug" onChange={handleChange} value={productDetials.slug} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="mx-auto flex my-2">
                        <div className="px-2 w-full">
                            <div className="mb-4">
                                <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Description</label>
                                <textarea rows={3} cols={30} type="text" id="desc" name="desc" onChange={handleChange} value={productDetials.desc} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto flex my-2'>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="category" className="leading-7 text-sm text-gray-600">Category</label>
                                <input type="text" id="category" name="category" onChange={handleChange} value={productDetials.category} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="size" className="leading-7 text-sm text-gray-600">Size</label>
                                <input type="text" id="size" name="size" onChange={handleChange} value={productDetials.size} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="color" className="leading-7 text-sm text-gray-600">Color</label>
                                <input type="text" id="color" name="color" onChange={handleChange} value={productDetials.color} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                    </div>
                    <div className='mx auto flex my-2'>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</label>
                                <input type="number" id="price" name="price" onChange={handleChange} value={productDetials.price} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="qty" className="leading-7 text-sm text-gray-600">Quantity</label>
                                <input type="number" id="qty" name="qty" onChange={handleChange} value={productDetials.qty} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="salePrice" className="leading-7 text-sm text-gray-600">Sale Price</label>
                                <input type="number" id="salePrice" name="salePrice" onChange={handleChange} value={productDetials.salePrice} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                    </div>
                    <div className='mx auto flex my-2'>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="highlight" className="leading-7 text-sm text-gray-600">Highlight</label>
                                <textarea rows={10} cols={40} type="text" id="highlight" name="highlight" onChange={handleChange} value={highlight} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="img" className="leading-7 text-sm text-gray-600">Image</label>
                                <textarea rows={10} cols={40} type="text" id="img" name="img" onChange={handleChange} value={image} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="m-2 mb-5 disabled:bg-orange-200 flex mr-2 text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md">Update</button>
                </section>
            </main>
        </div>
    )
}


export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let product = await Product.findOne({ _id: context.query.id })
    // let variants = await Product.find({ title: product.title, category: product.category })
    // let colorSizeSlug = {};

    return {
        props: { product: JSON.parse(JSON.stringify(product)) },
        // will be passed to the page component as props
    };
}

export default UpdateProduct;