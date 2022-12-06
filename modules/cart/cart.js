const { condition } = require('sequelize')
const { update } = require('../../mongoModels/cartModel')
const Cart = require('../../mongoModels/cartModel')
const cartServices = require('./cartServices')

//addItemToCart

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id

    const productId = req.body.cartItems.productId

    const userCart = await cartServices.findUser(userId)

    if (!userCart) {
      console.log('hbhd')
      const data = {
        userId: req.user._id,
        cartItems: [req.body.cartItems],
      }
      const cart = await cartServices.createCart(data)

      return res.send(cart)
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

            return res.send(cart)
          } catch (err) {
            res.send(err)
          }
        } else {
          res.send('you can not add more than 10 items')
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

          return res.send(cart)
        } catch (err) {
          res.send(err)
        }
      }
    }
  } catch (error) {
    res.send(error)
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

          res.send(cart)
        } else {
          res.send('you cant add more than 10 items')
        }
      } else {
        res.send('no product found, please add product first')
      }
    } else {
      res.send('no user exist')
    }
  } catch (error) {
    console.log(error)
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

          return res.send(cart)
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

          res.send(updatedCart)
        }
      } else {
        res.send('no product found, please add product first')
      }
    } else {
      res.send('no user exist')
    }
  } catch (error) {
    console.log(error)
  }
}

//deleteSpecific Item

exports.deleteItem = async (req, res) => {
  const userId = req.user._id

  const productId = req.body.productId
  console.log(productId)

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

      res.send(updatedCart)
    }
  } catch (error) {
    res.send(error)
  }
}

//deleteCartItems,

exports.deleteCartItems = async (req, res) => {
  try {
    const userId = req.user._id

    const condition = { userId }
    const update = { $set: { cartItems: [] } }
    const cart = await cartServices.findCartAndUpdate(condition, update)

    res.send(cart)
  } catch (error) {
    res.send(error)
  }
}
