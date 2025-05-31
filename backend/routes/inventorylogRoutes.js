const express = require('express');
const { getLogs, createLogs } = require('../controller/inventorylogController');
const router = express.Router();


router.get('/', getLogs)
router.post('/create', createLogs)

module.exports = router