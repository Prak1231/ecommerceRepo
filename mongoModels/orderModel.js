const mongoose = require('mongoose')

const orderSchmea = new mongoose.Schema({
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
  },

  orderItems: [],
})
