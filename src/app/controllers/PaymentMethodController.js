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
    await PaymentMethod.create(req.body)
    return res.status(201).json(req.body)
  }

  async update (req, res) {
    const result = await PaymentMethod.update(req.body, {
      where: { id: req.params.id }
    })
    if (result[0]) {
      return res.status(200).json(req.body)
    }
    return res.status(404).json({ error: 'Payment Method not found' })
  }

  async activate (req, res) {
    const result = await PaymentMethod.update(req.body, {
      where: { id: req.params.id }
    })
    if (result[0]) {
      return res.status(200).json(req.body)
    }
    return res.status(404).json({ error: 'Payment Method not found' })
  }
}

module.exports = new PaymentMethodController()
