const {check} = require('express-validator')

module.exports = [
    check('phone')
    .exists().withMessage('Vui lòng cung số điện thoại')
    .notEmpty().withMessage('Vui lòng không để số điện thoại tróng'),
 
    check('email')
    .exists().withMessage('Vui lòng cung cấp họ')
    .notEmpty().withMessage('Vui lòng không để họ trống')
    .isEmail().withMessage('Vui lòng cung cấp đúng định dạng email'),


    check('address')
    .exists().withMessage('Vui lòng cung cấp địa chỉ')
    .notEmpty().withMessage('Vui lòng không để địa chỉ trống'),

    check('description')
    .exists().withMessage('Vui lòng cung cấp mô tả trang web')
    .notEmpty().withMessage('Vui lòng không để mô tả trống'),
    
    check('tax_code')
    .exists().withMessage('Vui lòng cung cấp mã số thuế')
    .notEmpty().withMessage('Vui lòng không để mã số thuế trống'),

]