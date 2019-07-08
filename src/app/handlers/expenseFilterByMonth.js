const moment = require('moment')

module.exports = (expensesList, query) => {
  // let filteredExpenses = []
  const queryDate = moment(`${query.year}-${query.month}`, 'YYYY-MM').format()

  // const date1 = moment(`${query.year}-${query.month}`, 'YYYY-MM').format()
  // const date2 = moment('2019-06-13T01:20:59.603Z', 'YYYY-MM-DD').format()

  return queryDate
}
