const Joi = require('@hapi/joi')

const schema = {
  get: {
    params: {
      id: Joi.number().required()
    }
  },
  post: {
    body: {
      name: Joi.string().required()
    }
  },
  put: {
    params: {
      id: Joi.number().required()
    },
    body: {
      name: Joi.string().required()
    }
  },
  patch: {
    params: {
      id: Joi.number().required()
    },
    body: {
      active: Joi.boolean().required()
    }
  }
}

module.exports = schema
