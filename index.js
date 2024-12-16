const express = require('express'); //Import the express dependency
const path = require('path')
const expressLayouts = require('express-ejs-layouts') // Import express layouts 
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8080;                  //Save the port number where your server will be listening
const fs = require('fs')

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



/*********************************/
/************ Routes *************/
/*********************************/

const sound_data = JSON.parse(fs.readFileSync('./data/sounds.json'));
// MAIN
app.get('', (req, res) => {
    session = req.session;
    const soundsPerPage = 5;  // Number of audio items per page
    const page = parseInt(req.query.page) || 1;  // Get page number from query, default to 1

    // Calculate the starting index of the current page
    const startIndex = (page - 1) * soundsPerPage;

    // Get the sounds to display for the current page
    const paginatedSounds = sound_data.sounds.slice(startIndex, startIndex + soundsPerPage);

    // Get total number of pages
    const totalPages = Math.ceil(sound_data.sounds.length / soundsPerPage);
  
    // Check if user is logged in and render page accordingly
    if (session.userid) {
      res.render("index.ejs", {
        'userid': session.userid,
        'username': session.username,
        error: false,
        errorType: "default",
        currentRoute: '/',
        sounds: paginatedSounds,
        tags: sound_data.tags,
        currentPage: page,  // Pass current page number
        totalPages: totalPages  // Pass total pages for pagination control
      });
    } else {
      res.render("index.ejs", {
        'userid':session.userid, 
        error: false,
        errorType: "default",
        currentRoute: '/',
        sounds: paginatedSounds, 
        tags: sound_data.tags, 
        currentPage: page,  // Pass current page number
        totalPages: totalPages  // Pass total pages for pagination control
      });
    }
  });
  


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

// UPLOAD SOUND 
const uploadRoutes = require('./routers/upload');
app.use(uploadRoutes);


// // SOUND PAGE
const soundRoutes = require('./routers/sound');
app.use(soundRoutes);
/*********************************/
/******* Application start *******/
/*********************************/

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
