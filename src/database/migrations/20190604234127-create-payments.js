module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
      expense_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'expenses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      month: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount_paid: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      amount_consumed: {
        allowNull: true,
        type: Sequelize.FLOAT
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
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
