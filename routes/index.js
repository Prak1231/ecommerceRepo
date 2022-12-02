'use strict'

const express = require('express')
const router = express.Router()

const data = require('../modules/data')
const user = require('./user')
const product = require('./productRoutes')
const category = require('./categoryRoutes')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/get_data', data.getData)
router.post('/get_data', data.getData)

router.use('/user', user)
router.use('/product', product)
router.use('/category', category)

module.exports = router
