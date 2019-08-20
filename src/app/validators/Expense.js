const Joi = require('joi')

const schema = {
  list: {
    query: {
      active: Joi.boolean()
    }
  },
  get: {
    params: {
      id: Joi.number()
        .integer()
        .required()
    }
  },
  post: {
    body: {
      description: Joi.string()
        .required()
        .min(3),
      payment_method_id: Joi.number()
        .integer()
        .required(),
      bank_id: Joi.number()
        .integer()
        .required(),
      purchase_date: Joi.date().required(),
      installments_number: Joi.number()
        .integer()
        .min(1),
      due_date: Joi.number()
        .min(1)
        .max(31),
      amount: Joi.number().positive(),
      shared: Joi.boolean().required(),
      status_id: Joi.number()
        .integer()
        .min(1)
        .max(3)
    }
  },
  put: {
    params: {
      id: Joi.number()
        .integer()
        .required()
    },
    body: {
      description: Joi.string()
        .required()
        .min(3),
      payment_method_id: Joi.number().integer(),
      bank_id: Joi.number().integer(),
      purchase_date: Joi.date(),
      installments_number: Joi.number()
        .integer()
        .min(1),
      due_date: Joi.number()
        .min(1)
        .max(31),
      amount: Joi.number().positive(),
      shared: Joi.boolean(),
      status_id: Joi.number()
        .integer()
        .min(1)
        .max(3)
    }
  },
  patch: {
    params: {
      id: Joi.number()
        .integer()
        .required()
    },
    body: {
      active: Joi.boolean().required()
    }
  }
}

module.exports = schema
