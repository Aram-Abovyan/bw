const { Router } = require('express')
const router = Router()

const { searchUsers } = require('../controllers/search')

router.route('/users').post(searchUsers)

module.exports = router