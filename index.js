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

//username and password
const myusername = 'v@v.com'
const mypassword = 'v'

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
const tags = sound_data.tags; // Extract the "tags" array
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
        tags: tags
    })
    }else
      //res.sendFile('views/login.html',{root:__dirname})
      res.render("index.ejs",{
        'userid':session.userid, 
        error: false, 
        errorType: "default", 
        currentRoute: '/',
        tags: tags
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

// UPLOAD SOUND
const uploadRoutes = require('./routers/upload');
app.use(uploadRoutes);
/*********************************/
/******* Application start *******/
/*********************************/

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
