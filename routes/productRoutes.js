'use strict'

const express = require('express')

const router = express.Router()

const { verifyAuthToken } = require('../modules/auth')

const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsCat,
} = require('../modules/product/productController')

router.post('/addProduct', verifyAuthToken, addProduct)
router.get('/getProduct/:id', verifyAuthToken, getProduct)

router.put('/updateProduct/:id', verifyAuthToken, updateProduct)
router.delete('/deleteProduct/:id', verifyAuthToken, deleteProduct)
router.get('/getProducts', verifyAuthToken, getProductsCat)

module.exports = router
