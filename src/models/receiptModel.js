const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receiptSchema = new Schema({
    id_receipt: String,
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "Account"
    },
    saler: {
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
    status: {
        description: String,
        reason: {
            type: String,
            enum: ["Đang chờ duyệt","Đang vận chuyển","Hủy đơn từ khách"]
        }
    },
    total_price: Number
},{timestamps:true})

module.exports = mongoose.model('Receipt', receiptSchema)
