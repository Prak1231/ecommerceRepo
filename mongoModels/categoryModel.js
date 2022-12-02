'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const config = require('../config')

const categorySchema = new Schema(
  {
    catName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        img: {
          type: String,
        },
      },
    ],

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

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
