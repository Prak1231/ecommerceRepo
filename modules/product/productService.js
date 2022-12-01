'use strict'

const Product = require('../../mongoModels/productModel')

exports.addProduct = (data) => {
  return Product.create(data)
}

exports.getProduct = (id) => {
  return Product.findOne({ _id: id })
}

exports.updateProduct = (id, data) => {
  return Product.findByIdAndUpdate(id, { $set: data }, { new: true })
}

exports.deleteProduct = (id) => {
  return Product.findByIdAndRemove({ _id: id })
}

exports.getProductCat = (cat) => {
  return Product.find({ category: cat })
}

exports.getProducts = () => {
  return Product.find()
}
