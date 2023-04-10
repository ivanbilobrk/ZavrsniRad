const express = require('express');
const router = express.Router();
const testGetController = require('../controllers/testGetController')

router.get('/', testGetController.getAllForYearAndCategory)

module.exports = router