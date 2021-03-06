'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'payments',
      [
        {
          expense_id: 1,
          month: 1,
          year: 2020,
          amount_paid: 10,
          amount_consumed: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          expense_id: 2,
          month: 5,
          year: 2019,
          amount_paid: 10,
          amount_consumed: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          expense_id: 3,
          month: 4,
          year: 2019,
          amount_paid: 10,
          amount_consumed: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          expense_id: 4,
          month: 5,
          year: 2019,
          amount_paid: 10,
          amount_consumed: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          expense_id: 25,
          month: 3,
          year: 2019,
          amount_paid: 10,
          amount_consumed: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          expense_id: 27,
          month: 3,
          year: 2019,
          amount_paid: 10,
          amount_consumed: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('payments', null, {})
}
