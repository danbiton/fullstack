const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "biton123654@gmail.com",
        pass: "uicbqdaifockuldh",
    },
});


module.exports = transporter;