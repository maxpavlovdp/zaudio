'use strict';

var zeBoosterCore = (function () {
    var webAudioContext
    var zeSound
    var engineOnSound

    var gainNode

    var mouseWheelKoef = 500;

    var init = function (defaultVolume) {
        //Depends on web browser
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

        configureAudio(defaultVolume);
        configureUI();

        console.log("initiated")
    };

    function configureAudio(defaultVolume) {
        gainNode = webAudioContext.createGain()
        // Plug to browser loud speaker
        gainNode.connect(webAudioContext.destination)
        gainNode.gain.value = defaultVolume

        zeSound = loadAudio('src/sound/acceleration.ogg', true);
        zeSound.connect(gainNode);
        engineOnSound = loadAudio('src/sound/engineOn.ogg', false);
        engineOnSound.connect(gainNode);
    }

    function setVolume(value) {
        gainNode.gain.value = value
        console.log("volume is set to " + value)
    }

    function configureUI() {
        oscillograph(webAudioContext, zeSound);
        speedometer.init(zeSound.playbackRate);

        console.log("UI is configured")
    }

    function loadAudio(url, isLoop) {
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
                    audioSource.loop = isLoop;
                },

                function (e) {
                    "Error with decoding audio data" + e.err
                });

            var loadTime = webAudioContext.currentTime - loadStartTime

            console.log(url + " sound loaded for " + loadTime * 1000 + " millis")
        };
        request.send();

        return audioSource
    }

    var accelerate = function (gasVal) {

        var feedbackDelay = 0.1;
        var accelerationPerformance = 3;

        zeSound.playbackRate.setTargetAtTime(gasVal / mouseWheelKoef, webAudioContext.currentTime + feedbackDelay, accelerationPerformance);
    };

    var start = function () {
        engineOnSound.start();
        engineOnSound.onended = function () {
            zeSound.start()
            zeSound.playbackRate.value = 1
        }

        engineOnSound.playbackRate.value = 1

        console.log("started")
    };

    var stop = function () {
        engineOnSound.onended = null
        engineOnSound.stop()
        try {
            zeSound.stop()
        } catch (e) {
            // For case when user does fast mouse enter/exit. We do nothing with error.
        }

        configureAudio(gainNode.gain.value)

        console.log("stopped")
    };

    return {init: init, accelerate: accelerate, stop: stop, start: start, setVolume: setVolume}
})();