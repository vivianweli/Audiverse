const myMusic = require('../models/get-sounds')

exports.getProfile = function (req, res, next) {
    session = req.session;
    let my_sounds = myMusic.find(session.username);
    if (req.session && req.session.userid) {
        res.render("profile.ejs", { 'userid': session.userid, 'username': session.username, error: false, errorType: "default", currentRoute: '/profile', my_sounds: my_sounds})
    } else {
        res.redirect("/")
    }
}
