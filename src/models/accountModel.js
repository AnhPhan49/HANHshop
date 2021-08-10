const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    email:{
        type:String,
    },
    type_account: String,
    fullname:String,
    firstname:String,
    lastname:String,
    birth:String,
    gender:String,
    phone:String,
    address: String,
    avatar:String,
    id_avatar:String,
    password: String,
    role:{
        type:String,
        enum:["admin","manager","customer"],
        default: "customer"
    },
    tokenVerify:String,
    status: {
        type:Boolean,
        default:false,
    },
    cart:{
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    deleted:{
        type:Boolean,
        default:false,
    },
    blocked:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})
module.exports = mongoose.model('Account',AccountSchema)
