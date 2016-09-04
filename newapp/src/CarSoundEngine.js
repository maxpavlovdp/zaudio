var acceleration = require("./sound/acceleration.ogg");
var engineOn = require("./sound/engineOn.ogg");

class CarSoundEngine {

    constructor() {
        if(!('webAudioContext' in CarSoundEngine && CarSoundEngine.webAudioContext instanceof AudioContext)) {
            CarSoundEngine.webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        }
    }
    init() {
        this.gainNode = CarSoundEngine.webAudioContext.createGain();
        this.gainNode.connect(CarSoundEngine.webAudioContext.destination);
        this.gainNode.gain.value = 1;

        return new Promise((resolve, reject) => {
            this.loadSounds().then(soundsBuffer => {
                this.soundsBuffer = soundsBuffer;
                resolve(this);
            });
        });
    }

    createSound(buffer, loop, onended){
        let audioSource = CarSoundEngine.webAudioContext.createBufferSource();
        audioSource.buffer = buffer;
        audioSource.playbackRate.value = 1;
        audioSource.loop = loop;
        audioSource.connect(this.gainNode);
        audioSource.onended = onended;
        return audioSource;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.sounds = {};
            this.sounds.main = this.createSound(this.soundsBuffer.main, true);
            this.sounds.engineOn = this.createSound(this.soundsBuffer.engineOn, false, () => {
                this.sounds.main.start();
                resolve();
            });
            this.sounds.engineOn.start();
        });
    }

    stop() {
        return new Promise((resolve, reject) => {
            this.sounds.main.stop();
            this.sounds.engineOn.stop();
            delete this.sounds.main;
            delete this.sounds.engineOn;
            resolve();
        });
    }

    setPlaybackRate(rate) {
        this.sounds.main.playbackRate.value = rate;
    }

    loadSound(url) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onload = ()=> {
                let audioData = request.response;
                CarSoundEngine.webAudioContext.decodeAudioData(audioData).then(buffer => {
                    resolve(buffer);
                });
            };
            request.send();
        });
    }

    loadSounds() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.loadSound(engineOn),
                this.loadSound(acceleration)
            ]).then(results => {
                resolve({ engineOn : results[0], main : results[1] });
            });
        });
    }

}

export default CarSoundEngine