const Cart = require('../../mongoModels/cartModel')

//addItemToCart
exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id

    const productId = req.body.cartItems.productId

    const userCart = await Cart.findOne({ userId })

    // console.log(userCart.cartItems)

    if (userCart) {
      const item = userCart.cartItems.find((item) => {
        return item.productId == productId
      })

      if (item) {
        if (item.quantity < 10) {
          try {
            const cart = await Cart.findOneAndUpdate(
              {
                userId,
                'cartItems.productId': productId,
              },
              {
                $set: {
                  'cartItems.$': {
                    ...req.body.cartItems,
                    quantity: item.quantity + req.body.cartItems.quantity,
                    price:
                      req.body.cartItems.price *
                      (item.quantity + req.body.cartItems.quantity),
                  },
                },
              },
              { new: true },
            )

            return res.send(cart)
          } catch (err) {
            res.send(err)
          }
        } else {
          res.send('you can not add more than 10 items')
        }
      } else {
        try {
          const cart = await Cart.findOneAndUpdate(
            { userId },
            {
              $push: {
                cartItems: req.body.cartItems,
              },
            },
            { new: true },
          )
          return res.send(cart)
        } catch (err) {
          res.send(err)
        }
      }
    } else {
      const data = {
        userId: req.user._id,
        cartItems: [req.body.cartItems],
      }
      const cart = await Cart.create(data)
      return res.send(cart)
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

    const userCart = await Cart.findOne({ userId })

    if (userCart) {
      const item = userCart.cartItems.find((item) => {
        return item.productId == productId
      })
      if (item) {
        if (item.quantity < 10) {
          const cart = await Cart.findOneAndUpdate(
            {
              userId,
              'cartItems.productId': productId,
            },
            {
              $set: {
                'cartItems.$': {
                  ...req.body.cartItems,
                  quantity: item.quantity + req.body.cartItems.quantity,
                  price:
                    req.body.cartItems.price *
                    (item.quantity + req.body.cartItems.quantity),
                },
              },
            },
            { new: true },
          )

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

    const userCart = await Cart.findOne({ userId })

    if (userCart) {
      const item = userCart.cartItems.find((item) => {
        return item.productId == productId
      })
      if (item) {
        if (item.quantity > 1) {
          const cart = await Cart.findOneAndUpdate(
            {
              userId,
              'cartItems.productId': productId,
            },
            {
              $set: {
                'cartItems.$': {
                  ...req.body.cartItems,
                  quantity: item.quantity - req.body.cartItems.quantity,
                  price:
                    req.body.cartItems.price *
                    (item.quantity - req.body.cartItems.quantity),
                },
              },
            },
            { new: true },
          )

          return res.send(cart)
        } else {
          const item = userCart.cartItems.filter((item) => {
            return item.productId != productId
          })

          const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $set: { cartItems: item } },
            { new: true },
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

  const userCart = await Cart.findOne({ userId })

  if (userCart) {
    const item = userCart.cartItems.filter((item) => {
      return item.productId != productId
    })

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { cartItems: item } },
      { new: true },
    )

    res.send(updatedCart)
  }
}

//deleteCartItems,

exports.deleteCartItems = async (req, res) => {
  const userId = req.user._id

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { cartItems: [] } },
    { new: true },
  )

  res.send(cart)
}
