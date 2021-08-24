const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const accountModel = require('../models/accountModel')

module.exports.current = async(req,res)=>{
    try{
        let data = await accountModel.findById(req.user.id, 'phone firstname lastname role')
    
        return res.status(200).json({
            message: 'Get login session data successfully',
            data: data
        })
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}

module.exports.changePasswordAdmin = async (req, res) => {
    try{
        let {id} = req.params
        let {password} = req.body
        if (!password) throw new Error("Vui lòng cung cấp mật khẩu mới")
        if (password < 6) throw new Error("Mật khẩu phải có trên 6 ký tự")
        let updateAccount = await accountModel.findById(id)
        if (!updateAccount) throw new Error("Not found user")
        let password_hash = await bcrypt.hash(password,10)
        updateAccount.password = password_hash
        await updateAccount.save()
        return res.status(200).json({message: "Change password success"})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.createManager = async(req, res) =>{
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
        let {phone, firstname, lastname, password} = req.body
        let fullname = firstname + " " + lastname
        
        let checkExist = await accountModel.findOne({phone: phone})

        if (checkExist) {
            throw new Error ('Số điện thoại manager này đã được sử dụng')
        }
        let password_hash = await bcrypt.hash(password,10)
        let account = await new accountModel({
            phone: phone,
            fullname: fullname,
            firstname: firstname,
            lastname: lastname,
            password: password_hash,
            role: "manager",
        })
        await account.save()
        return res.status(200).json({message: "Tạo tài khoản thành công"})   
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.listAccount = async(req, res) =>{
    try{
        let {type} = req.params
        let listAccount = undefined
        if(type !== "manager" && type !== "customer") throw new Error("Wrong param!!!")
        if (type === "manager")
            listAccount = await accountModel.find({role: type},"-password -cart -role")
        else
            listAccount = await accountModel.find({role: type},"-password -cart -role")
        return res.status(200).json({message: "Success", data: listAccount})
    } catch (err){
        return res.status(400).json({message: err.message})
    }
}

module.exports.changePassword = async (req, res) =>{
    try {
        let {id} = req.params
        let {password, newPassword} = req.body

        if (!password) throw new Error("Vui lòng cung cấp mật khẩu hiện tại")
        if (!newPassword) throw new Error("Vui lòng nhập mật khẩu mới")
        if (newPassword < 6) throw new Error("Mật khẩu phải có trên 6 ký tự")
        
        let updateAccount = await accountModel.findById(id)
        if (!updateAccount) throw new Error("Not found user")
        let passwordMatch = await bcrypt.compare(password, updateAccount.password)
        if(!passwordMatch) throw new Error("Mật khẩu hiện tại không chính xác")

        let password_hash = await bcrypt.hash(newPassword, 10)
        updateAccount.password = password_hash
        await updateAccount.save()
        return res.status(200).json({message: "Change password success"})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.blockAccount = async(req, res) =>{
    try{
        let {id} = req.params
        let updateAccount = await accountModel.findById(id)
        updateAccount.blocked = !updateAccount.blocked
        await updateAccount.save()
        return res.status(200).json({message: "Success", data: updateAccount})
    }catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.updateAccount = async (req, res) => {
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
        let updateData = req.body
        let updateAccount = await accountModel.findByIdAndUpdate(id, {updateData}, {new: true})
        return res.status(200).json({message: "Update success", data: updateAccount})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.checkExist = async (req, res) => {
    try{
        let {phone} = req.body
        let flag = false
        if (!phone) throw new Error("Missing phone number!")
        let checkExist = await accountModel.findOne({phone: phone})
        if(checkExist) 
            flag = true
        return res.status(200).json({message: "Check data success", data: {exist: flag}})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}