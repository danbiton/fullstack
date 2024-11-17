const mongoose = require ("mongoose")

const Product_schema = new mongoose.Schema({
    product_name:{
        type:String,
        requireed:true
    },
    product_price:{
        type:Number,
        required:true
    },
    
    product_image:{
        type:String,
        default:""
        },
    product_description:{
        type:String,
        default:""
        },    


})
module.exports = mongoose.model("products",Product_schema)