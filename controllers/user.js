/*This code creates two functions that handle the login and logout actions 
when the user trigger them. It first makes a declaration of the model class user 
that we defined before. In the login function, it uses this class to verify 
if the userid and password input by the user was correct or not.
*/
const User = require('../models/user')

exports.loginUser = function (req, res, next) {
    if (User.verify(req.body.userid,req.body.password)) {
        session = req.session;
        session.userid = req.body.userid;
        session.username = User.getName(req.body.userid)
        session.type = User.getType(req.body.userid)
        res.render("index.ejs", { 'userid': session.userid, error: false, errorType: "default"})
    }
    else {
        console.log(User.getName(req.body.userid)+ " do not match " + req.body.password)
        res.render("index.ejs", { 'userid': undefined, error: true, errorType: "default" })

    }
}

exports.logoutUser = function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
}