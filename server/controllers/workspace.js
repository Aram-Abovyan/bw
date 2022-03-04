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

exports.getWorkspaceData = async (req, res, next) => {
  
  const workspaceData = await Workspace.findOne({_id: req.params.id})
  .populate({path: 'creator'})
  .populate('members')


  res.json({workspaceData, currentUserId: req.params.id})
}