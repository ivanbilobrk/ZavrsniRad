const express = require('express');
const router = express.Router();
const CurrentYearProgress = require('../controllers/CurrentYearProgress')

router.get('/', CurrentYearProgress.getUniCurrentYearProgress)

module.exports = router