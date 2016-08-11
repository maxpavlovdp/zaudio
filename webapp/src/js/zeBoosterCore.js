'use strict';

var zeBoosterCore = (function () {
    var webAudioContext;
    var zeSound;
    var engineOnSound;

    var mouseWheelKoef = 500;

    var init = function () {
        //Depends on web browser
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

        loadAllSounds()

        console.log("initiated")
    };

    function loadAllSounds() {
        zeSound = loadAudio('src/sound/acceleration.ogg', true);
        engineOnSound = loadAudio('src/sound/engineOn.ogg', false, onended);
    }

    function configureUI() {
        oscillograph(webAudioContext, zeSound);
        speedometer.init(zeSound.playbackRate);

        console.log("UI configured")
    }

    function loadAudio(url, isLoop) {
        var gainNode = webAudioContext.createGain();
        // Plug to browser loud speaker
        gainNode.connect(webAudioContext.destination);
        // seems like it must looks like that and when I change gain value here - volume changes.
        // Now, it needs to connect value to some controller.
        gainNode.gain.value = 1.5;

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

        return audioSource;
    }

    var accelerate = function (gasVal) {
        //configureUI();
        var feedbackDelay = 0.1;
        var accelerationPerformance = 3;

        zeSound.playbackRate.setTargetAtTime(gasVal / mouseWheelKoef, webAudioContext.currentTime + feedbackDelay, accelerationPerformance);
    };


    var start = function (idlingLevel) {
        engineOnSound.start()
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

        loadAllSounds()

        console.log("stopped")
    };

    return {init: init, accelerate: accelerate, stop: stop, start: start}
})();