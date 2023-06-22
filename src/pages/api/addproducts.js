// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    const {product, img, highlight} = req.body;
    const image = img.split(",");
    const highlights = highlight.split(",");
    const products = [product]
    if (req.method === 'POST') {
        for (let i = 0; i < products.length; i++) {
            let pro = new Product({
                title: products[i].title,
                slug: products[i].slug,
                desc: products[i].desc,
                img: image,
                category: products[i].category,
                size: products[i].size.toUpperCase(),
                color: products[i].color,
                price: products[i].price,
                availableQty: products[i].availableQty,
                highlight: highlights
            })
            await pro.save();
        }
        res.status(200).json({success: true, msg:"Product Added Successfully"});
        return
    } else {
        res.status(400).json({success: false, msg: "This method is not allowed" });
        return

    }
}

export default connectDb(handler);