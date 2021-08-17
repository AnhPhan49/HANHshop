const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counterModel = require('./counterModel')
const productSchema = new Schema({
    name: String,
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    description: String,
    price: Number,
    price_after_sale: Number,
    id_product: {
        type: String,
        unique: true
    },
    available: {
        type: Boolean,
        default: "false"
    },
    image: [{
        url: String,
        id_image: String
    }],
    status:{
        type: String,
        enum: ["Sale","Hot","Phổ biến","N/A"]
    },
    sale_tag: Number
},{timestamps:true})

productSchema.pre('save', function(next) {
    var doc = this
    counterModel.findByIdAndUpdate(mongoose.Types.ObjectId('61112243ec2c6851e42229a7'), {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id_product = `HANH${counter.seq}`
        next()
    })
})

module.exports = mongoose.model('Product', productSchema)
