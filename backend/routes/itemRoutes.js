const express = require('express');
const router = express.Router();
const { getItem, getItemId, updateItem, createItem, deleteItem } = require('../controller/itemController')
const { Authentication } = require('../auth/authentication')
const upload = require('../config/upload')

router.get('/get', getItem)
router.get('/get/:id', getItemId)
router.post('/create', upload.single('file'), createItem)
router.put('/update/:id', updateItem)
router.delete('/delete/:id', deleteItem)


module.exports = router