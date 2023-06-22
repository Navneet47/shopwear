import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
        const {slug} = req.body;
        let product = await Product.findOne({slug: slug});
        res.status(200).json(product);
}

export default connectDb(handler);