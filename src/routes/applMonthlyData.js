const router = require('express').Router()
const ctrl = require('../controllers/applMonthlyData')

router.get('/', ctrl.getAll)

module.exports = router
