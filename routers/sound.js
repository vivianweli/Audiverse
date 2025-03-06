const soundController = require('../controllers/sound')
const express = require('express') 
const router = express.Router()
router.get('/sound/:id', soundController.getSoundbyId) 
module.exports = router;