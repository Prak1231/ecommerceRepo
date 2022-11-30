'use strict'

const User = require('../../mongoModels/user')

exports.isEmailExist = async (email) => {
  return await User.findOne({ email: email })
}

exports.registerUser = (data) => {
  return User.create(data)
}

exports.findUser = async (email) => {
  return await User.findOne({ email: email })
}
exports.getUsersFromMongo = () => {
  return User.find().select('-password')
}

exports.getUser = (id) => {
  return User.findOne({ _id: id }).select('-password')
}

exports.updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, { $set: data }, { new: true })
}

exports.deleteUser = (id) => {
  return User.findByIdAndRemove({ _id: id })
}
