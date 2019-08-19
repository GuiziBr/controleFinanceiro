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
  },
  post: {
    body: {
      expense_id: Joi.number()
        .integer()
        .required(),
      month: Joi.number()
        .min(1)
        .max(12)
        .integer()
        .required(),
      year: Joi.number()
        .min(1900)
        .max(2100)
        .integer()
        .required(),
      amount_paid: Joi.number()
        .positive()
        .required(),
      amount_consumed: Joi.number().positive()
    }
  },
  put: {
    params: {
      id: Joi.number()
        .integer()
        .required()
    },
    query: {
      month: Joi.number()
        .min(1)
        .max(12)
        .integer()
        .required(),
      year: Joi.number()
        .min(1900)
        .max(2100)
        .integer()
        .required()
    },
    body: {
      amount_paid: Joi.number().positive(),
      amount_consumed: Joi.number().positive()
    }
  },
  delete: {
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
