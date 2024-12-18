const myMusic = require('../models/get-sounds')
const fs = require("fs");
let sounds_data = JSON.parse(fs.readFileSync('./data/sounds.json'));
const path = require("path");

exports.getProfile = function (req, res, next) {
    session = req.session;
    my_sounds = myMusic.find(session.username);
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

exports.deleteSound = function(req, res, next){
    session = req.session;

    sounds_data.sounds = myMusic.delete(req.body.audioID);
    fs.writeFileSync('./data/sounds.json', JSON.stringify(sounds_data, null, 2), () =>{
        console.log(req)
    })
    fs.unlink(path.join(__dirname, '../uploads', req.body.filePath), (err) => {
        if (err) {
            console.error('Error deleting file', err);
        } else {
            console.log('File deleted successfully');
        }
    });
    my_sounds = myMusic.find(session.username);
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
