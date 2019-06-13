module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    'Expense',
    {
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      purchase_date: DataTypes.DATE,
      installments_number: DataTypes.INTEGER,
      due_date: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      shared: DataTypes.BOOLEAN
    },
    {
      tableName: 'expenses'
    }
  )

  Expense.associate = models => {
    Expense.belongsTo(models.PaymentMethod, {
      as: 'paymentMethod',
      foreignKey: 'payment_method_id'
    })
    Expense.belongsTo(models.Bank, {
      as: 'bank',
      foreignKey: 'bank_id'
    })
    Expense.belongsTo(models.StatusExpense, {
      as: 'status',
      foreignKey: 'status_id'
    })
  }

  return Expense
}
