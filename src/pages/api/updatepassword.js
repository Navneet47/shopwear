import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

const handler = async(req,res)=>{
    if(req.method === 'POST'){
        let token = req.body.token;
        let user = jwt.verify(token, process.env.JWT_SECRET);
        let dbUser = await User.findOne({email: user.email})
        const bytes =  CryptoJS.AES.decrypt(dbUser.password, process.env.AES_SECRET);
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        
        if(decryptedData == req.body.password && req.body.newPassword == req.body.confirmPassword){
            await User.findOneAndUpdate({email: user.email}, {password: CryptoJS.AES.encrypt(req.body.confirmPassword, process.env.AES_SECRET).toString()});
            res.status(200).json({ success: true});
            return;
        }else {
            res.status(200).json({ success: false, error:"Error Updating Password"});
        }
    } else {
        res.status(400).json({ success:false, error: "error"})
    }

}

export default connectDb(handler);