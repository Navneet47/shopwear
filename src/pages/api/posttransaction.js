import Order from "../../../models/Order";
import connectDb from "../../../middleware/mongoose";
import Product from "../../../models/Product";


async function handler(req, res) {

    //update status into Orders table after checking the transaction status
    const details = JSON.parse(req.body);
    const { status, razorpay_payment_id, oid, razorpay_order_id } = details;
    let order = await Order.findOne({ orderId: oid });

    if (status == 'SUCCESS') {
        await Order.findOneAndUpdate({ orderId: oid }, { status: 'Paid' });
        await Order.findOneAndUpdate({ orderId: oid }, { paymentInfo: {razorpay_payment_id, razorpay_order_id} });
        let products = order.products;
        for (let slug in products) {
            await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } });
        }
        res.status(200).json({ id: order._id });
        return;
    } 
    await Order.findOneAndUpdate({ orderId: oid }, { status: 'Pending' }, { paymentInfo: {razorpay_payment_id, razorpay_order_id} });
    res.status(200).json({ id: order._id });
    // Initiate shipping
    // Redirect user to the order confirmation page 
    // res.redirect('/order?id=' + order._id,200)
}

export default connectDb(handler)

// import PaytmChecksum
// async function handler(req,res){
// let order;

// var paytmChecksum = "";
//     var paytmParams = {}

// const received_data = req.body
// for(let key in received_data){
//     if(key == "CHECKSUMHASH"){
//         paytmChecksum = received_data[key];
//     } else {
//           paytmParams[key] = received_data
//     }
// }

// var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, "merchant_key", paytmChecksum);
// if (!isValidChecksum) {
// res.status(500).send("Some Error Occured");
// return;
// }

    //     //update status into Orders table after checking the transaction status
//     if(req.body.STATUS == 'TXN_SUCCESS'){
//         order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status:'Paid'});
//         await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {paymentInfo:JSON.stringify(req.body)});
//         let products = order.products;
//         for(let slug in products){
//             await Product.findOneAndUpdate({slug: slug}, { $inc: {"availableQty": - products[slug].qty }});
//         }
//     } else if(req.body.STATUS == 'PENDING){
//         await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status:'Pending'}, {paymentInfo: JSON.stringify(req.body)});
//     }
//     // Initiate shipping
//     // res.redirect('/order?id=' + order._id,200)
//     // Redirect user to the order confirmation page

// }

// export default connectDb(handler)