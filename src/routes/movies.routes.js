const { Router } = require('express')
const router = Router()

const { all, detail, add, edit, destroy } = require('../controllers/movies.controllers')
const moviesMiddlewares = require('../middlewares/movies.middlewares')

router.get('/all', all)
router.get('/detail/:id', detail)
router.post('/add', moviesMiddlewares, add)
router.put('/edit/:id', moviesMiddlewares, edit)
router.delete('/delete/:id', destroy)

module.exports = router