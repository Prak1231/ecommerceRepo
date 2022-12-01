'use strict'

const jwt = require('jsonwebtoken')

/**
 * @param {*} payload
 * @description To create access token with payload
 */
async function generateAccessToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  })
  return {
    accessToken: token,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  }
}

/**
 * @param {*} payload
 * @description To refresh access token with payload
 */
async function generateRefreshToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  })
  return {
    refreshToken: token,
    refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  }
}

/**
 * @param jwtString
 * @param secretOrPublicKey
 * @description To verify access or refresh token
 */
async function verifyAuthToken(jwtString, secretOrPublicKey) {
  return jwt.verify(jwtString, secretOrPublicKey)
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAuthToken,
}
