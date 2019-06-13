const { Expense } = require('../models')
const expenseFilterByMonth = require('../handlers/expenseFilterByMonth')

class ExpenseController {
  async list (req, res) {
    const expensesList = await Expense.findAll({
      include: [{ all: true }],
      order: ['id']
    })
    if (expensesList && Object.entries(req.query).length) {
      const expensesFilteredList = expenseFilterByMonth(expensesList, req.query)
      return res.status(200).json(expensesFilteredList)
    }
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
