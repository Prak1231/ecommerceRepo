const mongoose = require('mongoose')
const Schema = mongoose.Schema

const config = require('../config')
const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: 'true',
        },

        quantity: {
          type: Number,
        },
        price: { type: Number, required: true },
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
