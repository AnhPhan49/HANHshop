const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    customer:{
        type: mongoose.Types.ObjectId,
        ref: "Account"
    },
    product: [{
        id: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        total: Number,
        total_price: Number
    }],
    total_price: {
        type: Number,
        default: 0
    }
},{timestamps:true})

module.exports = mongoose.model('Cart', cartSchema)
