const uploadController = require('../controllers/upload')
const express = require('express') 
const router = express.Router()
router.get('/upload', uploadController.uploadSound) 
module.exports = router;