const express = require('express');
const router = express.Router();
const getDifferenceController = require('../controllers/getDifferenceController')

router.get('/', getDifferenceController.getDifference)

module.exports = router