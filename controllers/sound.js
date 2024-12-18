const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/sounds.json'));
const tags = data.tags; 

exports.getSoundbyId = function (req, res, next) {
    const session = req.session; 
    const id = req.params.id; 

    fs.readFile('./data/sounds.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading audio data');
        }

        const soundsData = JSON.parse(data).sounds;

        const audio = soundsData.find(audio => audio.id == id);

        if (audio) {
            res.render('sound.ejs', {
                audio: audio,
                tags: tags, 
                userid: session.userid, 
                username: session.username,
                currentRoute: '/sound',
                login_error: false,
                signup_error: "default"
            });
        } else {

            res.status(404).send('Audio not found');
        }
    });
};
