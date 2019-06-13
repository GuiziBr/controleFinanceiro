const { Payment } = require('../models')

class PaymentController {
  async showByExpense (req, res) {
    const payments = await Payment.findAll({
      where: { expense_id: req.params.id }
    })

    if (payments[0]) return res.status(200).json(payments)
    return res.status(404).json({ error: 'No payment found' })
  }
}

module.exports = new PaymentController()
