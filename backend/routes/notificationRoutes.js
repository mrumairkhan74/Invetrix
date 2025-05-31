const express = require('express');
const router = express.Router();
const { getNotification, marksAsRead } = require('../controller/notificationController');


router.get('/', getNotification)
router.put('/:id/read', marksAsRead)





module.exports = router