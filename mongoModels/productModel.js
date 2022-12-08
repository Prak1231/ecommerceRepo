'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const config = require('../config')

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        img: { type: String },
      },
    ],

    offer: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

const Product = mongoose.model('product', productSchema)
module.exports = Product
