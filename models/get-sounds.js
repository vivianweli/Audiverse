const fs = require("fs")

module.exports = class MyMusic {
    static loadSounds = function () {
            let sound_data = fs.readFileSync('./data/sounds.json');
            return sound_data;
        }
    static find = function (username) {
        let sound_data = this.loadSounds();
        let my_music = [];
        const sounds = JSON.parse(sound_data).sounds;
    
        const userAudios = sounds.filter(audio => audio.uploader === username);
        return userAudios; 
 
    }  
}
