const mongoose = require('mongoose')
const { Schema } = mongoose

const WorkspaceSchema = new Schema({
  name: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const Workspace = mongoose.model('Workspace', WorkspaceSchema)

module.exports = Workspace