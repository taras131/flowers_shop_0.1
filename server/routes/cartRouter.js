const Router = require('express')
const cartController = require('../controllers/CartController')

const router = new Router()
router.post('/', cartController.add)
router.get('/:id', cartController.get)

module.exports = router