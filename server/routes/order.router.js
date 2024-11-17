const express = require("express")
const router = express.Router()

const {addOrder,getAllOrders} = require("../controllers/order.controller")

router.post("/addOrder",addOrder)
router.get("/getAllOrders",getAllOrders)
module.exports = router;