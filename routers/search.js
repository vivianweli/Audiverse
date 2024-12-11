const searchController = require('../controllers/search')
const express = require('express') 
const router = express.Router()
router.get('/search', searchController.search) 
module.exports = router;