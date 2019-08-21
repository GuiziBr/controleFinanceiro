module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.import('./Expense')
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

  Payment.afterCreate(async payment => {
    const paymentsCount = await Payment.count({
      where: { expense_id: payment.expense_id }
    })
    const {
      dataValues: { installments_number: expenseInstallmentsNumber }
    } = await Expense.findByPk(payment.expense_id, {
      attributes: ['installments_number']
    })
    if (paymentsCount === expenseInstallmentsNumber) {
      // const expense = { status_id: 2 }
      try {
        const result = await Expense.update(
          { status_id: 2 },
          {
            where: { id: 1 }
          }
        )
        console.log(result)
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
