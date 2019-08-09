module.exports = (sequelize, DataTypes) => {
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

  Payment.associate = models => {
    Payment.belongsTo(models.Expense, {
      as: 'expense',
      foreignKey: 'expense_id'
    })
  }

  return Payment
}
