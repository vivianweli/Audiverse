const fs = require("fs")

module.exports = class music {
    // Helper method to reload users
    static loadSounds = function () {
        let sounds_data = JSON.parse(fs.readFileSync('./data/sounds.json'));
        return sounds_data;
    }
    static find = function (username) {
        const soundsData = this.loadSounds(); // Call the helper method
        const sounds = soundsData.sounds;    // Access the sounds array
        const audio = sounds.filter(audio => audio.uploader === username);
        return audio;  

    }
}