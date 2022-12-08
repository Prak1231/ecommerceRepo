'use strict'

module.exports = {
  server: {
    serverError: 'Internal Server Error',
    validationErrors: 'Validation Errors',
    notFoundError: 'Method or URL Not Found',
    unAuthorized: 'unathorized user',
  },
  registration: {
    emailIdAlreayExists: 'Email is already in use',
    success: 'User Resgistered Successfully',
  },

  loginUser: {
    LoginFailed: 'Invalid login crendentials',
    dataNotFound: 'Please provide email id and password',
    success: 'Login Succesfull',
  },

  deleteProduct: 'product deleted...',
  deleteCategory: 'deleted successfully.....',

  cart: {
    itemDeleted: 'Item deleted..',
    cartDetails: 'Item Added SuccessFully',
    productNotFound: 'product not found',
    userNotFOund: ' No user found',
    itemLimit: 'You cant add more than 10 items',
    QuantityIncreased: 'Quantity increased by 1',
    Quantitydecreased: 'Quantity decreased by 1',
    cartCleared: 'cart deleted.....',
    invalidProductId: 'invalid ProductId',
  },
}
