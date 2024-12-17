fs = require("fs");



const data = JSON.parse(fs.readFileSync('./data/sounds.json'));
const tags = data.tags; // Extract the "tags" array

exports.uploadPage =  function (req, res, next) {
    session = req.session;
    if (req.session && req.session.userid) {
<<<<<<< HEAD
<<<<<<< HEAD
        res.render("upload.ejs", { 
            'userid': session.userid, 
            'username': session.username, 
            currentRoute: '/upload', 
            tags: tags,
        });
=======
        res.render("upload.ejs", { 'userid': session.userid, 'username': session.username, error: false, errorType: "default", currentRoute: '/upload', tags: tags});
>>>>>>> parent of 6248b6b (added signup and login error)
=======
        res.render("upload.ejs", { 'userid': session.userid, 'username': session.username, error: false, errorType: "default", currentRoute: '/upload', tags: tags});
>>>>>>> parent of 6248b6b (added signup and login error)
    } else {
        res.redirect("/")
    }
};

exports.uploadNow = function (req, res, next) {
    session = req.session;

    const [city, country] = req.body.location.split(',').map(part => part.trim());
    const [filename, format] = req.file.filename.split('.');
    let sounds = JSON.parse(fs.readFileSync('./data/sounds.json'));
    sounds.sounds.push({
        "id": filename,
        "title": req.body.title,
        "filePath": req.file.filename,
        "tags": req.body.tags,
        "location": {
          "latitude": req.body.latitude,
          "longitude": req.body.longitude,
          "city": city,
          "country": country
        },
        "uploadDateTime": new Date().toISOString(),
        "uploader": req.body.uploader,
        "audioFormat": format
    })   
    fs.writeFile('./data/sounds.json', JSON.stringify(sounds, null, 2), () =>{})

    console.log(req.session)
    console.log(req.session.userid)
    if (req.session && req.session.userid) {
<<<<<<< HEAD
<<<<<<< HEAD
        res.render("upload.ejs", { 
            'userid': session.userid, 
            'username': session.username, 
            currentRoute: '/upload', 
            tags: tags,
        });
=======
        res.render("upload.ejs", { 'userid': session.userid, 'username': session.username, error: false, errorType: "default", currentRoute: '/upload', tags: tags});
>>>>>>> parent of 6248b6b (added signup and login error)
=======
        res.render("upload.ejs", { 'userid': session.userid, 'username': session.username, error: false, errorType: "default", currentRoute: '/upload', tags: tags});
>>>>>>> parent of 6248b6b (added signup and login error)
    } else {
        res.redirect("/")
    }
}