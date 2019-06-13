module.exports = (sequelize, DataTypes) => {
  const StatusExpense = sequelize.define(
    'StatusExpense',
    {
      description: DataTypes.STRING
    },
    {
      tableName: 'status_expense'
    }
  )
  return StatusExpense
}
