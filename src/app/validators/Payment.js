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
  },
  getReport: {
    query: {
      year: Joi.number()
        .integer()
        .min(1900)
        .max(2100)
        .required(),
      month: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required()
    }
  }
}

module.exports = schema
