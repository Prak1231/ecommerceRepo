const Category = require('../../mongoModels/categoryModel')

exports.addCategory = async (data) => {
  return await Category.create(data)
}

exports.findCategory = async (id) => {
  return await Category.findOne({ _id: id })
}

exports.deleteCategory = async (id) => {
  return await Category.findOneAndRemove({ _id: id })
}

exports.findCategoryByname = async (catName) => {
  return await Category.findOne({ catName })
}

exports.getCategories = async () => {
  return await Category.find()
}

exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, { $set: data }, { new: true })
}
