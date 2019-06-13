module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('payment_methods', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING
        },
        active: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        queryInterface.addConstraint('payment_methods', ['description'], {
          type: 'unique',
          name: 'custom_unique_contraint_description'
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payment_methods')
  }
}
