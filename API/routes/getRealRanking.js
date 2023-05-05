const express = require('express');
const router = express.Router();
const getRealRanking = require('../controllers/getRealRankingUni')

router.get('/', getRealRanking.getRealRankingForYearUniCategory)

module.exports = router