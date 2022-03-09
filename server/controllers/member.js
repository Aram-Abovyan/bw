const Workspace = require('../models/Workspace')

exports.deleteMember = async (req, res, next) => {
  const { workspaceId, memberId } = req.body
  const conditions = {_id: workspaceId}
  const update = {}
  const options = {new: true}

  const workspace = await Workspace.findOne(conditions).populate('members')
  workspace.members.pull(memberId)
  await workspace.save()

  res.json(workspace.members)
}