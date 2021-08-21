const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    phone:{
        type:String,
        unique: true,
    },
    fullname:String,
    firstname:String,
    lastname:String,
    address: String,
    password: String,
    role:{
        type:String,
        enum:["admin","manager","customer"],
        default: "customer"
    },
    cart:{
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    blocked:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})
module.exports = mongoose.model('Account',AccountSchema)
