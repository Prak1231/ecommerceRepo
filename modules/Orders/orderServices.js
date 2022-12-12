const Order = require('../../mongoModels/orderModel')
const Cart = require('../../mongoModels/cartModel')
const Product = require('../../mongoModels/productModel')

exports.findUserCart = async (user) => {
  return await Cart.findOne({ userId: user })
}

exports.createOrder = async (orderdetails) => {
  return await Order.create(orderdetails)
}

exports.findUserCartAndRemove = async (user) => {
  return await Cart.findOneAndRemove({ userId: user })
}

exports.removeOrder = async (orderId) => {
  return await Order.findOneAndRemove({ _id: orderId })
}

exports.deleteOrders = async (userId) => {
  return await Order.deleteMany({ user: userId })
}

exports.findOrder = async (orderId) => {
  return await Order.findById(orderId)
}

exports.findProduct = async (id) => {
  return await Product.findById(id)
}

exports.findAllOrders = async () => {
  return await Order.find()
}
