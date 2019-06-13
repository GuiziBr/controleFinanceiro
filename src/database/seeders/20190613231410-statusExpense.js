'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'status_expense',
      [
        {
          description: 'Aberto',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Fechado',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Recorrente',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('status_expense', null, {})
}
