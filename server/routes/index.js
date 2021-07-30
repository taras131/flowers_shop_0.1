const Router = require('express')

const router = new Router()
const brandRouter = require('./brandRouter')
const productRouter = require('./productRouter')
const product_1Router = require('./product_1Router')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')

router.use('/user',userRouter)
router.use('/brand',brandRouter)
router.use('/product',productRouter)
router.use('/product_1',product_1Router)
router.use('/type',typeRouter)
router.use('/cart',cartRouter)

module.exports = router