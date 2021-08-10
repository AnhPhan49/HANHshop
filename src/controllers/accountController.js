const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const AccountModel = require('../models/accountModel')

module.exports.current = async(req,res)=>{
    try{
        let data = await AccountModel.findById(req.user.id, 'email firstname lastname avatar type_account')
    
        return res.status(200).json({
            message: 'Get login session data successfully',
            data: data
        })
    }catch(err){
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

        let {email, firstname, lastname, password} = req.body
        let fullname = firstname + " " + lastname
        
        let checkExist = await AccountModel.findOne({email: email, type_account: "email"})

        if (checkExist) {
            throw new Error ('Email manager này đã được sử dụng')
        }

        let password_hash = await bcrypt.hash(password,10)
        let account = await new AccountModel({
            email: email,
            fullname: fullname,
            firstname: firstname,
            lastname: lastname,
            type_account: "email",
            password: password_hash,
            role: "manager",
            status: true,
        })
        await account.save()
        return res.status(200).json({message: "Tạo tài khoản thành công"})   
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}