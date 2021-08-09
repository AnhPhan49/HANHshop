const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        defaut: false
    },
},{timestamps:true})

module.exports = mongoose.model('Category',categorySchema)
