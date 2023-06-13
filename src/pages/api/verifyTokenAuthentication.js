var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    let error = {
        message: ''
    };
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            error.message = err.message;
        } else {
            error.message = 'none';
        }
    })

    res.status(200).json({ msg: error.message });

}

export default handler;