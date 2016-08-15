'use strict';

var zeBoosterCore = (function () {
    var webAudioContext;
    var zeSound;
    var engineOnSound;

    var volume;

    var mouseWheelKoef = 500;

    var init = function () {
        //Depends on web browser
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

        loadAllSounds()
        configureUI()

        console.log("initiated")
    };

    function loadAllSounds() {
        zeSound = loadAudio('src/sound/acceleration.ogg', volume, true);
        engineOnSound = loadAudio('src/sound/engineOn.ogg', volume, false);
    }

    function setVolume(value){
        volume = value
        console.log("volume is set to " + value)
    }

    function configureUI() {
        oscillograph(webAudioContext, zeSound.audioSource);
        speedometer.init(zeSound.audioSource.playbackRate);

        console.log("UI is configured")
    }

    function loadAudio(url, volume, isLoop) {
        var gainNode = webAudioContext.createGain();
        // Plug to browser loud speaker
        gainNode.connect(webAudioContext.destination);

        gainNode.gain.value = volume;

        var audioSource = webAudioContext.createBufferSource();
        var request = new XMLHttpRequest();

        request.open('GET', url, true);

        request.responseType = 'arraybuffer';

        var loadStartTime = webAudioContext.currentTime

        request.onload = function () {
            var audioData = request.response;

            webAudioContext.decodeAudioData(audioData, function (buffer) {
                    var myBuffer = buffer;
                    audioSource.buffer = myBuffer;
                    audioSource.playbackRate.value = 0;
                    audioSource.connect(gainNode);
                    audioSource.loop = isLoop;
                },

                function (e) {
                    "Error with decoding audio data" + e.err
                });

            var loadTime = webAudioContext.currentTime - loadStartTime

            console.log(url + " sound loaded for " + loadTime * 1000 + " millis")
        };
        request.send();

        return {
            audioSource: audioSource,
            gainNode: gainNode
        };
    }

    var accelerate = function (gasVal) {

        var feedbackDelay = 0.1;
        var accelerationPerformance = 3;

        zeSound.audioSource.playbackRate.setTargetAtTime(gasVal / mouseWheelKoef, webAudioContext.currentTime + feedbackDelay, accelerationPerformance);
    };

    var start = function () {
        engineOnSound.audioSource.start()
        engineOnSound.audioSource.onended = function () {
            zeSound.audioSource.start()
            zeSound.audioSource.playbackRate.value = 1
        }

        engineOnSound.audioSource.playbackRate.value = 1

        console.log("started")
    };

    var stop = function () {
        engineOnSound.audioSource.onended = null
        engineOnSound.audioSource.stop()
        try {
            zeSound.audioSource.stop()
        } catch (e) {
            // For case when user does fast mouse enter/exit. We do nothing with error.
        }

        loadAllSounds()

        console.log("stopped")
    };

    return {init: init, accelerate: accelerate, stop: stop, start: start, setVolume: setVolume}
})();