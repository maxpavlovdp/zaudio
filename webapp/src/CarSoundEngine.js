import BezierEasing from 'bezier-easing';

class CarSoundEngine {

    constructor(config = {}) {
        if(!('webAudioContext' in CarSoundEngine && CarSoundEngine.webAudioContext instanceof AudioContext)) {
            CarSoundEngine.webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        }

        this.config = config;
    }
    init() {
        this.gainNode = CarSoundEngine.webAudioContext.createGain();
        this.gainNode.connect(CarSoundEngine.webAudioContext.destination);
        this.gainNode.gain.value = 1;
        this.started = false;



        return new Promise((resolve, reject) => {
            this.initConfig().then(config => {
                resolve(this);
            });
        });
    }

    initConfig(){
        return new Promise((resolve, reject) => {
            var links = [];
            for (let o in this.config) {
                if ('link' in this.config[o]) {
                    let s = this.loadSound(this.config[o].link);
                    links.push(s);
                    s.then(buffer => {
                        this.config[o].buffer = buffer;
                    });
                } else if (this.config[o] instanceof Array) {
                    this.config[o].forEach((el) => {
                        if ('link' in el) {
                            let s = this.loadSound(el.link);
                            links.push(s);
                            s.then(buffer => {
                                el.buffer = buffer;
                            });
                        }
                    });
                }
            }

            Promise.all(links).then(results => {
                resolve(this.config,results);
            });
        });
    }

    createSound(sound, onended) {
        sound.gainNode = CarSoundEngine.webAudioContext.createGain();
        sound.gainNode.connect(CarSoundEngine.webAudioContext.destination);
        if(sound.speed && sound.speed.volume){
            sound.gainNode.gain.value = sound.speed.volume[0][1];
        }

        sound.audioSource = CarSoundEngine.webAudioContext.createBufferSource();
        sound.audioSource.buffer = sound.buffer;
        sound.audioSource.playbackRate.value = 1;
        sound.audioSource.loop = sound.loop;
        sound.audioSource.connect(sound.gainNode);
        sound.audioSource.onended = onended;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.sounds = {};
            let afterSrartSounds = this.config.main.filter( (sound) => {
                return sound.speed.margins[0] === 0 && !sound.recuperation;
            });
            afterSrartSounds.forEach((sound) => {
                this.createSound(sound)
            });

            this.createSound(this.config.start, () => {
                afterSrartSounds.forEach((sound) => {
                    sound.gainNode.gain.value = 0;
                    sound.audioSource.start();
                    sound.started = true;
                });
                resolve();
            });
            this.config.start.audioSource.start();
            this.config.start.audioSource.started = true;

            this.started = true;
        });
    }

    stop() {
        return new Promise((resolve, reject) => {

            for (let o in this.config) {
                if ('audioSource' in this.config[o]) {
                    this.config[o].audioSource.stop();
                    this.config[o].started = false;
                    delete this.config[o].audioSource;
                } else if (this.config[o] instanceof Array) {
                    this.config[o].forEach((el) => {
                        if ('audioSource' in el) {
                            el.started = false;
                            el.audioSource.stop();
                            delete el.audioSource;
                        }
                    });
                }
            }

            if(this.config.stop) {
                this.createSound(this.config.stop, () => {
                    resolve();
                });
                this.config.stop.audioSource.start();
                this.config.stop.audioSource.started = true;
                this.started = false;
            } else {
                this.started = false;
                resolve();
            }
        });
    }



    setPlaybackRate(speed, def, power, recuperationPower) {
        speed = speed > 0 ? speed : 0;
        def = def > 0 ? def : 0;
        if (this.started) {
            this.config.main.forEach((el) => {
                if (speed >= el.speed.margins[0] && speed <= el.speed.margins[1]) {
                    if(!el.recuperation) {
                        var rate = 1 + (speed - el.speed.margins[0]) / 150;
                        if (el.started) {
                            el.audioSource.playbackRate.value = rate;
                            if (el.defMargins) {
                                if (def >= el.defMargins[0] && def <= el.defMargins[1]) {
                                    el.gainNode.gain.value = def / 15;
                                }
                            }

                            var volume = 0;
                            if (el.speed && el.speed.volume) {
                                let easing = BezierEasing(0, 0, 1, 1);
                                let dx = (speed - el.speed.volume[0][0]) / (el.speed.volume[1][0] - el.speed.volume[0][0]);
                                let dy = (el.speed.volume[1][1] - el.speed.volume[0][1]);
                                if (speed > el.speed.volume[0][0]) {
                                    if (speed <= el.speed.volume[1][0]) {
                                        volume = el.speed.volume[0][1] + easing(dx) * dy;
                                    } else {
                                        volume = el.speed.volume[1][1];
                                    }
                                } else {
                                    volume = el.speed.volume[0][1];
                                }
                                el.gainNode.gain.value = volume;
                            } else {
                                volume = 1;
                            }


                        } else {
                            this.createSound(el);
                            el.gainNode.gain.value = el.speed.volume[0][1];
                            el.audioSource.start();
                            el.started = true;
                        }
                    } else {
                        if(recuperationPower > 0) {
                            if (el.started) {
                                el.gainNode.gain.value = 0.5;
                            } else {
                                this.createSound(el);
                                el.audioSource.start();
                                el.started = true;
                            }
                        }  else {
                            if (el.started) {
                                el.audioSource.stop();
                                el.started = false;
                            }
                        }
                    }
                } else {
                    if (el.started) {
                        el.audioSource.stop();
                        el.started = false;
                    }
                }
            });
        }
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
}

export default CarSoundEngine