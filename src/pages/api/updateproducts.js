// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        await Product.findOneAndUpdate({_id: req.body.ID}, {title:req.body.title, slug: req.body.slug, desc: req.body.description, highlight: req.body.highlight, img:req.body.img, category:req.body.category, size:req.body.size, color:req.body.color, price:req.body.price, availableQty: req.body.qty, salePrice:req.body.salePrice});
        res.status(200).json({success: "Product Updated Successfully"})
    } else {
        res.status(400).json({ error: "This method is not allowed" })

    }
}

export default connectDb(handler);