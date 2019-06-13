const moment = require('moment')

module.exports = query => {
  // console.log(query)
  // console.log(moment('2019-5', 'YYYY/MM').format())
  // console.log(`${query.year}-${query.month}-01`)
  const date1 = moment(`${query.year}-${query.month}`, 'YYYY-MM').format()
  const date2 = moment('2019-06-13T01:20:59.603Z', 'YYYY-MM-DD').format()

  console.log(date1 <= date2)
  return query
}
