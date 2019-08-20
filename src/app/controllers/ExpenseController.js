const { Expense, Bank, PaymentMethod, StatusExpense } = require('../models')

class ExpenseController {
  async list (req, res) {
    const active = req.query.hasOwnProperty('active') ? req.query.active : true
    const result = await Expense.findAll({
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
      where: { active },
      order: ['id']
    })

    return res.status(200).json(result)
  }

  async show (req, res) {
    const expense = await Expense.findByPk(req.params.id, {
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
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }
    return res.status(200).json(expense)
  }

  async store (req, res) {
    try {
      const expense = {
        ...req.body,
        purchase_date: new Date(req.body.purchase_date),
        active: true
      }
      const result = await Expense.create(expense)
      return res.status(201).json(result.dataValues)
    } catch (error) {
      if (error.parent) {
        if (error.parent.constraint.includes('bank_id')) {
          return res.status(404).json({ error: 'Bank not found' })
        } else {
          return res.status(404).json({ error: 'Payment Method not found' })
        }
      }
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }

  async update (req, res) {
    try {
      let expense = req.body

      if (expense.purchase_date) {
        expense.purchase_date = new Date(expense.purchase_date)
      }

      const result = await Expense.update(expense, {
        where: { id: req.params.id }
      })
      if (result[0]) return res.status(200).json(req.body)
      return res.status(404).json({ error: 'Expense not found' })
    } catch (error) {
      if (error.parent.constraint.includes('bank_id')) {
        return res.status(404).json({ error: 'Bank not found' })
      }
      return res.status(404).json({ error: 'Payment Method not found' })
    }
  }

  async activate (req, res) {
    try {
      const result = await Expense.update(req.body, {
        where: { id: req.params.id }
      })
      if (result[0]) return res.status(200).json(req.body)
      return res.status(404).json({ error: 'Expense not found' })
    } catch (error) {
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }
}

module.exports = new ExpenseController()
