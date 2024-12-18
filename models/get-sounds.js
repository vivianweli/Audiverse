const fs = require("fs")

module.exports = class music {
    static loadSounds = function () {
        let sounds_data = JSON.parse(fs.readFileSync('./data/sounds.json'));
        return sounds_data;
    }
    static find = function (username) {
        const soundsData = this.loadSounds(); 
        const sounds = soundsData.sounds;    
        const audio = sounds.filter(audio => audio.uploader === username);
        return audio;  

    }
    static delete = function(audioID){
        const soundsData = this.loadSounds(); 
        const sounds = soundsData.sounds;    
        const audio = sounds.filter(audio => audio.id != audioID);

        return audio;


    }
}