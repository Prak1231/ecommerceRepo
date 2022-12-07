const jwt = require('jsonwebtoken')
const User = require('../mongoModels/user')
const responseUtil = require('../helper/response')
const messageUtil = require('../helper/message')
const { generateAccessTokensh } = require('../helper/authentication')
const verifyAuthToken = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

      const user = await User.findById(decode.userId)

      if (!user) {
        return responseUtil.authorizationErrorResponse(
          res,
          messageUtil.server.unAuthorized,
        )
      }

      req.user = user
      next()
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return responseUtil.authorizationErrorResponse(
          res,
          messageUtil.server.unAuthorized,
        )
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({
          success: false,
          message: 'session expired try sign in!',
        })
      }

      return responseUtil.authorizationErrorResponse(
        res,
        messageUtil.server.serverError,
      )
    }
  } else {
    return responseUtil.authorizationErrorResponse(
      res,
      messageUtil.server.unAuthorized,
    )
  }
}

const generateAccessTokens = async (req, res, next) => {
  if (req.body && req.body.token) {
    const token = req.body.token

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

      const user = await User.findById(decode.userId)

      if (!user) {
        return responseUtil.authorizationErrorResponse(
          res,
          messageUtil.server.unAuthorized,
        )
      }

      const payload = {
        userId: user._id,
      }
      const accessToken = await generateAccessTokensh(payload)

      const authResponse = {}
      authResponse.accessToken = accessToken.accessToken
      authResponse.expiresIn = Number(accessToken.expiresIn)

      responseUtil.successResponse(res, authResponse)
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return responseUtil.authorizationErrorResponse(
          res,
          messageUtil.server.unAuthorized,
        )
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({
          success: false,
          message: 'sesson expired try sign in!',
        })
      }

      return responseUtil.authorizationErrorResponse(
        res,
        messageUtil.server.serverError,
      )
    }
  } else {
    return responseUtil.authorizationErrorResponse(
      res,
      messageUtil.server.unAuthorized,
    )
  }
}

const isAdminAuth = (req, res, next) => {
  verifyAuthToken(req, res, () => {
    if (req.user.role === 1) {
      next()
    } else {
      res.send('your are not admin')
    }
  })
}

module.exports = {
  verifyAuthToken,
  generateAccessTokens,
  isAdminAuth,
}
