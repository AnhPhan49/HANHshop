const express = require('express')
const inventoryRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const {
    search,
} = require('../controllers/inventoryController')

inventoryRoute.route('/search').get(search)

module.exports = inventoryRoute