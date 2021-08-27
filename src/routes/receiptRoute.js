const express = require("express");
const receiptRoute = express.Router();
const checkLogin = require("../midlewares/loginMidleware");
const checkAdmin = require("../midlewares/AdminMidleware");

const { createReceipt, cancelReceipt, getReceipts } = require("../controllers/receiptController");
const addReceiptValidator = require("./validators/addReceiptValidator");
    
receiptRoute.route('/create').post(checkLogin, addReceiptValidator, createReceipt);

receiptRoute.route('/cancel/:id').delete(checkLogin, cancelReceipt)

receiptRoute.route('/in-proccess').get(checkLogin, getReceipts);

module.exports = receiptRoute;
