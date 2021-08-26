const express = require('express')
const cartRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const {
    getCart,
    addProduct,
    updateCart
} = require('../controllers/cartController')


cartRoute.route('/get').get(checkLogin, getCart)

cartRoute.route('/add').put(checkLogin, addProduct)

cartRoute.route('/update').put(checkLogin, updateCart)

module.exports = cartRoute