require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CounterSchema = new Schema({
    seq:{ 
        type: Number, 
        default: 21000 
    }
})

module.exports = mongoose.model('Counter', CounterSchema)
