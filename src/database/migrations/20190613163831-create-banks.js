module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('banks', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          unique: true,
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
        queryInterface.addConstraint('banks', ['name'], {
          type: 'unique',
          name: 'custom_unique_constraint_name'
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('banks')
  }
}
