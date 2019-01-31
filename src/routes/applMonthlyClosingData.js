const router = require('express').Router()
const ctrl = require('../controllers/applMonthlyClosingData')

router.get('/', ctrl.getAll)
router.get('/:date', ctrl.getDate)

module.exports = router
