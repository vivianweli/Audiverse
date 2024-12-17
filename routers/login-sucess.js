/*This code declares the two routes of login and logout and 
link them to the functions we defined in our controller.
*/
const loginSucessController = require('../controllers/login-success')
const express = require('express')
const router = express.Router()
router.get('/login', loginSucessController.show)
module.exports = router;