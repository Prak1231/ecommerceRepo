'use strict'

const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const productService = require('./productService')

//create Product

exports.addProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id
    console.log(req.user.id)
    const product = await productService.addProduct(req.body)

    responseUtil.successResponse(res, messageUtil.productFetched, {
      product,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

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

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body)

    responseUtil.successResponse(res, messageUtil.productFetched, {
      product,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id)

    responseUtil.successResponse(res, messageUtil.deleteProduct)
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

exports.getProductsCat = async (req, res, next) => {
  try {
    const category = req.query.category

    let products
    if (category) {
      products = await productService.getProductCat(category)
    } else {
      products = await productService.getProducts()
    }

    const productsAvailable = `${products.length} products`
    const result = { productsAvailable, products }

    responseUtil.successResponse(res, messageUtil.usersFetched, {
      result,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}
