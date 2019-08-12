const {
  Payment,
  Expense,
  Bank,
  PaymentMethod,
  StatusExpense
} = require('../models')
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

  async monthReport (req, res) {
    const month = req.query.month < 10 ? `0${req.query.month}` : req.query.month
    const queryDate = moment(`${req.query.year}-${month}`)
      .endOf('M')
      .format()
    console.log(queryDate)
    const expenses = await Expense.findAll({
      include: [
        {
          model: Payment,
          as: 'payments',
          attributes: [
            'amount_paid',
            'month',
            'year',
            'amount_consumed',
            'remaining_amount'
          ],
          where: {
            month,
            year: req.query.year
          }
        },
        {
          model: StatusExpense,
          as: 'status',
          attributes: ['id', 'description']
        },
        {
          model: PaymentMethod,
          as: 'paymentMethod',
          attributes: ['id', 'description', 'active']
        },
        {
          model: Bank,
          as: 'bank',
          attributes: ['id', 'name', 'active']
        }
      ],
      attributes: {
        exclude: [
          'bank_id',
          'payment_method_id',
          'status_id',
          'createdAt',
          'updatedAt'
        ]
      },
      where: {
        active: true,
        purchase_date: { [Op.lte]: queryDate }
      }
    })

    if (expenses[0]) return res.status(200).json(expenses)
    return res.status(404).json({ error: 'No expenses found' })
  }
}

module.exports = new PaymentController()
