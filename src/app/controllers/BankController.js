const { Bank } = require('../models')

class BankController {
  async list (req, res) {
    const bankList = await Bank.findAll()
    return res.status(200).json(bankList)
  }

  async store (req, res) {
    await Bank.create(req.body)
    return res.status(201).json(req.body)
  }

  async show (req, res) {
    const bank = await Bank.findByPk(req.params.id)
    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' })
    }
    return res.status(200).json(bank)
  }

  async update (req, res) {
    const result = await Bank.update(req.body, {
      where: { id: req.params.id }
    })
    if (result[0]) {
      return res.status(200).json(req.body)
    }
    return res.status(404).json({ error: 'Bank not found' })
  }

  async activate (req, res) {
    const result = await Bank.update(req.body, {
      where: { id: req.params.id }
    })
    if (result[0]) {
      return res.status(200).json(req.body)
    }
    return res.status(404).json({ error: 'Bank not found' })
  }
}

module.exports = new BankController()
