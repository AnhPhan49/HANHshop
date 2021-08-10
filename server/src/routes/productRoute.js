const express = require('express')
const productRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const addProductValidator = require('./validators/addProductValidator')
const checkAdmin = require('../midlewares/AdminMidleware')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

const {
    createProduct,
    search,
    deleteProduct
} = require('../controllers/productController')

productRoute.route('/create').post(checkLogin, multipartMiddleware, addProductValidator, createProduct)

// productRoute.route('/update/:id').put(checkLogin,addProductValidator, updateCategory)

// productRoute.route('/admin/list').get(checkLogin, listCategoryAdmin)

productRoute.route('/search').get(search)

productRoute.route('/delete/:id').delete(checkLogin, checkAdmin, deleteProduct)
// // productRoute.route('/delete/:id').delete(checkLogin, deleteCategory)

module.exports = productRoute