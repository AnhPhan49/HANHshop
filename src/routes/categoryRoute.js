const express = require('express')
const categoryRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const addCateValidator = require('./validators/addCateValidator')
const {
  createCategory,
  updateCategory,
  listCategory,
  // deleteCategory,
  listCategoryAdmin
} = require('../controllers/categoryController')

categoryRoute.route('/create').post(checkLogin, addCateValidator, createCategory)

categoryRoute.route('/update/:id').put(checkLogin, addCateValidator, updateCategory)

categoryRoute.route('/admin/list').get(checkLogin, listCategoryAdmin)

categoryRoute.route('/list').get(listCategory)

// categoryRoute.route('/delete/:id').delete(checkLogin, deleteCategory)

module.exports = categoryRoute