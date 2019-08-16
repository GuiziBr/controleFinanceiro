const express = require('express')
const routes = express.Router()
const validate = require('express-validation')
const validators = require('./app/validators')

const BankController = require('./app/controllers/BankController')
const PaymentMethodController = require('./app/controllers/PaymentMethodController')
const ExpenseController = require('./app/controllers/ExpenseController')
const PaymentController = require('./app/controllers/PaymentController')

// bank
routes.get('/banks', BankController.list)
routes.get('/banks/:id', validate(validators.Bank.get), BankController.show)
routes.post('/banks', validate(validators.Bank.post), BankController.store)
routes.put('/banks/:id', validate(validators.Bank.put), BankController.update)
routes.patch(
  '/banks/:id',
  validate(validators.Bank.patch),
  BankController.activate
)

// paymentMethod
routes.get('/paymentMethod', PaymentMethodController.list)
routes.get(
  '/paymentMethod/:id',
  validate(validators.PaymentMethod.get),
  PaymentMethodController.show
)
routes.post(
  '/paymentMethod',
  validate(validators.PaymentMethod.post),
  PaymentMethodController.store
)
routes.put(
  '/paymentMethod/:id',
  validate(validators.PaymentMethod.put),
  PaymentMethodController.update
)
routes.patch(
  '/paymentMethod/:id',
  validate(validators.PaymentMethod.patch),
  PaymentMethodController.activate
)

// expenses
routes.get('/expenses', ExpenseController.list)
routes.get(
  '/expenses/:id',
  validate(validators.Expense.get),
  ExpenseController.show
)
routes.post(
  '/expenses',
  validate(validators.Expense.post),
  ExpenseController.store
)

routes.put(
  '/expenses/:id',
  validate(validators.Expense.put),
  ExpenseController.update
)

// payments
routes.get(
  '/payments',
  validate(validators.Payment.get),
  PaymentController.list
)

routes.get(
  '/payments/monthReport',
  validate(validators.Payment.getReport),
  PaymentController.monthReport
)
routes.post(
  '/payments',
  validate(validators.Payment.post),
  PaymentController.store
)

routes.put(
  '/payments/:id',
  validate(validators.Payment.put),
  PaymentController.update
)

module.exports = routes
