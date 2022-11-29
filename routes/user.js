'use strict'

const express = require('express')
// const { verifyToken } = require('../helper/authentication')
const router = express.Router()

const { UserRegistration, userLogin } = require('../modules/user/userAuth')
const { generateAccessTokens, isAdminAuth } = require('../modules/auth/auth')

const {
  getUsers,

  getUser,
  updateUser,
  deleteUser,
} = require('../modules/user/userController')

router.post('/create', UserRegistration)
router.post('/login', userLogin)

router.get('/getUser/:id', getUser)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

router.get('/getAlluser', isAdminAuth, getUsers)

router.post('/generateAccessToken', generateAccessTokens)

module.exports = router
