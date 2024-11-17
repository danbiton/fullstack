const { compare } = require("bcrypt");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const { use } = require("../routes/product.router")
const transporter = require("../service/nodemailer.service");
module.exports = {
  signUp: async function (req, res) {
    try {
      const body = req.body;
      const user = await userModel.create(body);
      await transporter.sendMail({
        from: "biton123654@gmail.com",
        to: `${body.user_email}`,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `
                <div>
                <span>for validate Email => </span>
                <a href="http://localhost:3000/users/validationEmail/${user._id}">click me</a>
                </div>`,
      });

      return res.json({ success: true, message: "success to Register", user });
      
    } catch (error) {

      console.log(error);
      return res.json({success: false,message: "not success to Register",error,});
    }
  },
  signIn: async function (req, res) {
    try {
      const { user_email, user_password } = req.body;
      const user = await userModel.findOne({ user_email: user_email });
      if (!user) throw "the email is not exist";

      const isCompare = compare(user_password, user.user_password);
      if (!isCompare) throw "the password is not valid";

      const payload = {
        _id: user._id,
        user_email: user.user_email,
        user_name: user.user_name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1 });
      // res.cookie("token",token)

      // console.log("success to signin")
      res.cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        maxAge: 1000 * 60 * 60 * 1,
      });
      console.log(token);
      return res.status(200).json({ success: true, message: "success to signin", user, token });
                 
        
    } catch (error) {
      console.log(error);
      return res.status(401) .json({ success: false, message: "not success to signin" });
        
       
    }
  },
  signOut: async function (req, res) {
    try {
      res.clearCookie("token", {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",

      });

      return res.json({ success: true, message: "success to signout" });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "not success to signout" });
    }
  },
  validationEmail: async (req, res) => {
    try {
      const { id } = req.params;

      await userModel.findByIdAndUpdate(id, { verify: true });

      return res.status(200).send("האימות הושלם בהצלחה!");
    } catch (error) {
      console.log(error);
      return res.status(500).send("תקלה בתהליך האימות, אנא פנה לתמיכה");
    }
  },
};
