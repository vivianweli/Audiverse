fs = require("fs");
const data = JSON.parse(fs.readFileSync('./data/sounds.json'));
const tags = data.tags; // Extract the "tags" array

exports.uploadSound =  function (req, res, next) {
        res.render("upload.ejs", { 'userid': session.userid, error: false, errorType: "default", currentRoute: '/upload', tags: tags});

};
