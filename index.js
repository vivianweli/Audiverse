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
    
    // Number of items per page
    const soundsPerPage = 5;
    
    // Get current page number from query, default to 1 if not present
    const page = parseInt(req.query.page) || 1;
    
    // Get the tag filter from the query string, default to 'all' if not present
    const selectedTag = req.query.tag || 'all';
    
    // Filter the sounds based on the selected tag
    let filteredSounds = sound_data.sounds;
  
    if (selectedTag !== 'all') {
      filteredSounds = sound_data.sounds.filter(audio => {
        let audioTags = Array.isArray(audio.tags) ? audio.tags : (audio.tags ? audio.tags.split(',').map(tag => tag.trim()) : []);
        return audioTags.includes(selectedTag);
      });
    }
  
    // Calculate the starting index of the current page
    const startIndex = (page - 1) * soundsPerPage;
  
    // Get the sounds to display for the current page
    const paginatedSounds = filteredSounds.slice(startIndex, startIndex + soundsPerPage);
  
    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredSounds.length / soundsPerPage);
  
    // Render the page with the paginated and filtered sounds
    if (session.userid) {
      res.render("index.ejs", {
        'userid': session.userid,
        'username': session.username,
        error: false,
        errorType: "default",
        currentRoute: '/',
        sounds: paginatedSounds,  // Pass the paginated sounds
        currentPage: page,        // Pass the current page number
        totalPages: totalPages,   // Pass the total number of pages
        selectedTag: selectedTag, // Pass the selected tag to the frontend
        tags: sound_data.tags     // Pass the list of all tags
      });
    } else {
      res.render("index.ejs", {
        'userid': session.userid,  // No user if not logged in
        error: false,
        errorType: "default",
        currentRoute: '/',
        sounds: paginatedSounds,  // Pass the paginated sounds
        currentPage: page,        // Pass the current page number
        totalPages: totalPages,   // Pass the total number of pages
        selectedTag: selectedTag, // Pass the selected tag to the frontend
        tags: sound_data.tags     // Pass the list of all tags
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
