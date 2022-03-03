const { Router } = require('express')
const router = Router()
const { addWorkspace, getWorkspaces } = require('../controllers/workspace')
const { protect } = require('../middleware/auth')

router.route('/').post(protect, addWorkspace)
router.route('/').get(protect, getWorkspaces)

module.exports = router