const express = require('express');
const router = express.Router();
const testGetController = require('../controllers/RankingYearUniController')

router.get('/', testGetController.getRankingForYearUniCategory)

module.exports = router