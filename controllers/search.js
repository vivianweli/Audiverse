const mySound = require('../models/get-sounds')

exports.search = function (req, res, next) {
        session = req.session;
        let searchResult = mySound.search(req.query.search);
        console.log(searchResult);
        res.render("search.ejs", { 
            'userid': session.userid, 
            currentRoute: '/search',
            login_error: false,
            signup_error: "default",
            query: req.query.search,
            searchedSounds: searchResult
        })
}
