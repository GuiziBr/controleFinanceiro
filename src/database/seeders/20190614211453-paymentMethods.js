'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'payment_methods',
      [
        {
          description: 'Débito Automático',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Dinheiro',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Débito em Conta',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('status_expense', null, {})
}
