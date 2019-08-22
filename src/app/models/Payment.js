const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.import('./Expense')
  const StatusExpense = sequelize.import('./StatusExpense')
  const Payment = sequelize.define(
    'Payment',
    {
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      amount_paid: DataTypes.FLOAT,
      amount_consumed: DataTypes.FLOAT,
      remaining_amount: {
        type: DataTypes.VIRTUAL,
        get () {
          return (
            this.getDataValue('amount_paid') -
            this.getDataValue('amount_consumed')
          )
        }
      }
    },
    {
      tableName: 'payments'
    }
  )

  Payment.removeAttribute('id')

  Payment.beforeCreate(async payment => {
    const paymentDate = moment(
      `${payment.year}-${payment.month}`,
      'YYYY-MM-DD'
    ).endOf('M')
    const {
      dataValues: { purchase_date }
    } = await Expense.findByPk(payment.expense_id)
    if (moment(paymentDate).isBefore(purchase_date)) {
      throw new Error('purchase_date')
    }
  })
  Payment.afterCreate(async payment => {
    const paymentsCount = await Payment.count({
      where: { expense_id: payment.expense_id }
    })
    const {
      dataValues: { installments_number: expenseInstallmentsNumber }
    } = await Expense.findByPk(payment.expense_id)
    if (paymentsCount === expenseInstallmentsNumber) {
      // const expense = { status_id: 2 }
      try {
        // const result = await Expense.update(
        //   { status_id: 2 },
        //   {
        //     where: { id: 1 }
        //   }
        // )
        const expenseResult = await Expense.findOne({
          include: [
            {
              model: StatusExpense,
              as: 'status',
              attributes: ['id', 'description']
            }
          ],
          where: { id: payment.expense_id }
        })
        // const result = await Expense.update(
        //   { status_id: 2 },
        //   { where: { id: 2 } }
        // )
        console.log(expenseResult)
      } catch (error) {
        return console.log(error)
      }
    }
  })

  Payment.associate = models => {
    Payment.belongsTo(models.Expense, {
      as: 'expense',
      foreignKey: 'expense_id'
    })
  }

  return Payment
}
