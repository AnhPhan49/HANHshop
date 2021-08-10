const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historyInventorySchema = new Schema({
    inventory:{
        type: mongoose.Types.ObjectId,
        ref: "Inventory"
    },
    total_current: Number,
    total_add: Number,
    user:{
        type: mongoose.Types.ObjectId,
        ref: "Account"
    },
    producer: {
        type: mongoose.Types.ObjectId,
        ref: "Producer"
    }
},{timestamps:true})

module.exports = mongoose.model('HistoryInventory', historyInventorySchema)