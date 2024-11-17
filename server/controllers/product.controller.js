const product_model = require("../models/product.model")
const cloudinary = require("../service/cloudinary.service")

module.exports = {
    getProducts: async(req,res) => {
        try{
             const products = await product_model.find()
             res.json({success:true,message:"success get Products",products})
            
        }
        catch(error){
            res.json({success:false,message:"not success to get Products",products})
             
        }
    }, 
    // addProduct: async(req,res) => {
    //     try{
    //          const body = req.body 
    //          const products = await product_model.create(body)
    //          res.json({success:true,message:"success add Products",products})         
    //     }
    //     catch(error){
    //         res.json({success:false,message:"not success to add Products",products})
             
    //     }
    // },
    addProduct: async(req,res) => {
        try{
            console.log(req.file)
            if(req.file){
                const {secure_url} = await cloudinary.uploader.upload(req.file.path)
                req.body.prduct_image = secure_url
            req.body.product_image = `http://localhost:3000/uploads/${req.file.filename}`

            }
            const body = req.body 
            const products = await product_model.create(body)
            res.json({success:true,message:"success add Products",products})         
        }
        catch(error){
            res.json({success:false,message:"not success to add Products",error})
             
        }
    },
    deleteProduct: async (req,res) => {
        try{
             const {id} = req.params
             const product = await product_model.findByIdAndDelete(id)
             return res.json({success:true,message:"success delete Products",product})  
            
        }
        catch(error){
             return res.json({success:false,message:"not success to delete Products",error})
             
        }
        
    },
    updateProduct: async(req,res) => {
        try{
            const {id} = req.params
            const update = req.body;
            const newProduct = await product_model.findByIdAndUpdate(id,update,{new:true})
            if (!newProduct) return res.json("the product not exist")

            res.json({success:true,message:"success delete Products",newProduct})    

        }
    
    catch(error){
        return res.json({success:false,message:"not success to update Products",error})

    }

}
}