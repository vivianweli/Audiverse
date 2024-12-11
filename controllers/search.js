var session
exports.search = function (req, res, next) {
        session = req.session
        res.render("search.ejs", { 'userid': session.userid, error: false, errorType: "default"})
}
