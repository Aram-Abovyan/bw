const User = require('../models/User')

exports.searchUsers = async (req, res, next) => {
  const { text } = req.body

  const users = await User.find({username: {$regex: text, $options: 'i'}})

  res.json(users)
}