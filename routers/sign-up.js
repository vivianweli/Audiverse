/*This code declares the two routes of login and logout and 
link them to the functions we defined in our controller.
*/
const addUserController = require('../controllers/sign-up')
const express = require('express')
const router = express.Router()
router.post('/signup', addUserController.addUser)
module.exports = router;