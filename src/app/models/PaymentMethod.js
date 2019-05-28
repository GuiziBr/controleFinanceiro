module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define('PaymentMethod', {
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  })
  return PaymentMethod
}
