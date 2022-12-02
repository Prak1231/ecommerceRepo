'use strict'

const express = require('express')
const multer = require('multer')
const router = express.Router()
const {
  addCategory,
  getCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require('../modules/category/categoryController')
const { isAdminAuth, verifyAuthToken } = require('../modules/auth')

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

router.post(
  '/addCategory',
  upload.array('images'),
  verifyAuthToken,
  isAdminAuth,
  addCategory,
)
router.get('/getCategory/:id', getCategory)
// router.post('/updateCategory',  updateCategory)
router.put(
  '/updateCategory/:id',
  upload.array('pictures'),
  verifyAuthToken,
  isAdminAuth,
  updateCategory,
)

router.delete(
  '/deleteCategory/:id',
  verifyAuthToken,
  isAdminAuth,
  deleteCategory,
)

router.get('/getCategories', getAllCategories)

module.exports = router
