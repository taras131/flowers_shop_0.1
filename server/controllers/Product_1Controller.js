const {Product_1} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/APIError')

class Product_1Controller{
    async create(req, res, next) {
        try{
            const {name, price,brandId,typeId,info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product_1 = await Product_1.create({name, price,img: fileName, brandId, typeId, info})
            return res.json(product_1)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const products = await Product_1.findAll()
        return res.json(products)
    }
    async delete(req, res, next) {
        try{
            const {id} = req.params
            const product = await Product_1.findOne({where: {id}})
            const data = await product.destroy();
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async updatePrice(req, res, next) {
        try{
            const {id, price} = req.body
            console.log(price)
            const product = await Product_1.findOne({where: {id}})
            product.price = price
            const data = await product.save();
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new Product_1Controller()