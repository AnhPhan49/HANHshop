const {check} = require('express-validator')

module.exports = [
    check('firstname')
    .exists().withMessage('Vui lòng cung cấp tên')
    .notEmpty().withMessage('Vui lòng không để tên tróng'),
 
    check('lastname')
    .exists().withMessage('Vui lòng cung cấp họ')
    .notEmpty().withMessage('Vui lòng không để họ trống'),

    check('address')
    .exists().withMessage('Vui lòng cung cấp địa chỉ')
    .notEmpty().withMessage('Vui lòng không để địa chỉ trống'),
]