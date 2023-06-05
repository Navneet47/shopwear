import Forgot from "../../../models/Forgot"
import User from "../../../models/User"

export default async function handler (req,res){
    //Check if user exists in Database
    // Send an email to the user
    if(req.body.sendEmail){

        let token = `dsjdhsjhdjsdjsjd2738`
        
        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })
        
        let email = `We have sent you this email in response to your request to reset your password on Shopnation.com
        
    To reset your password please follow the link below:

    <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}">Click here to reset your password</a>
    
    <br/><br/>
    
    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
    
    <br/><br/>`
} else {
     //Reset Password
}
    res.status(200).json({ success: true})
}