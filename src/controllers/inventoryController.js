const productModel = require('../models/productModel')
const inventoryModel = require('../models/inventoryModel')
const historyInventoryModel = require('../models/historyInventoryModel')

module.exports.updateInventory = async (req, res) =>{
    try{
        let {id} = req.params
        let {count, producer} = req.body
        if (!id) throw new Error("Không tìm thấy ID")
        if (!producer && count > 0) throw new Error ("Vui lòng nhập nhà cung cấp")
        if(count === 0) throw new Error("Vui lòng nhập số lượng lớn hơn 0")
        let updateInven = await inventoryModel.findById(id)
        let totalRemain = updateInven.total + count

        if (totalRemain < 0) {
            throw new Error("KHông đủ hàng trong kho")
        } else if(totalRemain === 0){
            await productModel.findByIdAndUpdate(updateInven.product, {available: false}, {new: true})
        }
        else{
            await productModel.findByIdAndUpdate(updateInven.product, {available: true}, {new: true})
        }

        updateInven.total = totalRemain
        await updateInven.save()        

        let newHistory = await new historyInventoryModel({
            inventory: updateInven._id,
            total_current: updateInven.total - count,
            total_add: count,
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
        if(Math.ceil(searchProducts.length/10) < page + 1){
            return res.status(201).json({message: "Chưa có trang thông báo này"})
        }
        let productFilter = searchProducts.slice(page*10, page*10 + 10)
        let reformattedArray = []
        productFilter.map(obj => {
            reformattedArray.push(obj._id)
        })
        
        let dataSearch = await inventoryModel.find({
            product: {$in: reformattedArray}
        }).populate('product')
        return res.status(200).json({message:"Success", data: {page: page + 1, total_page: Math.ceil(searchProducts.length/10), inventory: dataSearch.reverse()}})
    } catch (err){
        return res.status(400).json({message: err.message})
    }
}

module.exports.listHistoryInventory = async (req, res) => {
    try{
        let {id,page} = req.query
        if (!id) throw new Error("Something went wrong with ID inventory")
        page= page - 1
        if(page < 0) throw new Error("Page not found!!")
        let history = await historyInventoryModel.find().sort({'createdAt': 'desc'}).populate('user','fullname')
        if(Math.ceil(history.length/10) < page + 1){
            return res.status(201).json({message: "Chưa có trang thông báo này"})
        }
        let historyFilter = history.slice(page*10, page*10+10)
        return res.status(200).json({message: "Success", data: {total: Math.ceil(history.length/10), page: page + 1, list: historyFilter}})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
} 