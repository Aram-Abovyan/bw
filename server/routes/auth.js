const express = require('express')
const router = express.Router()
const { register, login, forgotPassword, resetPassword } = require('../controllers/auth')
const { loginSchema, registerSchema } = require('../utils/validation')
const { checkSchema } = require('express-validator')

router.route('/register').post(checkSchema(registerSchema), register)

router.route('/login').post(checkSchema(loginSchema), login)

// router.route('/forgotpassword').post(forgotPassword)

// router.route('/resetpassword/:resetToken').put(resetPassword)

module.exports = router