const mongoose = require ("mongoose")

const order_schema = new mongoose.Schema({
    shipment_details: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        building: {
            type: Number,
            required: true
        }
    },
    total_price: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        enum: [1, 2, 3, 4],
        default: 1
    },
    userId: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId
    },

    products: [
        {
            product: {
                ref: "Products",
                type: mongoose.Schema.Types.ObjectId
            },
            quantity: {
                type: Number,
                required: true,
            },
            RTP: {
                type: Number,
                required: true
            }
        }
    ],
    paid:{
        type: Boolean,
        default: false
    }
    
     


})
module.exports = mongoose.model("orders",order_schema)