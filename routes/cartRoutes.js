const express = require('express')
const router = express.Router()
const {
  addToCart,
  increaseQuantitycart,
  deceaseQuantitycart,
  deleteItem,
  clearCart,
} = require('../modules/cart/cart')

router.post('/addToCart', addToCart)
router.post('/increaseQuantity', increaseQuantitycart)
router.post('/decreaseQuantity1', deceaseQuantitycart)
router.post('/deleteItem', deleteItem)
router.post('/clearCart', clearCart)

module.exports = router
