const Workspace = require('../models/Workspace')

exports.addWorkspace = async (req, res, next) => {
  const { name, members } = req.body
  const { user: { _id: creator} } = req

  const workspace = await Workspace.create({
    name,
    creator,
    members
  })

  res.json(workspace)
}

exports.getWorkspaces = async (req, res, next) => {
  const { user: { _id: creator} } = req
  const workspaces = await Workspace.find({creator})

  res.json(workspaces)
}