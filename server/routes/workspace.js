const { Router } = require('express')
const router = Router()
const { addWorkspace, getWorkspaceData, addMembers } = require('../controllers/workspace')
const { protect } = require('../middleware/auth')

router.route('/').post(protect, addWorkspace)
router.route('/:id').get(protect, getWorkspaceData)
router.route('/').put(addMembers)

module.exports = router