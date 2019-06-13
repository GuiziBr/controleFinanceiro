const Joi = require('joi')

const schema = {
  get: {
    params: {
      id: Joi.number().required()
    }
  },
  post: {
    body: {
      description: Joi.string().required(),
      active: Joi.boolean()
    }
  },
  put: {
    params: {
      id: Joi.number().required()
    },
    body: {
      description: Joi.string().required()
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
