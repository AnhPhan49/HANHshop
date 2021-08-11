const {validationResult} = require('express-validator')
const crypto = require('crypto')
const mongoose = require('mongoose')
const AccountModel = require('../models/accountModel')
const categoryModel = require('../models/categoryModel')


module.exports.createCategory = async (req, res) => {
    try {
        let result = validationResult(req)
        if(result.errors.length !== 0){
            let messages = result.mapped()
            let message = ''
            for(m in messages){
                message= messages[m].msg
                break
            }
            throw new Error (message)
        }
        let {name} = req.body
        let active = req.body.active ? req.body.active : false
       
        const checkExist = await categoryModel.findOne({name: name})

        if(checkExist) throw new Error("Tên danh mục đã được tạo")

        let newCate = new categoryModel({
            name: name,
            active: active
        })
        newCate.save()

        return res.status(200).json({message: "Tạo thành công"})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        let result = validationResult(req)
        if(result.errors.length !== 0){
            let messages = result.mapped()
            let message = ''
            for(m in messages){
                message= messages[m].msg
                break
            }
            throw new Error (message)
        }
        let {id} = req.params
        let {name} = req.body
        let active = req.body.active ? req.body.active : false
        const checkExist = await categoryModel.findOne({name: name, _id: {$nin:id}})
        if(checkExist) throw new Error("Tên danh mục đã được tạo")
        console.log(name,id)
        let newCate = await categoryModel.findByIdAndUpdate(id, {
            name: name,
            active: active
        },{new: true})
        console.log(newCate)
        return res.status(200).json({message: "Cập nhật thành công", data: newCate})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.listCategoryAdmin = async (req, res) =>{
    try{
        let listCate = await categoryModel.find()
        return res.status(200).json({message: "Lấy dữ liệu thành công", data: listCate})
    }catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.listCategory = async (req, res) =>{
    try{
        let listCate = await categoryModel.find({active: {$nin: false}})
        return res.status(200).json({message: "Lấy dữ liệu thành công", data: listCate})
    }catch (err) {
        return res.status(400).json({message: err.message})
    }
}
