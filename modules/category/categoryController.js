const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const categoryService = require('./categoryServices')

//create Category

exports.addCategory = async (req, res, next) => {
  try {
    let images = []
    if (req.files.length > 0) {
      images = req.files.map((file) => {
        return { img: file.filename }
      })
    }
    const { catName, description, status } = req.body
    const data = {
      catName,
      description,
      images,
      status,
    }

    const category = await categoryService.addCategory(data)

    responseUtil.successResponse(res, messageUtil.productFetched, {
      category,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

///get single category
exports.getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.findCategory(req.params.id)

    responseUtil.successResponse(res, messageUtil.productFetched, {
      category,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

//update category
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.findCategory(req.params.id)

    const oldImages = category.images
    console.log(oldImages)
    let newImages = []

    if (req.files.length > 0) {
      newImages = req.files.map((file) => {
        return { img: file.filename }
      })
    }

    console.log(newImages)

    const arr = [...oldImages, ...newImages]

    console.log(arr)

    const { catName, description, status } = req.body
    const data = {
      catName,
      description,
      images: arr,
      status,
    }

    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      data,
    )
    responseUtil.successResponse(res, messageUtil.productFetched, {
      updatedCategory,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

//delete Category

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id)

    responseUtil.successResponse(res, messageUtil.deleteCategory)
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

///getAll Categories Available

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories()

    responseUtil.successResponse(res, messageUtil.productFetched, {
      categories,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}
