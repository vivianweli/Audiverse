const express = require('express'); //Import the express dependency
const path = require('path')
const expressLayouts = require('express-ejs-layouts') // Import express layouts 
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8080;                  //Save the port number where your server will be listening
const fs = require('fs')
const multer = require('multer');

/*********************************/
/** DEFINITIONS TO USE SESSIONS **/
/*********************************/
// Declare sessions
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// a variable to save a session
var session;

// to make session user variable available everywhere
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});



/*********************************/
/*********** USING FILES *********/
/*********************************/
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// Adding css and js files from installed apps
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/leaflet/dist')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/leaflet/dist')))



/*********************************/
/** TEMPLATE ENGINES AND LAYOUTS */
/*********************************/

// This requires a folder called views
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/base-layout.ejs')


// Set up multer to store files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
    },
  });
  
  const upload = multer({ storage: storage });

/*********************************/
/************ Routes *************/
/*********************************/

const sound_data = JSON.parse(fs.readFileSync('./data/sounds.json'));
// MAIN
app.get('', (req, res) => {
  session=req.session;
    if(session.userid){
      res.render("index.ejs", {
        'userid':session.userid, 
        'username': session.username, 
        error: false, 
        errorType: "default", 
        currentRoute: '/', 
        sounds: sound_data
    })
    }else
      //res.sendFile('views/login.html',{root:__dirname})
      res.render("index.ejs",{
        'userid':session.userid, 
        error: false, 
        errorType: "default", 
        currentRoute: '/',
        sounds: sound_data
    })

})


const searchRoutes = require('./routers/search');
app.use(searchRoutes);

// SIGN UP
const addUserRoutes = require('./routers/sign-up');
app.use(addUserRoutes);

// LOGIN
const userRoutes = require('./routers/user');
app.use(userRoutes);

// PROFILE
const profileRoutes = require('./routers/profile');
app.use(profileRoutes);

// UPLOAD SOUND PAGE
const uploadRoutes = require('./routers/upload');
app.use(uploadRoutes);

// Handle file uploads with POST method on '/upload-now'
app.post('/upload-now', upload.single('audio'), (req, res) => {
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
    fs.writeFile('./data/sounds.json', JSON.stringify(sounds, null, 2), () =>{
        console.log(req)
        })

    // After handling the upload, redirect the user back to the homepage
    res.redirect('/upload');
});

// // SOUND PAGE
// const soundRoutes = require('./routers/sound');
// app.use(soundRoutes);
/*********************************/
/******* Application start *******/
/*********************************/

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
