const myMusic = require('../models/get-sounds')

exports.getProfile = function (req, res, next) {
    session = req.session;
    let my_sounds = myMusic.find(session.username);
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
