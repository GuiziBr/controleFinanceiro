module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('status_expense', {
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
        queryInterface.addConstraint('status_expense', ['description'], {
          type: 'unique',
          name: 'custom_unique_constraint_description'
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('status_expense')
  }
}
