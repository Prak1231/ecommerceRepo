const express = require('express')
const {
  createNewOrder,
  deleteSingleOrder,
  deleteUserOders,
  updateOrderStatus,
} = require('../modules/Orders/order')
const { isAdminAuth, verifyAuthToken } = require('../modules/auth')

const router = express.Router()

router.post('/newOrder', verifyAuthToken, createNewOrder)
router.post('/cancelOrder/:id', verifyAuthToken, deleteSingleOrder)
router.post('/cancelUserOrder', verifyAuthToken, deleteUserOders)
router.post(
  '/updateOrderStatus/:id',
  verifyAuthToken,
  isAdminAuth,
  updateOrderStatus,
)

module.exports = router
