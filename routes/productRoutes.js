'use strict'

const express = require('express')

const router = express.Router()
const multer = require('multer')

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + '_' + file.originalname)
    },
  }),
})

const { isAdminAuth, verifyAuthToken } = require('../modules/auth')
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsCat,
} = require('../modules/product/productController')

router.post(
  '/addProduct',
  upload.array('pictures'),
  verifyAuthToken,
  isAdminAuth,
  addProduct,
)
router.get('/getProduct/:id', getProduct)

router.put(
  '/updateProduct/:id',
  upload.array('pictures'),
  verifyAuthToken,
  isAdminAuth,
  updateProduct,
)
router.delete('/deleteProduct/:id', verifyAuthToken, isAdminAuth, deleteProduct)
router.get('/getProducts', getProductsCat)

module.exports = router
