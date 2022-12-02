'use strict'

const Product = require('../../mongoModels/productModel')

exports.addProduct = async (data) => {
  return await Product.create(data)
}

exports.getProduct = async (id) => {
  return await Product.findOne({ _id: id })
}

exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, { $set: data }, { new: true })
}

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndRemove({ _id: id })
}

exports.getProductCat = async (cat) => {
  return await Product.find({ category: cat }).populate(
    'category',
    'catName description',
  )
}

exports.getProducts = async () => {
  return await Product.find()
}
