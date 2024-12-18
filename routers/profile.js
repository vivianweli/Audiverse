const profileController = require('../controllers/profile')
const express = require('express') 
const router = express.Router()
router.get('/profile', profileController.getProfile) 
router.post('/profile',profileController.deleteSound)
module.exports = router;