const { Bank } = require('../models')

class BankController {
  async list (req, res) {
    const bankList = await Bank.findAll({ order: ['id'] })
    return res.status(200).json(bankList)
  }

  async store (req, res) {
    try {
      const result = await Bank.create(req.body)
      return res.status(201).json(result.dataValues)
    } catch (error) {
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }

  async show (req, res) {
    const bank = await Bank.findByPk(req.params.id)

    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' })
    }
    return res.status(200).json(bank)
  }

  async update (req, res) {
    try {
      const result = await Bank.update(req.body, {
        where: { id: req.params.id }
      })
      if (result[0]) {
        return res.status(200).json(req.body)
      }
      return res.status(404).json({ error: 'Bank not found' })
    } catch (error) {
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }

  async activate (req, res) {
    try {
      const result = await Bank.update(req.body, {
        where: { id: req.params.id }
      })
      if (result[0]) {
        return res.status(200).json(req.body)
      }
      return res.status(404).json({ error: 'Bank not found' })
    } catch (error) {
      const errorMessage = error.errors[0].message
      return res.status(409).json({ error: errorMessage })
    }
  }
}

module.exports = new BankController()
