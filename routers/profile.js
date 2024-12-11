const profileController = require('../controllers/profile')
const express = require('express') 
const router = express.Router()
router.get('/profile', profileController.getProfile) 
module.exports = router;