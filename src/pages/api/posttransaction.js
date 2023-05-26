import Order from "../../../models/Order";
import connectDb from "../../../middleware/mongoose";
import Product from "../../../models/Product";


async function handler(req,res){
    
    //update status into Orders table after checking the transaction status
    const details = JSON.parse(req.body);
     const {status, razorpay_payment_id, oid} = details;
     let order = await Order.findOne({orderId: oid});

    if(status == 'SUCCESS'){
        await Order.findOneAndUpdate({orderId: oid}, {status:'Paid'});
        await Order.findOneAndUpdate({orderId: oid}, {paymentInfo:razorpay_payment_id});
        let products = order.products;
        for(let slug in products){
            await Product.findOneAndUpdate({slug: slug}, { $inc: {"availableQty": - products[slug].qty }});
        }
        res.status(200).json({id:order._id});
    } else{
        await Order.findOneAndUpdate({orderId: oid}, {status:'Pending'}, {paymentInfo: razorpay_payment_id});
        res.status(200).json({id:order._id});
    }
    // Initiate shipping
    // res.redirect('/order?id=' + order._id,200)
    // Redirect user to the order confirmation page 

    // res.status(200).json({body:req.body});
}

export default connectDb(handler)