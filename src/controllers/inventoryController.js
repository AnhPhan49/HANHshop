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

module.exports.search = async (req, res) =>{
    try {
        let search = req.query
        let {page} = search
        page= page - 1
        if(page < 0) throw new Error("Page not found!!")
        
        delete search.page
        if(Object.keys(search).includes('name'))
            search.name = {"$regex": search.name, "$options":"i"}

        let searchProducts = await productModel.find({...search},'_id').sort({'createdAt': 'desc'})

        if(searchProducts.length/10 < page){
            return res.status(404).json({message: "Chưa có trang thông báo này"})
        }
        let productFilter = searchProducts.slice(page, page + 10)

        let reformattedArray = []
        productFilter.map(obj => {
            reformattedArray.push(obj._id)
        })
        console.log(reformattedArray)
        return res.status(200).json({message:"Success", data: {page: page + 1, total_page: Math.ceil(searchProducts.length/10), product: productFilter}})
    } catch (err){
        return res.status(400).json({message: err.message})
    }
}