const { PaymentMethod } = require('../models')

class PaymentMethodController {
  async list (req, res) {
    const paymentMethodList = await PaymentMethod.findAll({ order: ['id'] })
    return res.status(200).json(paymentMethodList)
  }

  async show (req, res) {
    const paymentMethod = await PaymentMethod.findByPk(req.params.id)
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment Method not found' })
    }
    return res.status(200).json(paymentMethod)
  }

  async store (req, res) {
    try {
      const result = await PaymentMethod.create(req.body)
      return res.status(201).json(result.dataValues)
    } catch (error) {
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }

  async update (req, res) {
    try {
      const result = await PaymentMethod.update(req.body, {
        where: { id: req.params.id }
      })
      if (result[0]) {
        return res.status(200).json(req.body)
      }
      return res.status(404).json({ error: 'Payment Method not found' })
    } catch (error) {
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }

  async activate (req, res) {
    try {
      const result = await PaymentMethod.update(req.body, {
        where: { id: req.params.id }
      })
      if (result[0]) {
        return res.status(200).json(req.body)
      }
      return res.status(404).json({ error: 'Payment Method not found' })
    } catch (error) {
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }
}

module.exports = new PaymentMethodController()
