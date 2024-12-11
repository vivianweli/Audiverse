exports.uploadSound = function (req, res, next) {
    res.render("upload.ejs", { 'userid': session.userid, error: false, errorType: "default", currentRoute: '/upload'})
}
