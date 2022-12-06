const Cart = require('../../mongoModels/cartModel')

exports.findUser = async (userId) => {
  return await Cart.findOne({ userId })
}

exports.findCartAndUpdate = async (condition, update) => {
  console.log('update services')
  return await Cart.findOneAndUpdate(condition, update, { new: true })
}

exports.createCart = async (data) => {
  return await Cart.create(data)
}
