'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'expenses',
      [
        {
          description: 'Celular',
          active: true,
          payment_method_id: 1,
          bank_id: 1,
          purchase_date: new Date(),
          installments_number: 6,
          due_date: 10,
          amount: 100,
          shared: false,
          status_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Alura',
          active: true,
          payment_method_id: 2,
          bank_id: 2,
          purchase_date: new Date(),
          installments_number: 6,
          due_date: 8,
          amount: 50.5,
          shared: false,
          status_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('status_expense', null, {})
}
