const soundController = require('../controllers/sound')
const express = require('express') 
const router = express.Router()
router.get('/sound/:id', soundController.getSoundById) 
module.exports = router;