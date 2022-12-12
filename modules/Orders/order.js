const orderServices = require('./orderServices')
const messageUtil = require('../../helper/message')
const responseUtil = require('../../helper/response')
const message = require('../../helper/message')

exports.createNewOrder = async (req, res) => {
  try {
    const user = req.user._id
    console.log(user)
    const { shippingAddress, shippingPrice, orderStatus } = req.body

    const usercart = await orderServices.findUserCart(user)

    if (usercart) {
      const userCarts = usercart.cartItems

      let itemsPrice = 0

      userCarts.forEach((o) => {
        itemsPrice += o.price
      })

      const totalPrice = shippingPrice + itemsPrice

      const orderdetails = {
        user,
        shippingAddress,
        orderItems: userCarts,
        itemsPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
      }

      const newOrder = await orderServices.createOrder(orderdetails)

      const deleteUserCartItems = await orderServices.findUserCartAndRemove(
        user,
      )

      return responseUtil.successResponse(
        res,
        messageUtil.order.orderPlaced,
        newOrder,
      )
    } else {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.order.addItems,
      )
    }
  } catch (error) {
    responseUtil.serverErrorResponse(res, error)
  }
}

//deleteSingleOrder

exports.deleteSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id
    if (!orderId) {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.order.orderId,
      )
    }
    const order = await orderServices.removeOrder(orderId)

    if (!order) {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.order.noOrder,
      )
    }

    return responseUtil.successResponse(res, messageUtil.order.orderDeleted)
  } catch (error) {
    return responseUtil.serverErrorResponse(res, error)
  }
}

//deleteuserorder

exports.deleteUserOders = async (req, res) => {
  try {
    const userId = req.user._id
    const order = await orderServices.deleteOrders(userId)

    if (!order) {
      return responseUtil.badRequestErrorResponse(
        req,
        messageUtil.order.noOrder,
      )
    } else {
      return responseUtil.successResponse(req, messageUtil.order.orderDeleted)
    }
  } catch (error) {
    res.send(error)
  }
}

//update order status -- Admin

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id
    const order = await orderServices.findOrder(orderId)

    if (!order) {
      return responseUtil.badRequestErrorResponse(
        res,
        messageUtil.order.noOrder,
      )
    }

    if (order.orderStatus === 'Delivered') {
      return res.send('Already Delivered')
    }

    order.orderItems.forEach(async (o) => {
      await updateStock(o.productId, o.quantity)
    })

    order.orderStatus = req.body.status

    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })
    return responseUtil.successResponse(res, messageUtil.order.delivered)
  } catch (error) {
    console.log(error)
  }
}

async function updateStock(id, quantity) {
  const product = await orderServices.findProduct(id)
  product.stock -= quantity
  await product.save({ validateBeforeSave: false })
}

///getAllOrder -Admin

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderServices.findAllOrders()

    return responseUtil.successResponse(
      res,
      messageUtil.order.allOrders,
      orders,
    )
  } catch (err) {
    responseUtil.serverErrorResponse(res, err)
  }
}
