const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    product: [{
        id: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        total: Number,
        total_price: Number
    }],
    total_price: Number
},{timestamps:true})

module.exports = mongoose.model('Cart', cartSchema)
