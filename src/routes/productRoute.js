const express = require('express')
const productRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const addProductValidator = require('./validators/addProductValidator')
const checkAdmin = require('../midlewares/AdminMidleware')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

const {
    createProduct,
    updateProduct,
    search,
    deleteProduct,
    getProduct
} = require('../controllers/productController')

productRoute.route('/create').post(checkLogin, multipartMiddleware, addProductValidator, createProduct)

productRoute.route('/update/:id').put(checkLogin, multipartMiddleware, addProductValidator, updateProduct)

productRoute.route('/search').get(search)

productRoute.route('/delete/:id').delete(checkLogin, checkAdmin, deleteProduct)

productRoute.route('/get/:id').get(checkLogin, getProduct)

module.exports = productRoute