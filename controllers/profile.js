const User = require('../models/user')

exports.getProfile = function (req, res, next) {
    res.render("profile.ejs", { 'userid': session.userid, error: false, errorType: "default"})
}
