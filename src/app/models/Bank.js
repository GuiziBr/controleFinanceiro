module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  })
  return Bank
}
