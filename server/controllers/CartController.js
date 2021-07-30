const {Cart} = require('../models/models')
const ApiError = require('../error/APIError')
const {CartProduct} = require("../models/models");

class CartController {
    async add(req, res, next) {
        try{
            let {productId, count} = req.body
            console.log('count: '+count)
            console.log('productId: '+productId)
            const add = await CartProduct.create({productId: productId, count:count})
            return res.json(add)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async get(req, res, next) {
        try{
            const {id} = req.params
            const cart = await Cart.findOne(
                {
                    where: {id},
                    include: [{model: CartProduct, as: "info"}]
                })
            return res.json(cart)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new CartController()