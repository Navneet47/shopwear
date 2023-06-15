// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {

    const {ID,title,desc,category,size,color,price,qty,salePrice,slug} = req.body.product;
    const image = req.body.image;
    const highlight = req.body.highlight;
    let img;
    let highlights;
    if(!Array.isArray(image)){
        img = image.split(",");
    }
    if(!Array.isArray(highlight)){
        highlights = highlight.split(",");
    }
    if (req.method === 'POST') {
        await Product.findOneAndUpdate({_id: ID}, {title: title, slug: slug, desc: desc, category: category, size: size, color: color, price: parseInt(price), availableQty: parseInt(qty), salePrice:parseInt(salePrice), img: img ? img : image, highlight: highlights ? highlights : highlight });
        res.status(200).json({success: true, msg: "Product Updated Successfully"});
        return
    } else {
        res.status(400).json({ success: false, msg: "Error When updating" })

    }
    res.status(200).json({product:req.body.product, image:req.body.image, highlight:req.body.highlight})
}

export default connectDb(handler);