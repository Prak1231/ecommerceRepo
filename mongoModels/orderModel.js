const mongoose = require('mongoose')

const orderSchmea = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    shippingAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
    },

    orderItems: [],

    itemsPrice: {
      type: Number,
    },

    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },

    orderStatus: {
      type: String,
      required: true,
      default: 'Processing',
    },

    deliveredAt: Date,
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.model('Order', orderSchmea)
module.exports = Order
