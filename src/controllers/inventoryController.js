const productModel = require('../models/productModel')
const inventoryModel = require('../models/inventoryModel')
const categoryModel = require('../models/categoryModel')
const historyInventoryModel = require('../models/historyInventoryModel')

module.exports.updateInventory = async (req, res) =>{
    try{
        let {id} = req.params
        let {total, producer} = req.body
        if (!id) throw new Error("Không tìm thấy ID")
        if (!producer) throw new Error ("Vui lòng nhập nhà cung cấp")
        let updateInven = await inventoryModel.findByIdAndUpdate(id, {total: total})

        let newHistory = await new historyInventoryModel({
            inventory: updateInven._id,
            total_current: updateInven.total - total,
            total_add: total,
            user: req.user.id,
            producer: producer
        })
        newHistory.save()
        
        return res.status(200).json({message:"Cập nhật thành công", data: updateInven})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

// module.exports.search = async (req, res) =>{

// }