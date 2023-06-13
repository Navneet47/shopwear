import Forgot from "../../../models/Forgot"
import User from "../../../models/User"
var nodemailer = require('nodemailer');
var CryptoJS = require("crypto-js");
import connectDb from "../../../middleware/mongoose";

async function handler(req, res) {
    //Check if user exists in Database
    // Send an email to the user
    const { sendMail, email } = req.body;
    // host: "smtp.gmail.com",

    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PSS
        },
        secure: true,
    });

    if (sendMail) {
        let user = User.findOne({ email: email });
        let fUser = Forgot.findOne({email:email});
        if (user) {
            let number = '1234567890';
            let word = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$'
            let token = '';
            for(let i=0;i<15;i++){
                let n = Math.random()*number.length;
                let w = Math.random()*word.length;
                token += number.charAt(n)+word.charAt(w);
            }
            if(fUser){
                await Forgot.findOneAndUpdate({email:req.body.email},{token:token});
            }else{
                let forgot = new Forgot({
                        email: req.body.email,
                        token: token,
                    })
                    await forgot.save();
            }

            let emailToSend = `We have sent you this email in response to your request to reset your password on Shopnation.com
            
    To reset your password please follow the link below:

    <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}">Click here to reset your password</a>
    
    <br/><br/>
    
    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
    
    <br/><br/>`;

            let mailOptions = {
                from: process.env.GMAIL_ID,
                to: req.body.email,
                subject: 'Password Reset',
                html: emailToSend,
            }

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.status(200).json({ success: false, msg: err });
                    return;
                } else {
                    res.status(200).json({ success: true});
                    return;
                }
            })

        } else {
            res.status.json({ success: false, msg: 'user not found' });
            return;
        }
    } else {
        //Reset Password
        let token = req.body.token;
        let userEmail = await Forgot.findOne({ token: token });
        if (userEmail) {
            let dbUser = await User.findOne({ email: userEmail.email });
            if (dbUser) {
                await User.findOneAndUpdate({ email: dbUser.email }, { password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() });
                res.status(200).json({ success: true, msg: 'Password Successfully Reset' });
                return;
            } else {
                res.status(200).json({ success: false, msg: 'Error' });
            }
        } else {
            res.status(400).json({ error: "invalid token" });
        }
    }
}

export default connectDb(handler);