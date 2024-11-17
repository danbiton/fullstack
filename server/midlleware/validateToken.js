const jwt = require("jsonwebtoken");


async function validateToken(req, res, next) {
    console.log("cook",req.cookies)
    const { token } = req.cookies
    // const token = req.body
    try {
        // if (!token) throw "Token not Defined";
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode) throw "token not valid"
        // console.log(decode)
        next();
    } catch (error) {
        // console.log(error)
        res.json(error)
    }
}

module.exports = validateToken;