const express = require('express')
const cartRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const {
    getCart,
    addProduct,
    removeProduct
} = require('../controllers/cartController')

cartRoute.route('/get').get(checkLogin, getCart)

cartRoute.route('/add').put(checkLogin, addProduct)

cartRoute.route('/remove').put(checkLogin, removeProduct)

module.exports = cartRoute