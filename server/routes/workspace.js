const { Router } = require('express')
const router = Router()
const { addWorkspace, getWorkspaceData } = require('../controllers/workspace')
const { protect } = require('../middleware/auth')

router.route('/').post(protect, addWorkspace)
router.route('/:id').get(protect, getWorkspaceData)

module.exports = router