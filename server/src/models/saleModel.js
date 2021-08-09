const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new Schema({
    name: String,
    description: String,
    percent_discount: Number,
},{timestamps:true})

module.exports = mongoose.model('Sale', saleSchema)
