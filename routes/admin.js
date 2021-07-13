const express = require('express')
const routerAdmin = express.Router()
const AdminController = require('../controllers/adminControllers')
const autenticate = require('../middlewares/autentication')
const adminAuthor = require('../middlewares/adminAuthor')

routerAdmin.post('/login',AdminController.postLogin)
routerAdmin.get('/products/:id',AdminController.getProductsById)

routerAdmin.use('/products',autenticate,adminAuthor)
routerAdmin.post('/products',AdminController.postAdd)
routerAdmin.put('/products/:id',AdminController.putProducts)
routerAdmin.patch('/products/:id',AdminController.patchProducts)
routerAdmin.delete('/products/:id',AdminController.deleteProducts)


module.exports = routerAdmin