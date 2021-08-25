const authRoute = require('./authRoute')
const accountRoute = require('./accountRoute')
const categoryRoute = require('./categoryRoute')
const productRoute = require('./productRoute')
const inventoryRoute = require('./inventoryRoute')
const cartRoute = require('./cartRoute')
const receiptRoute = require('./receiptRoute')
const informationRoute = require('./informationRoute')

const route = app =>{
    app.use('/api/auth', authRoute)
    app.use('/api/user', accountRoute)
    app.use('/api/category', categoryRoute)
    app.use('/api/product', productRoute)
    app.use('/api/inventory', inventoryRoute)
    app.use('/api/cart', cartRoute)
    app.use('/api/receipt', receiptRoute)
    app.use('/api/information', informationRoute)
}

module.exports = route