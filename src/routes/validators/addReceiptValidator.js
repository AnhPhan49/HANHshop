const {check} = require('express-validator')

module.exports = [
    check('phone')
    .exists().withMessage('Vui lòng cung cấp số điện thoại')
    .notEmpty().withMessage('Vui lòng không để số điện thoại trống'),

    check('name')
    .exists().withMessage('Vui lòng cung cấp tên')
    .notEmpty().withMessage('Vui lòng không để tên tróng'),
 
    check('address')
    .exists().withMessage('Vui lòng cung cấp địa chỉ')
    .notEmpty().withMessage('Vui lòng không để địa chỉ trống')
]