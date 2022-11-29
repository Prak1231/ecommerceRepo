'use strict'

const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const userService = require('./userService')

exports.getUser = async (req, res, next) => {
  try {
    const mongoUserData = await userService.getUser(req.params.id)

    responseUtil.successResponse(res, messageUtil.usersFetched, {
      mongoUserData,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const mongoUserData = await userService.updateUser(req.params.id, req.body)

    responseUtil.successResponse(res, messageUtil.usersFetched, {
      mongoUserData,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const mongoUserData = await userService.deleteUser(req.params.id)

    responseUtil.successResponse(res, messageUtil.deleteUser)
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    // const mysqlUserData = await userService.getUsersFromMysql();
    const mongoUserData = await userService.getUsersFromMongo()

    responseUtil.successResponse(res, messageUtil.usersFetched, {
      mongoUserData,
    })
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}
