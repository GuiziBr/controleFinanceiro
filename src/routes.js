const express = require('express')

const routes = express.Router()

const UserController = require('./app/controllers/BankController')

routes.get('/banks', UserController.list)
routes.get('/banks/:id', UserController.show)
routes.post('/banks', UserController.store)
routes.put('/banks/:id', UserController.update)
routes.patch('/banks/:id', UserController.activate)

module.exports = routes
