const Router = require('express')
const product_1Controller = require('../controllers/Product_1Controller')

const router = new Router()
router.post('/', product_1Controller.create)
router.get('/', product_1Controller.getAll)
router.delete('/:id', product_1Controller.delete)
router.put('/update_price', product_1Controller.updatePrice)
module.exports = router