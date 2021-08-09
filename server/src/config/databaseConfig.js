require('dotenv').config()
const mongoose = require('mongoose')
const URI = process.env.MONGODB_URL
const mongoConnect = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, err => {
        if(err)
            throw err
        console.log('Connect to MongoDB successfully')
    })
}

module.exports = mongoConnect