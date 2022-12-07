const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const cartServices = require('./cartServices')

//addItemToCart

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id

    const productId = req.body.cartItems.productId

    const userCart = await cartServices.findUser(userId)

    if (!userCart) {
      const data = {
        userId: req.user._id,
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
        if (item.quantity < 10) {
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
      }
    }
  } catch (err) {
    return responseUtil.serverErrorResponse(res, err)
  }
}

//increaseQuantityByOne

exports.increaseQuantitycart = async (req, res, next) => {
  try {
    const userId = req.user._id

    const productId = req.body.cartItems.productId

    const userCart = await cartServices.findUser(userId)

    if (userCart) {
      const item = userCart.cartItems.find((item) => {
        return item.productId == productId
      })
      if (item) {
        if (item.quantity < 10) {
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
        responseUtil.notFoundErrorResponse(
          res,
          messageUtil.cart.productNotFound,
        )
      }
    } else {
      responseUtil.notFoundErrorResponse(res, messageUtil.cart.userNotFOund)
    }
  } catch (error) {
    responseUtil.serverErrorResponse(res, error)
  }
}

//decreaseQuantitybyOne
exports.deceaseQuantitycart = async (req, res, next) => {
  try {
    const userId = req.user._id

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
            messageUtil.cart.QuantityIncreased,

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
        return responseUtil.notFoundErrorResponse(
          res,
          messageUtil.cart.productNotFound,
        )
      }
    } else {
      return responseUtil.notFoundErrorResponse(
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
  const userId = req.user._id

  const productId = req.body.productId

  const userCart = await cartServices.findUser(userId)

  try {
    if (userCart) {
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
    }
  } catch (error) {
    responseUtil.serverErrorResponse(res, error)
  }
}

//deleteCartItems,

exports.deleteCartItems = async (req, res) => {
  try {
    const userId = req.user._id

    const condition = { userId }
    const update = { $set: { cartItems: [] } }
    const cart = await cartServices.findCartAndUpdate(condition, update)

    return responseUtil.successResponse(
      res,
      messageUtil.cart.cartCleared,

      cart,
    )
  } catch (error) {
    return responseUtil.serverErrorResponse(res, error)
  }
}
