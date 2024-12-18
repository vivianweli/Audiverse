const myMusic = require('../models/get-sounds')

exports.getProfile = function (req, res, next) {
    session = req.session;
    my_sounds = myMusic.find(session.username);
    console.log(my_sounds);
    if (req.session && req.session.userid) {
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


