const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const cartServices = require('./cartServices')
const Product = require('../../mongoModels/productModel')

//addItemToCart

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.body.userId

    const productId = req.body.cartItems.productId

    const product = await Product.findById(productId)

    const userCart = await cartServices.findUser(userId)

    if (!userCart) {
      const data = {
        userId: req.body.userId,
        cartItems: [req.body.cartItems],
      }
      const cart = await cartServices.createCart(data)
      return responseUtil.successResponse(res, messageUtil.cart.cartDetails, {
        cart,
      })
    }
    if (userCart) {
      console.log('hello')
      const item = userCart.cartItems.find((item) => {
        return item.productId == productId
      })

      if (item) {
        if (item.quantity < product.stock) {
          const condition = { userId, 'cartItems.productId': productId }
          const update = {
            $set: {
              'cartItems.$': {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
                price:
                  req.body.cartItems.price *
                  (item.quantity + req.body.cartItems.quantity),
              },
            },
          }
          try {
            const cart = await cartServices.findCartAndUpdate(condition, update)

            return responseUtil.successResponse(
              res,
              messageUtil.cart.cartDetails,
              {
                cart,
              },
            )
          } catch (err) {
            return responseUtil.serverErrorResponse(res, err)
          }
        } else {
          return responseUtil.badRequestErrorResponse(
            res,
            messageUtil.cart.itemLimit,
          )
        }
      } else {
        try {
          const condition = { userId }
          const update = {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
          if (req.body.cartItems.quantity < product.stock) {
            const cart = await cartServices.findCartAndUpdate(condition, update)
            return responseUtil.successResponse(
              res,
              messageUtil.cart.cartDetails,
              {
                cart,
              },
            )
          } else {
            responseUtil.badRequestErrorResponse(
              res,
              messageUtil.cart.itemStock,
            )
          }
        } catch (err) {
          return responseUtil.serverErrorResponse(res, err)
        }
      }
    }
  } catch (err) {
    return responseUtil.serverErrorResponse(res, err)
  }
}

//increaseQuantityByOne

exports.increaseQuantitycart = async (req, res, next) => {
  try {
    console.log('hello')
    const userId = req.body.userId

    const productId = req.body.cartItems.productId

    const product = await Product.findById(productId)

    const userCart = await cartServices.findUser(userId)

    if (userCart) {
      const item = userCart.cartItems.find((item) => {
        return item.productId == productId
      })
      console.log(item)
      if (item) {
        if (item.quantity < product.stock) {
          const condition = {
            userId,
            'cartItems.productId': productId,
          }
          const update = {
            $set: {
              'cartItems.$': {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
                price:
                  req.body.cartItems.price *
                  (item.quantity + req.body.cartItems.quantity),
              },
            },
          }

          const cart = await cartServices.findCartAndUpdate(condition, update)

          return responseUtil.successResponse(
            res,
            messageUtil.cart.QuantityIncreased,

            cart,
          )
        } else {
          responseUtil.badRequestErrorResponse(res, messageUtil.cart.itemLimit)
        }
      } else {
        responseUtil.badRequestErrorResponse(
          res,
          messageUtil.cart.productNotFound,
        )
      }
    } else {
      responseUtil.badRequestErrorResponse(res, messageUtil.cart.userNotFOund)
    }
  } catch (error) {
    responseUtil.serverErrorResponse(res, error)
  }
}

//decreaseQuantitybyOne
exports.deceaseQuantitycart = async (req, res, next) => {
  try {
    const userId = req.body.userId

    const productId = req.body.cartItems.productId

    const userCart = await cartServices.findUser(userId)

    if (userCart) {
      const item = userCart.cartItems.find((item) => {
        return item.productId == productId
      })
      if (item) {
        if (item.quantity > 1) {
          const condition = {
            userId,
            'cartItems.productId': productId,
          }
          const update = {
            $set: {
              'cartItems.$': {
                ...req.body.cartItems,
                quantity: item.quantity - req.body.cartItems.quantity,
                price:
                  req.body.cartItems.price *
                  (item.quantity - req.body.cartItems.quantity),
              },
            },
          }
          const cart = await cartServices.findCartAndUpdate(condition, update)
          return responseUtil.successResponse(
            res,
            messageUtil.cart.Quantitydecreased,

            cart,
          )
        } else {
          const item = userCart.cartItems.filter((item) => {
            return item.productId != productId
          })

          const condition = { userId }
          const update = { $set: { cartItems: item } }
          const updatedCart = await cartServices.findCartAndUpdate(
            condition,
            update,
          )

          return responseUtil.successResponse(
            res,
            messageUtil.cart.Quantitydecreased,

            updatedCart,
          )
        }
      } else {
        return responseUtil.badRequestErrorResponse(
          res,
          messageUtil.cart.productNotFound,
        )
      }
    } else {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.cart.userNotFOund,
      )
    }
  } catch (error) {
    console.log(error)
  }
}

//deleteSpecific Item

exports.deleteItem = async (req, res) => {
  const userId = req.body.userId

  const productId = req.body.productId

  const userCart = await cartServices.findUser(userId)

  try {
    if (userCart) {
      if (productId) {
        const product = userCart.cartItems.find((item) => {
          return item.productId == productId
        })

        if (product) {
          const item = userCart.cartItems.filter((item) => {
            return item.productId != productId
          })

          const condition = { userId }
          const update = { $set: { cartItems: item } }
          const updatedCart = await cartServices.findCartAndUpdate(
            condition,
            update,
          )

          return responseUtil.successResponse(
            res,
            messageUtil.cart.itemDeleted,

            updatedCart,
          )
        } else {
          return responseUtil.badRequestErrorResponse(
            res,
            messageUtil.cart.productNotFound,
          )
        }
      } else {
        return responseUtil.badRequestErrorResponse(
          res,
          messageUtil.cart.invalidProductId,
        )
      }
    }
  } catch (error) {
    responseUtil.serverErrorResponse(res, error)
  }
}

//deleteCartItems,

exports.clearCart = async (req, res) => {
  try {
    const userId = req.body.userId

    const cart = await cartServices.deleteCart({ userId })
    if (cart) {
      return responseUtil.successResponse(res, messageUtil.cart.cartCleared)
    } else {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.cart.userNotFOund,
      )
    }
  } catch (error) {
    return responseUtil.serverErrorResponse(res, error)
  }
}
