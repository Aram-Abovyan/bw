const Workspace = require('../models/Workspace')

exports.addWorkspace = async (req, res, next) => {
  const { name } = req.body
  const { user: { _id: creator} } = req

  const workspace = await Workspace.create({
    name,
    creator
  })

  res.json(workspace)
}

exports.getWorkspaceData = async (req, res, next) => {
  
  const workspaceData = await Workspace.findOne({_id: req.params.id})
  .populate({path: 'creator'})
  .populate('members')

  res.json({workspaceData, currentUserId: req.user.id})
}

exports.addMembers = async (req, res, next) => {
  const { workspaceId, members } = req.body
  const query = {_id: workspaceId}
  const update = {$push: {members: {$each: members}}}
  const options = {new: true}

  const workspace = await Workspace.findOneAndUpdate(query, update, options)
  .populate('members')

  res.json({success: true, members: workspace.members})
}

