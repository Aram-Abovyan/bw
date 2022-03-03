const { Router } = require('express')
const router = Router()
const { getUserData } = require('../controllers/home')
const { protect } = require('../middleware/auth')

router.route('/').get(protect, getUserData)

module.exports = router