const User = require('../models/User')
const ErrorResponse = require('../utils/errrorResponse')
const { validationResult } = require('express-validator')

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors)
  }

  try {
    const user = await User.create({
      username,
      email,
      password
    })

    sendToken(user, 201, res)
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors)
  }

  try {
    const user = await User.findOne({email}).select('+password')

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Wrong password', 401))
    }

    sendToken(user, 200, res)
  } catch (error) {
    next(error)
  }

}

exports.forgotPassword = async (req, res, next) => {
  // const { email } = req.body

  // try {
  //   const user = await User.findOne({email})

  //   if (!user) {
  //     return next(new ErrorResponse('Email could not be sent', 404))
  //   }

  //   const resetToken = user.getResetPasswordToken()

  //   await user.save()

  //   const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`

  //   const message = `
  //     <h1>Reset password</h1>
  //     <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  //   `
  // } catch (error) {
    
  // }

}

exports.resetPassword = (req, res, next) => {
  res.send('reset password route')
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({
    success: true,
    token
  })
}