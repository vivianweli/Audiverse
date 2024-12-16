const uploadController = require('../controllers/upload-now')
const express = require('express') 
const router = express.Router()
router.post('/upload-now', uploadController.uploadSound) 
module.exports = router;