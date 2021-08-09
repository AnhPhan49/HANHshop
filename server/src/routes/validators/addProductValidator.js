const {check} = require('express-validator')

module.exports = [

    check('name')
    .exists().withMessage('Vui lòng cung cấp tên sản phẩm')
    .notEmpty().withMessage('Vui lòng không để tên sản phẩm trống'),

    check('category')
    .exists().withMessage('Vui lòng cung cấp danh mục')
    .notEmpty().withMessage('Vui lòng không để danh mục trống'),

    check('price')
    .exists().withMessage('Vui lòng cung cấp đơn giá')
    .notEmpty().withMessage('Vui lòng không để đơn giá trống'),

    check('description')
    .exists().withMessage('Vui lòng cung cấp đơn giá')
    .notEmpty().withMessage('Vui lòng không để đơn giá trống'),
]