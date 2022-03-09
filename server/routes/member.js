const { Router } = require('express')
const router = Router()
const { deleteMember } = require('../controllers/member')

router.route('/').put(deleteMember)

module.exports = router