import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import Product from '../../models/Product';


const UpdateProduct = ({product}) => {
    // console.log(product);
    const [products, setProduct] = useState(product);
    console.log(product);



  return (
    <div>U</div>
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
      props: { product: JSON.parse(JSON.stringify(product))}, 
      // will be passed to the page component as props
    };
  }

export default UpdateProduct;