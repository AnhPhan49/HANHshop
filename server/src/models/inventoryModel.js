const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    total: Number,
    producer:{
        type: mongoose.Types.ObjectId,
        ref: "Producer"
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)