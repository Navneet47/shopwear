import connectDb from '../../../middleware/mongoose';
import Order from '../../../models/Order';
import Razorpay from 'razorpay';
import Product from '../../../models/Product';
import shortid from 'shortid';
import pincodes from '../../../pincodes.json';

async function handler(req, res) {
    if (req.method === 'POST') {
        const bodyDetails = JSON.parse(req.body);

      //check if pincode is serviceable

      if(!Object.keys(pincodes).includes(bodyDetails.products.pincode)){
            res.status(200).json({success:false, error: "The Pincode you entered is not serviceable", cartClear: false});
            return;
      }

        // Check if cart is tempered
          let product, sumTotal = 0;
          if(bodyDetails.products.subTotal <= 0){
            res.status(200).json({success:false, error: "Cart empty! Please build your cart and tr again", cartClear: false})
            return
         }
        for(let item in bodyDetails.products.cart){
            if(bodyDetails.products.cart[item].salePrice){
                sumTotal += bodyDetails.products.cart[item].salePrice * bodyDetails.products.cart[item].qty 
                product = await Product.findOne({slug: item})
            } else {
                sumTotal += bodyDetails.products.cart[item].price * bodyDetails.products.cart[item].qty 
                product = await Product.findOne({slug: item})
            }
             //check if the cart items are out of stock
             if(product.availableQty < bodyDetails.products.cart[item].qty){
                res.status(200).json({success:false, error: "Some items in your cart went out of stock and have been removed from your cart, Please try again", cartClear: true})
                return
             }
             if(bodyDetails.products.cart[item].salePrice){
                 if(product.salePrice != bodyDetails.products.cart[item].salePrice){
                    res.status(200).json({success:false, error: "The Price of some items in your cart have changed. Please try again!", cartClear: true})
                    return
                }
             } else {

                 if(product.price != bodyDetails.products.cart[item].price){
                    res.status(200).json({success:false, error: "The Price of some items in your cart have changed. Please try again!", cartClear: true})
                    return
                }
             }
        }
        
        if(sumTotal !== bodyDetails.products.subTotal){
            res.status(200).json({success:false, error: "The Price of some items in your cart have changed. Please try again!", cartClear: true})
            return
        }

        //check if details are valid
       if(bodyDetails.products.phone.length !== 10 || !Number.isInteger(Number(bodyDetails.products.phone))){
        res.status(200).json({success:false, error: "Please enter your 10 digit phone number", cartClear: false})
        return
       }
       if(bodyDetails.products.pincode.length !== 6 || !Number.isInteger(Number(bodyDetails.products.pincode))){
        res.status(200).json({success:false, error: "Please enter your 6 digit pincode", cartClear: false})
        return
       }


// Initialize an order corresponding to this order id
        let order = new Order({
            email: bodyDetails.products.email,
            orderId: bodyDetails.products.oid,
            address: bodyDetails.products.address,
            city: bodyDetails.products.city,
            state: bodyDetails.products.state,
            phone: bodyDetails.products.phone,
            pincode: bodyDetails.products.pincode,
            name: bodyDetails.products.name,
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
                    cartClear: false
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
