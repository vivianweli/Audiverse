var session
exports.search = function (req, res, next) {
        session = req.session
        res.render("search.ejs", { 
            'userid': session.userid, 
            login_error: false,
            signup_error: "default",           
            currentRoute: '/search'
        })
}
