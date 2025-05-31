const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser } = require('../controller/userController')
const { Authentication } = require('../auth/authentication')

router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/verify', Authentication)


module.exports = router