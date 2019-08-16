const {
  Payment,
  Expense,
  Bank,
  PaymentMethod,
  StatusExpense
} = require('../models')
const { Op, literal } = require('sequelize')

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
    const year = req.query.year
    const queryDate = moment(`${year}-${month}`)
      .endOf('M')
      .format()

    const result = await Expense.findAll({
      raw: true,
      nest: true,
      where: {
        active: true,
        purchase_date: { [Op.lt]: queryDate },
        [Op.and]: [
          {
            [Op.or]: [
              { status_id: 1 },
              { status_id: 3 },
              {
                [Op.and]: [
                  { status_id: 2 },
                  { '$payment.month$': { [Op.gte]: month } },
                  { '$payment.year$': { [Op.gte]: year } }
                ]
              }
            ]
          }
        ]
      },
      include: [
        {
          model: Payment,
          as: 'payment',
          attributes: {
            exclude: [
              'remaining_amount',
              'createdAt',
              'updatedAt',
              'status_id',
              'expense_id'
            ],
            include: [
              [literal('amount_paid - amount_consumed'), 'remaining_amount']
            ]
          }
        },
        {
          model: PaymentMethod,
          as: 'paymentMethod',
          attributes: ['id', 'description']
        },
        {
          model: Bank,
          as: 'bank',
          attributes: ['id', 'name']
        },
        {
          model: StatusExpense,
          as: 'status',
          attributes: ['id', 'description']
        }
      ],
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'status_id',
          'payment_method_id',
          'bank_id'
        ]
      },
      order: ['id']
    })

    let expenses = []
    result.forEach(item => {
      if (
        item.payment.month === Number(month) &&
        item.payment.year === Number(year)
      ) {
        expenses.push(item)
      } else {
        const index = expenses.findIndex(expense => expense.id === item.id)
        if (index === -1) {
          delete item.payment
          expenses.push(item)
        }
      }
    })

    if (!expenses[0]) {
      return res.status(404).json({ error: 'No expenses found' })
    }
    return res.status(200).json(expenses)
  }
  async store (req, res) {
    try {
      const result = await Payment.create(req.body)
      return res.status(201).json(result.dataValues)
    } catch (error) {
      if (error.parent) {
        switch (error.parent.code) {
          case '23503':
            return res.status(404).json({ error: 'Expense not found' })
          case '23505':
            return res.status(409).json({ error: 'Payment duplicated' })
          default:
            return res.status(400).json({ error: 'Error on creating payment' })
        }
      } else return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async update (req, res) {
    try {
      console.log(req.params.id)
      const result = await Payment.update(req.body, {
        where: {
          expense_id: req.params.id,
          month: req.query.month,
          year: req.query.year
        }
      })
      if (result[0]) return res.status(200).json(req.body)
      return res.status(404).json({ error: 'Payment not found' })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new PaymentController()
