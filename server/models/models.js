const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})
const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const CartProduct = sequelize.define('cart_product_3', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    cartId: {type: DataTypes.INTEGER}
})
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    price: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    brandId: {type: DataTypes.INTEGER, allowNull: false},
    typeId: {type: DataTypes.INTEGER, allowNull: false},
})
const Product_1 = sequelize.define('product_4', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}.type,
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    brandId: {type: DataTypes.INTEGER, allowNull: false},
    typeId: {type: DataTypes.INTEGER, allowNull: false},
    info: {type: DataTypes.STRING, allowNull: false},
})
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(CartProduct,{as: "info"})
CartProduct.belongsTo(Cart)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: "info"})
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User, Cart, CartProduct, Product, Product_1, Type, Brand, ProductInfo, TypeBrand
}