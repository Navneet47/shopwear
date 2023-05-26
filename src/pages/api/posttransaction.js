import Order from "../../../models/Order";
import connectDb from "../../../middleware/mongoose";


async function handler(req,res){
    
    //update status into Orders table after checking the transaction status
    const details = JSON.parse(req.body);
     const {status, razorpay_payment_id, oid} = details;

    if(status == 'SUCCESS'){
        await Order.findOneAndUpdate({orderId: oid}, {status:'Paid'});
        await Order.findOneAndUpdate({orderId: oid}, {paymentInfo:razorpay_payment_id});
    } else{
        await Order.findOneAndUpdate({orderId: oid}, {status:'Pending'}, {paymentInfo: razorpay_payment_id});
    }
    // Initiate shipping
    res.redirect('/order',200)
    // Redirect user to the order confirmation page 

    // res.status(200).json({body:req.body});
}

export default connectDb(handler)