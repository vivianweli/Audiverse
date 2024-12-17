fs = require("fs");



const data = JSON.parse(fs.readFileSync('./data/sounds.json'));
const tags = data.tags; // Extract the "tags" array

exports.uploadPage =  function (req, res, next) {
    session = req.session;
    if (req.session && req.session.userid) {
        res.render("upload.ejs", { 
            'userid': session.userid, 
            'username': session.username, 
            currentRoute: '/upload', 
            tags: tags,
            login_error: false,
            signup_error: "default"
        });
    } else {
        res.redirect("/")
    }
};

exports.uploadNow = function (req, res, next) {
    session = req.session;
    const formData = req.body;
    const audioFile = req.file;

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
        "likes": 0,
        "duration": "Unknown",
        "audioFormat": format
    })   
    fs.writeFile('./data/sounds.json', JSON.stringify(sounds, null, 2), () =>{})

    console.log(req.session)
    console.log(req.session.userid)
    if (req.session && req.session.userid) {
        res.render("upload.ejs", { 
            'userid': session.userid, 
            'username': session.username, 
            currentRoute: '/upload', 
            tags: tags,
            login_error: false,
            signup_error: "default"
        });
    } else {
        res.redirect("/")
    }
}