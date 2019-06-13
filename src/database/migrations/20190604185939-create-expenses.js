module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('expenses', {
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
      payment_method_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'payment_methods', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bank_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'banks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      purchase_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      installments_number: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      due_date: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      shared: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'status_expense', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('expense')
  }
}
