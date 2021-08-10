const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{
    let authorization = req.header('Authorization')
    if (!authorization){
        return res.status(401)
        .json({ message :'vui lòng cung cấp jwt token qua header'})
    }

    let token = authorization.split(" ")[1]
    if (!token){
        return res.status(401)
        .json({ message :'vui lòng cung cấp jwt token hợp lệ'})        
    }
    
    const {JWT_SECRET} = process.env
    jwt.verify(token, JWT_SECRET, (err,data)=>{
        if(err){
            return res.status(401)
            .json({ message:'Token không hợp lệ hoặc đã time out'})
        }
        req.user = data
        next()
    })
}