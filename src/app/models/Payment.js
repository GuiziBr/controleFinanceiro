module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      amount_paid: DataTypes.FLOAT,
      amount_consumed: DataTypes.FLOAT
    },
    {
      tableName: 'payments'
    }
  )

  Payment.associate = models => {
    Payment.belongsTo(models.Expense, {
      as: 'expense',
      foreignKey: 'expense_id'
    })
  }

  return Payment
}
