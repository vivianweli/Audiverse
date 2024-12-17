const User = require('../models/user')

exports.getProfile = function (req, res, next) {
    session = req.session;
    if (req.session && req.session.userid) {
        req.session.login_error = false;
        res.render("profile.ejs", { 
            'userid': session.userid, 
            'username': session.username, 
            currentRoute: '/profile', 
            my_sounds: my_sounds,
            login_error: false,
            signup_error: "default"
        })
    } else {
        res.redirect("/")
    }
}
