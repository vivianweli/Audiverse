/*This code creates two functions that handle the login and logout actions 
when the user trigger them. It first makes a declaration of the model class user 
that we defined before. In the login function, it uses this class to verify 
if the userid and password input by the user was correct or not.
*/
const fs = require('fs');
let User = require('../models/user');

exports.loginUser = function (req, res, next) {     
    session = req.session;
    if (User.verify(req.body.userid,req.body.password)) {
        session.userid = req.body.userid;
        session.username = User.getName(req.body.userid)
        session.type = User.getType(req.body.userid)
        console.log(session.userid)
        console.log(session.username)

        res.redirect('/')
    }
    else {
        console.log(req.body);
        console.log(User.getName(req.body.userid)+ " do not match " + req.body.password)
        req.session.login_error = true;
        res.redirect('/')

    }
}

exports.logoutUser = function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
}