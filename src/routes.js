const express = require('express')

const routes = express.Router()

const BankController = require('./app/controllers/BankController')
const PaymentMethodController = require('./app/controllers/PaymentMethodController')

routes.get('/banks', BankController.list)
routes.get('/banks/:id', BankController.show)
routes.post('/banks', BankController.store)
routes.put('/banks/:id', BankController.update)
routes.patch('/banks/:id', BankController.activate)

routes.get('/paymentMethod', PaymentMethodController.list)
routes.get('/paymentMethod/:id', PaymentMethodController.show)
routes.post('/paymentMethod', PaymentMethodController.store)
routes.put('/paymentMethod/:id', PaymentMethodController.update)
routes.patch('/paymentMethod/:id', PaymentMethodController.activate)

module.exports = routes
