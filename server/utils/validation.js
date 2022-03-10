const {body, checkSchema, validationResult} = require('express-validator')
const User = require('../models/User')

const loginSchema = {
  email: {
    notEmpty: true,
    isEmail: true,
    normalizeEmail: true,
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {min: 6},
      errorMessage: 'more then 5 chars'
    }
  },
}

const registerSchema = {
  username: {
    notEmpty: true,
    isLength: {
      options: {min: 3},
      errorMessage: 'more then 2 chars'
    }
  },
  email: {
    notEmpty: true,
    isEmail: true,
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {min: 6},
      errorMessage: 'more then 5 chars'
    },
  },
  confirmPassword: {
    custom: {
      options(val, { req }) {
        if (val !== req.body.password) {
          throw new Error('Password confirmation does not match password')
        }
        return true
      }
    }
  },
}

module.exports = {
  loginSchema,
  registerSchema
}