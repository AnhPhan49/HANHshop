const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counterModel = require('./counterModel')
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
    name: String,
    phone: String,
    address: String,
    status: {
        description: String,
        present: {
            type: String,
            enum: ["Đang chờ duyệt", "Đang vận chuyển", "Hủy đơn từ khách", "Hủy đơn từ shop", "Hoàn thành"],
            default: "Đang chờ duyệt"
        }
    },
    in_Process: {
        type: Boolean,
        default: true
    },
    total_price: Number
},{timestamps:true})

receiptSchema.pre('save', function(next) {
    var doc = this
    counterModel.findByIdAndUpdate(mongoose.Types.ObjectId('611a861dd4a1300f856d6566'), {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id_receipt = `HD${counter.seq}`
        next()
    })
})

module.exports = mongoose.model('Receipt', receiptSchema)
