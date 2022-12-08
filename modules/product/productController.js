'use strict'

const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const productService = require('./productService')
const categoryServices = require('../category/categoryServices')

//create Product

exports.addProduct = async (req, res, next) => {
  try {
    // const file = '/uploads/' + req.file.filename

    let images = []
    if (req.files.length > 0) {
      images = req.files.map((file) => {
        return { img: file.filename }
      })
    }

    console.log(images)
    const {
      productName,
      price,
      description,
      offer,
      stock,
      category,
      status,
    } = req.body

    const data = {
      productName,
      price,
      description,
      images,
      offer,
      stock,
      category,
      status,
    }

    const product = await productService.addProduct(data)

    responseUtil.successResponse(res, messageUtil.productFetched, {
      product,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

//getProduct
exports.getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id)

    responseUtil.successResponse(res, messageUtil.productFetched, {
      product,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

//update product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id)
    console.log(product)
    const oldImages = product.images

    let newImages = []

    if (req.files.length > 0) {
      newImages = req.files.map((file) => {
        return { img: file.filename }
      })
    }

    const arr = [...oldImages, ...newImages]

    const {
      productName,
      price,
      description,
      offer,
      category,
      status,
    } = req.body

    const data = {
      productName,
      price,
      description,
      images: arr,
      offer,
      category,
      status,
    }
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      data,
    )
    responseUtil.successResponse(res, messageUtil.productFetched, {
      updatedProduct,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

//delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id)

    responseUtil.successResponse(res, messageUtil.deleteProduct)
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

//getProduct based on category

exports.getProductsCat = async (req, res, next) => {
  try {
    const categoryName = req.query.category

    const catName = new RegExp(['^', categoryName, '$'].join(''), 'i')

    if (!categoryName) {
      const products = await productService.getProducts()
      return responseUtil.successResponse(res, messageUtil.usersFetched, {
        products,
      })
    }

    const category = await categoryServices.findCategoryByname(catName)
    console.log(category)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'No category found',
      })
    }

    const cat_id = category._id.toString()

    const products = await productService.getProductCat(cat_id)

    responseUtil.successResponse(res, messageUtil.usersFetched, {
      products,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}
