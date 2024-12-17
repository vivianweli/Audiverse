const User = require('../models/user')

exports.getProfile = function (req, res, next) {
    session = req.session;
    if (req.session && req.session.userid) {
        res.render("profile.ejs", { 'userid': session.userid, 'username': session.username, error: false, errorType: "default", currentRoute: '/profile', my_sounds: my_sounds})
    } else {
        res.redirect("/")
    }
}
