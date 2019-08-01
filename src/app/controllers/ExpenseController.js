const { Expense, Bank, PaymentMethod, StatusExpense } = require('../models')

class ExpenseController {
  async list (req, res) {
    const expensesList = await Expense.findAll({
      include: [
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
      attributes: { exclude: ['bank_id', 'payment_method_id', 'status_id'] },
      order: ['id']
    })
    return res.status(200).json(expensesList)
  }

  async show (req, res) {
    const expense = await Expense.findByPk(req.params.id)
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }
    return res.status(200).json(expense)
  }

  async store (req, res) {
    await Expense.create(req.body)
    return res.status(201).json(req.body)
  }

  async update (req, res) {
    const result = await Expense.update(req.body, {
      where: { id: req.params.id }
    })
    if (result[0]) {
      return res.status(200).json(req.body)
    }
    return res.status(404).json({ error: 'Expense not found' })
  }

  async activate (req, res) {
    const result = await Expense.update(req.body, {
      where: { id: req.params.id }
    })
    if (result[0]) {
      return res.status(200).json(req.body)
    }
    return res.status(404).json({ error: 'Expense not found' })
  }
}

module.exports = new ExpenseController()
