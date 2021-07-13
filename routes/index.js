const express = require('express')
const router = express.Router()
const routerAdmin = require('./admin')
const routerCustomer = require('./customer')
const CustomerController = require ('../controllers/customerControllers')
const AdminController = require ('../controllers/adminControllers')

router.post('/login',CustomerController.postLogin)
router.get('/products',AdminController.getProducts)
router.use(routerAdmin)
router.use(routerCustomer)

module.exports = router