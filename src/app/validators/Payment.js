const Joi = require('joi')

const schema = {
  get: {
    query: {
      year: Joi.number()
        .integer()
        .min(1900)
        .max(2100),
      month: Joi.number()
        .integer()
        .min(1)
        .max(12)
    },
    params: {
      id: Joi.number()
    }
  }
}

module.exports = schema
