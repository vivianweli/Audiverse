/*This code declares the two routes of login and logout and 
link them to the functions we defined in our controller.
*/
const usersControllers = require('../controllers/user')
const express = require('express')
const router = express.Router()
router.post('/login', usersControllers.loginUser)
router.get('/login', usersControllers.loginUser)

router.get('/logout', usersControllers.logoutUser)
module.exports = router;