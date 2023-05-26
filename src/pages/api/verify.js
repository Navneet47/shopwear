import crypto from "crypto";

const verifyHandler = async (req,res)=>{
    try {
        const {razorpay_order_id,
        razorpay_payment_id,
    razorpay_signature } = JSON.parse(req.body);
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
    .createHmac("sha256",process.env.RAZORPAY_API_SECRET)
    .update(sign.toString())
    .digest("hex");


    if(razorpay_signature === expectedSign){
         res.status(200).json({ status:"SUCCESS", message: "Payment verified successfully", razorpay_order_id, razorpay_payment_id});
    }else{
        return res.status(400).json({ status:"PENDING", message: "Invalid signature sent!",})
    }
    } catch (error) {
        res.status(500).json({error:error})
    }
}

export default verifyHandler;