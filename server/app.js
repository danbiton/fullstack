const express = require("express")
const path = require ("path")
const cors = require ("cors")
const cookieParser = require("cookie-parser")
const app = express()
require ("dotenv").config()
require ("./database/connectDB")();
require("./service/cloudinary.service")

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.use(cors({
    credentials:true,
    optionsSuccessStatus:200,
    origin:["http://127.0.0.1:5500"]
}))

const product_router = require ("./routes/product.router")
const user_router = require("../server/routes/user.router")
const order_router = require("../server/routes/order.router")

app.use("/product",product_router)
app.use("/users",user_router)
app.use("/orders",order_router)



app.listen(3000,() => console.log("the server run on port 3000"))