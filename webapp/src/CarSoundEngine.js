import BezierEasing from 'bezier-easing';

import AppConstants from './AppConstants'
import __ZEBCONFIG__ from './config/config'
import {getVolume} from './components/controls/VolumeControl'

class   CarSoundEngine {

    constructor(config = {}) {
        if(!('webAudioContext' in CarSoundEngine && CarSoundEngine.webAudioContext instanceof AudioContext)) {
            CarSoundEngine.webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        }

        this.config = config;
    }
    init() {
        this.gainNode = CarSoundEngine.webAudioContext.createGain();
        this.gainNode.connect(CarSoundEngine.webAudioContext.destination);
        this.gainNode.gain.value = getVolume()
        this.started = false;


        return new Promise((resolve, reject) => {
            this.initConfig().then(config => {
                resolve(this);
            });
        });
    }

    changeVolume(volume) {
        this.gainNode.gain.value = volume
    }

    initConfig(){
        return new Promise((resolve, reject) => {
            var links = [];
            for (let o in this.config) {
                if (typeof this.config[o] == 'object' && 'link' in this.config[o]) {
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
        sound.gainNode.connect(this.gainNode);
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
        this.status = 'starting';
        return new Promise((resolve, reject) => {
            this.sounds = {};
            let afterSrartSounds = this.config.main.filter( (sound) => {
                var speedMargins = 'speed' in sound ? sound.speed.margins : sound.margins.speed;
                return speedMargins[0] === 0 && !sound.recuperation;
            });
            afterSrartSounds.forEach((sound) => {
                this.createSound(sound)
            });

            this.createSound(this.config.start, () => {
                afterSrartSounds.forEach((sound) => {
                    var speedVolume = 'speed' in sound.volume && typeof sound.volume.speed == 'object' ? this.calculatePolyline(sound.volume.speed, 0) : 0,
                        powerVolume = 'power' in sound.volume && typeof sound.volume.power == 'object' ? this.calculatePolyline(sound.volume.power, 0) : 0,
                        defVolume = 'def' in sound.volume && typeof sound.volume.def == 'object' ? this.calculatePolyline(sound.volume.def, 0) : 0,
                        volume = speedVolume + powerVolume + defVolume;

                    if(volume > 0) {
                        sound.gainNode.gain.value = volume;
                        sound.audioSource.start();
                        if (__ZEBCONFIG__.env === AppConstants.DEV) {
                            console.log("start " + sound.link)
                        }
                        sound.started = true;
                    }
                });
                this.status = 'started';
                resolve();
            });
            this.config.start.audioSource.start();
            if(__ZEBCONFIG__.env === AppConstants.DEV) {
                console.log("start " + this.config.start.link)
            }
            this.config.start.audioSource.started = true;

            this.started = true;
        });
    }

    softStop(sound){
        sound.gainNode.gain.value = 0.1;
        setTimeout(function(){
            sound.audioSource.stop();
            sound.started = false;
            delete sound.audioSource;
        }, 500);
    }

    stop() {
        if(this.status == 'started') {
            return new Promise((resolve, reject) => {

                for (let o in this.config) {
                    if (typeof this.config[o] == 'object' && 'audioSource' in this.config[o] && this.config[o].started) {
                        this.softStop(this.config[o]);
                        if (__ZEBCONFIG__.env === AppConstants.DEV) {
                            console.log("stop " + this.config[o].link)
                        }
                    } else if (this.config[o] instanceof Array) {
                        this.config[o].forEach((el) => {
                            if ('audioSource' in el) {
                                if (el.started) {
                                    this.softStop(el);
                                    if (__ZEBCONFIG__.env === AppConstants.DEV) {
                                        console.log("stop " + el.link);
                                    }
                                }
                            }
                        });
                    }
                }

                if (this.config.stop) {
                    this.createSound(this.config.stop, () => {
                        resolve();
                    });
                    this.config.stop.audioSource.start();
                    if (__ZEBCONFIG__.env === AppConstants.DEV) {
                        console.log("start " + this.config.stop.link)
                    }
                    this.config.stop.audioSource.started = true;
                    this.started = false;
                } else {
                    this.started = false;
                    resolve();
                }
            });
        }
    }

    calculatePolyline(polyline,x){
        var dot1 = null,
            dot2 = null;
        for (let i = 0; i < polyline.length; i++) {
            if (x > polyline[i][0]){
                dot1 = polyline[i];
                if(i == polyline.length) {
                    break;
                }
            } else {
                dot2 = polyline[i];
                if(i == 0) {
                    break;
                }
            }

            if(dot1 && dot2) break;
        }

        var y = null;
        if(dot1 && dot2) {
            var k = (dot2[1]-dot1[1])/(dot2[0]-dot1[0]),
                b = dot1[1] - k*dot1[0];
            y = k*x+b;
        }
        if(dot1 && !dot2) {
            y = dot1[1];
        }
        if(!dot1 && dot2) {
            y = dot2[1];
        }
        return y;
    }

    handleSound(carState){
        if('version' in this.config && this.config.version >= 4){
            this.handleSound_(carState);
        } else {
            this.setPlaybackRate(carState.speed, carState.def, carState.power, carState.recuperationPower);
        }
    }

    handleSound_(carState){
        carState.speed = carState.speed > 0 ? carState.speed : 0;
        if (this.started) {
            this.config.main.forEach((sound) => {

                var volume = 0;
                if('volume' in sound && typeof sound.volume == 'object') {
                    var speedVolume = 'speed' in sound.volume && typeof sound.volume.speed == 'object' ? this.calculatePolyline(sound.volume.speed, carState.speed) : 0;
                    var powerVolume = 'power' in sound.volume && typeof sound.volume.power == 'object' ? this.calculatePolyline(sound.volume.power, carState.power) : 0;
                    var defVolume = 'def' in sound.volume && typeof sound.volume.def == 'object' ? this.calculatePolyline(sound.volume.def, carState.def) : 0;
                    var recuperationPowerVolume = 'recuperationPower' in sound.volume && typeof sound.volume.recuperationPower == 'object' ? this.calculatePolyline(sound.volume.recuperationPower, carState.recuperationPower) : 0;
                    volume = speedVolume + powerVolume + defVolume + recuperationPowerVolume;
                } else {
                    volume = 1;
                }

                var pbr = 0;
                if('pbr' in sound && typeof sound.pbr == 'object') {
                    var speedPBR = 'speed' in sound.pbr && typeof sound.pbr.speed == 'object' ? this.calculatePolyline(sound.pbr.speed, carState.speed) : 0;
                    var powerPBR = 'power' in sound.pbr && typeof sound.pbr.power == 'object' ? this.calculatePolyline(sound.pbr.power, carState.power) : 0;
                    var defPBR = 'def' in sound.pbr && typeof sound.pbr.def == 'object' ? this.calculatePolyline(sound.pbr.def, carState.def) : 0;
                    var recuperationPowerPBR = 'recuperationPower' in sound.pbr && typeof sound.pbr.recuperationPower == 'object' ? this.calculatePolyline(sound.pbr.recuperationPower, carState.recuperationPower) : 0;
                    pbr = speedPBR + powerPBR + defPBR + recuperationPowerPBR;
                } else {
                    pbr = 1;
                }

                if('margins' in sound && typeof sound.margins == 'object') {
                    if('speed' in sound.margins && !(carState.speed >= sound.margins.speed[0] && carState.speed <= sound.margins.speed[1])){
                        volume = 0;
                    }
                }

                if(sound.recuperation && carState.recuperationPower <= 0) {
                    volume = 0;
                }

                if(volume > 0){
                    if(!sound.started){
                        this.createSound(sound);
                        sound.audioSource.start();
                        sound.started = true;
                    }
                } else {
                    if (sound.started) {
                        sound.audioSource.stop();
                        sound.started = false;
                    }
                }

                if (sound.started) {
                    sound.gainNode.gain.value = volume;
                    sound.audioSource.playbackRate.value = pbr;
                }

            });
        }
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
                            if(__ZEBCONFIG__.env === AppConstants.DEV) {
                                console.log("start " + el.link)
                            }
                            el.started = true;
                        }
                    } else {
                        if(recuperationPower > 0) {
                            if (el.started) {
                                el.gainNode.gain.value = 0.5;
                            } else {
                                this.createSound(el);
                                el.audioSource.start();
                                if(__ZEBCONFIG__.env === AppConstants.DEV) {
                                    console.log("start " + el.link)
                                }
                                el.started = true;
                            }
                        }  else {
                            if (el.started) {
                                el.audioSource.stop();
                                if(__ZEBCONFIG__.env === AppConstants.DEV) {
                                    console.log("stop " + el.link)
                                }
                                el.started = false;
                            }
                        }
                    }
                } else {
                    if (el.started) {
                        el.audioSource.stop();
                        if(__ZEBCONFIG__.env === AppConstants.DEV) {
                            console.log("stop " + el.link)
                        }
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
