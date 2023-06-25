const { Router } = require('express')
const router = Router()

const { all, create } = require('../controllers/directors.controllers')

router.get('/all', all)
router.post('/create', create)

module.exports = router