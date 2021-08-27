const express = require("express");
const receiptRoute = express.Router();
const checkLogin = require("../midlewares/loginMidleware");
const managerAllow = require("../midlewares/managerAllowMidlleware")

const { createReceipt, cancelReceipt, getReceipts, approveReceipt, cancelReceiptByAdmin, completeReceipt } = require("../controllers/receiptController");
const addReceiptValidator = require("./validators/addReceiptValidator");

receiptRoute.route('/create').post(checkLogin, addReceiptValidator, createReceipt);

receiptRoute.route('/cancel/:id').delete(checkLogin, cancelReceipt)

receiptRoute.route('/user').get(checkLogin, getReceipts)
 
receiptRoute.route('/approve-receipt/:id').put(checkLogin, managerAllow, approveReceipt)

receiptRoute.route('/admin/cancel/:id').put(checkLogin, managerAllow, cancelReceiptByAdmin)

receiptRoute.route('/admin/complete/:id').put(checkLogin, managerAllow, completeReceipt)

// receiptRoute.route('/search').get()

module.exports = receiptRoute;
