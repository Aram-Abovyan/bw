const Workspace = require('../models/Workspace')

exports.getUserData = async (req, res, next) => {
  const { user } = req

  const workspaces = await Workspace.find({
    $or: [
      {creator: user._id},
      {members: {$in: [user._id]}}
    ]
  })

  res.status(200).json({
    success: true,
    userData: {
      personalData: user,
      workspaces
    }
  })
}