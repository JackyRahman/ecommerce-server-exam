const express = require('express')
const routerCustomer = express.Router()
const CustomerController = require('../controllers/customerControllers')
const autenticate = require('../middlewares/autentication')
const customerAuthor = require('../middlewares/customerAuthor')
const authorizeCustomer = require('../middlewares/authorizeCustomer')


routerCustomer.post('/register',CustomerController.postRegister)

routerCustomer.use('/carts',autenticate,authorizeCustomer)
routerCustomer.get('/carts',CustomerController.getCarts)
routerCustomer.post('/carts',CustomerController.postAdd)

routerCustomer.use('/carts/:id',customerAuthor)
routerCustomer.patch('/carts/:id',CustomerController.patchCarts)
routerCustomer.delete('/carts/:id',CustomerController.deleteCarts)


module.exports = routerCustomer