const order_model = require("../models/order.model")
module.exports = {

    addOrder: async(req,res) => {
        try{
             const body = req.body 
             const order = await order_model.create(body)
             res.json({success:true,message:"success add orders",order})         
        }
        catch(error){
            res.json({success:false,message:"not success to add orders",order})
             
        }
    },
    getAllOrders: async(req,res) => {
        try{
             
             const orders = await order_model.find()
             .populate([{path: "userId", select: "user_email  user_name" },{
                path: "products", select: "product_name"}])
            //  .populate("userId")
             res.json({success:true,message:"success get all orders",orders})         
        }
        catch(error){
            res.json({success:false,message:"not success to get orders",error})
             
        }
    },
}