const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    total:{ 
        type: Number,
        default: 0
    },
},{timestamps:true})

module.exports = mongoose.model('Inventory', inventorySchema)