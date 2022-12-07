const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const userService = require('./userService')

const {
  generateAccessTokensh,
  generateRefreshToken,
} = require('../../helper/authentication')
const auth = require('jsonwebtoken')

const { generateHash, comparePasswords } = require('../../helper/password')

//User Registration

exports.UserRegistration = async (req, res, next) => {
  try {
    const { fullName, email, passwords, role, status } = req.body

    const emailExist = await userService.isEmailExist(email)
    if (emailExist) {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.registration.emailIdAlreayExists,
      )
    }

    const hashedPassword = await generateHash(passwords)

    const data = {
      fullName,
      email,
      password: hashedPassword,
      role,
      status,
    }
    const user = await userService.registerUser(data)

    const { password, ...others } = user._doc
    return responseUtil.successResponse(
      res,
      messageUtil.registration.success,
      others,
    )
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}

//login User

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.loginUser.dataNotFound,
      )
    }

    const user = await userService.findUser(email)

    if (!user) {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.loginUser.dataNotFound,
      )
    }

    const passwordMatched = await comparePasswords(password, user.password)

    if (passwordMatched) {
      const payload = {
        userId: user._id,
      }

      console.log(payload)
      const accessToken = await generateAccessTokensh(payload)
      const refreshToken = await generateRefreshToken(payload)

      const authResponse = {}
      authResponse.accessToken = accessToken.accessToken
      authResponse.expiresIn = Number(accessToken.expiresIn)
      authResponse.refreshToken = refreshToken.refreshToken
      authResponse.refreshExpiresIn = Number(refreshToken.refreshExpiresIn)

      responseUtil.successResponse(
        res,
        messageUtil.loginUser.success,
        authResponse,
      )
    } else {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.loginUser.LoginFailed,
      )
    }
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex)
  }
}
