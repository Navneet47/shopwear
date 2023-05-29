import connectDb from '../../../middleware/mongoose';
import Order from '../../../models/Order';
import Razorpay from 'razorpay';
import Product from '../../../models/Product';
import shortid from 'shortid';

async function handler(req, res) {
    if (req.method === 'POST') {
        const bodyDetails = JSON.parse(req.body);

        // Check if cart is tempered
          let product, sumTotal = 0;
          if(bodyDetails.products.subTotal <= 0){
            res.status(200).json({success:false, error: "Cart empty! Please build your cart and tr again"})
            return
         }
        for(let item in bodyDetails.products.cart){
            sumTotal += bodyDetails.products.cart[item].price * bodyDetails.products.cart[item].qty 
             product = await Product.findOne({slug: item})
             //check if the cart items are out of stock
             if(product.availableQty < bodyDetails.products.cart[item].qty){
                res.status(200).json({success:false, error: "Some items in your cart went out of stock and have been removed from your cart, Please try again"})
                return
             }
             if(product.price != bodyDetails.products.cart[item].price){
                res.status(200).json({success:false, error: "The Price of some items in your cart have changed. Please try again!"})
                return
            }
        }
        
        if(sumTotal !== bodyDetails.products.subTotal){
            res.status(200).json({success:false, error: "The Price of some items in your cart have changed. Please try again!"})
            return
        }

        //check if details are valid
       if(bodyDetails.products.phone.length !== 10 || !Number.isInteger(Number(bodyDetails.products.phone))){
        res.status(200).json({success:false, error: "Please enter your 10 digit phone number"})
        return
       }
       if(bodyDetails.products.pincode.length !== 6 || !Number.isInteger(Number(bodyDetails.products.pincode))){
        res.status(200).json({success:false, error: "Please enter your 6 digit pincode"})
        return
       }


// Initialize an order corresponding to this order id
        let order = new Order({
            email: bodyDetails.products.email,
            orderId: bodyDetails.products.oid,
            address: bodyDetails.products.address,
            amount: bodyDetails.products.subTotal,
            products: bodyDetails.products.cart,
        })

        await order.save();

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_API_SECRET,
        });

            const payment_capture = 1;
            const amount = bodyDetails.products.subTotal* 100 // amount in paisa. In our case it's INR 1
            const currency = "INR";
            const options = {
                amount: amount.toString(),
                currency,
                receipt: shortid.generate(),
                payment_capture,
                notes:{
                    paymentFor: bodyDetails.products.oid
                }
            };


            try{
                const response = await razorpay.orders.create(options);
                res.status(200).json({success: true,
                    id:response.id,
                    currency: response.currency,
                    amount: response.amount,
                });
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        } else{
            res.status(400).json({status:false ,error: "Internal Server Error"});
        }
    }
    
    export default connectDb(handler);


// Paytm function
// const https = require('https');

        // return res.status(200).json(options);

        // //    Insert an entry in the orders table with status as pending
        //         var paytmParams = {};

        //         paytmParams.body = {
        //             "requestType": "Payment",
        //             "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
        //             "websiteName": "ShopNation",
        //             "orderId": req.body.oid,
        //             "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        //             "txnAmount": {
        //                 "value": req.body.subTotal,
        //                 "currency": "INR",
        //             },
        //             "userInfo": {
        //                 "custId": req.body.email,
        //             },
        //         };

        //         const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), `${process.env.PAYTM_MKEY}`)
        //         paytmParams.head = {
        //             "signature": checksum
        //         };

        //         var post_data = JSON.stringify(paytmParams);


        //         const requestAsync = async () => {
        //             return new Promise((resolve, reject) => {
        //                 var options = {
        //                     hostname: 'securegw.paytm.in',
        //                     port: 443,
        //                     path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
        //                     method: 'POST',
        //                     headers: {
        //                         'Content-Type': 'application/json',
        //                         'Content-Length': post_data.length
        //                     }
        //                 }


        //                 var response = "";
        //                 var post_req = https.request(options, function (post_res) {
        //                     post_res.on('data', function (chunk) {
        //                         response += chunk;
        //                     });

        //                     post_res.on('end', function () {
        //                         // console.log('Response:', response);
        //                         resolve(JSON.parse(response).body)
        //                     });
        //                 });

        //                 post_req.write(post_data);
        //                 post_req.end();
        //             })
        //         }
        //         let myr = await requestAsync();
        //         res.status(200).json(myr);


    // }