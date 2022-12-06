const express = require('express')
const { verifyAuthToken } = require('../modules/auth')
const router = express.Router()
const {
  addToCart,
  increaseQuantitycart,
  deceaseQuantitycart,
  deleteItem,
  deleteCartItems,
} = require('../modules/cart/cart')

router.post('/addToCart', verifyAuthToken, addToCart)
router.get('/increaseQuantity1', verifyAuthToken, increaseQuantitycart)
router.post('/decreaseQuantity1', verifyAuthToken, deceaseQuantitycart)
router.post('/deleteItem', verifyAuthToken, deleteItem)
router.post('/deletewholeCartItems', verifyAuthToken, deleteCartItems)

module.exports = router
