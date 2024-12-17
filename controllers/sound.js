const fs = require('fs');

// Read and parse the sounds.json file once, and extract tags for reuse
const data = JSON.parse(fs.readFileSync('./data/sounds.json'));
const tags = data.tags; // Extract the "tags" array

// Export the function to get the sound by ID
exports.getSoundbyId = function (req, res, next) {
    const session = req.session; // Access session
    const id = req.params.id; // Get the ID from the route params

    // Read the sounds.json file asynchronously
    fs.readFile('./data/sounds.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading audio data');
        }

        // Parse the sounds data (assuming the file is an array of sounds)
        const soundsData = JSON.parse(data).sounds;

        // Find the audio item with the matching ID
        const audio = soundsData.find(audio => audio.id == id);

        if (audio) {
            // Render the page and pass the audio data to the EJS template
            res.render('sound.ejs', {
                audio: audio,
                tags: tags, // Pass the tags to the view
                userid: session.userid, // Pass the logged-in user ID
                username: session.username, // Pass the logged-in username (if needed)
                currentRoute: '/sound',
                login_error: false,
                signup_error: "default"
            });
        } else {
            // If no audio is found, send a 404 response
            res.status(404).send('Audio not found');
        }
    });
};
