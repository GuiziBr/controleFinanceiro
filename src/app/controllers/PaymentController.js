const { Payment, Expense, Bank, PaymentMethod } = require('../models')
const { Op } = require('sequelize')

const moment = require('moment')

class PaymentController {
  async list (req, res) {
    const purchaseDate = req.query.purchase
      ? { purchase_date: { [Op.gte]: moment(req.query.purchase) } }
      : null

    let query = req.query
    if (req.query.expense) {
      query.expense_id = query.expense
      delete query.expense
    }

    delete query.purchase

    const payments = await Payment.findAll({
      include: [
        {
          model: Expense,
          as: 'expense',
          attributes: [
            'id',
            'description',
            'purchase_date',
            'due_date',
            'amount'
          ],
          where: purchaseDate,
          include: [
            {
              model: Bank,
              as: 'bank',
              attributes: ['id', 'name']
            },
            {
              model: PaymentMethod,
              as: 'paymentMethod',
              attributes: ['id', 'description']
            }
          ]
        }
      ],
      attributes: { exclude: ['expense_id'] },
      where: Object.entries(query).length === 0 ? [] : query,
      order:
        Object.entries(query).length === 0
          ? ['year', 'month', 'expense_id']
          : []
    })

    if (payments[0]) return res.status(200).json(payments)
    return res.status(404).json({ error: 'No payments found' })
  }
}

module.exports = new PaymentController()
