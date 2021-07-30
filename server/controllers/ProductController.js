const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/APIError')
const {Product, ProductInfo} = require('../models/models')

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, brandId, typeId, img: fileName})
            console.log('id: '+product.id)
            if (info) {
                info = JSON.parse(info)
                info.forEach(item => {
                    ProductInfo.create({
                        title: item.title,
                        description: item.description,
                        productId: product.id
                    })
                })
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, page, limit} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        console.log(products)
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: "info"}]
            })
        return res.json(product)
    }
}

module.exports = new ProductController()