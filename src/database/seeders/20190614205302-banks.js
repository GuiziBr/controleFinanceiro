'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'banks',
      [
        {
          name: 'Itau',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Santander',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('status_expense', null, {})
}
