const express = require("express")
const router = express.Router()
const validate = require("../midlleware/validateToken")
// const product_model = require("../models/product.model")
const {getProducts,addProduct,deleteProduct,updateProduct} = require ("../controllers/product.controller")
const upload = require("../midlleware/upload")
router.get("/getAllProduct", getProducts)

router.post("/addproduct",upload.single("product_image"),addProduct)

router.put("/updatproduct/:id",updateProduct)

router.delete("/deleteproduct/:id",deleteProduct)

module.exports = router;