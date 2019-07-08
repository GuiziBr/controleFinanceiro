const Joi = require('joi')

const schema = {
  list: {
    query: {
      month: Joi.number()
        .integer()
        .min(1)
        .max(12),
      year: Joi.number()
        .integer()
        .min(2000)
        .max(2100)
    }
  },
  get: {
    params: {
      id: Joi.number().required()
    }
  }
}

module.exports = schema
