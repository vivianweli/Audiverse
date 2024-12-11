const visPathControllers = require('../controllers/vis-path')
const express = require('express') 
const router = express.Router()
router.get('/get-path', visPathControllers.getPath) 
module.exports = router;