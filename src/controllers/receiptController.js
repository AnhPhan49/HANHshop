const productModel = require('../models/productModel')
const inventoryModel = require('../models/inventoryModel')
const historyInventoryModel = require('../models/historyInventoryModel')

module.exports.createReceipt = async(req, res)=>{
    try{

    } catch(err){
        return res.status(400).json({message: err.message})
    }
}