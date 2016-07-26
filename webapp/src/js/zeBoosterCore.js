'use strict';

var zeBoosterCore = (function () {
    var webAudioContext;
    var zeSound;
    var engineOnSound;

    var mouseWheelKoef = 500;

    var init = function () {
        //Depends on web browser
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        console.log("zeBoosterCore initiated")
    };

    function configureUI() {
        oscillograph(webAudioContext, zeSound);
        speedometer.init(zeSound.playbackRate);
    }

    function configureAudio(url, isLoop) {
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

            console.log( url + " sound loaded")
        };
        request.send();

        audioSource.start();

        return audioSource;
    }

    var accelerate = function (gasVal) {
        configureUI();
        var feedbackDelay = 0.1;
        var accelerationPerformance = 3;

        zeSound.playbackRate.setTargetAtTime(gasVal / mouseWheelKoef, webAudioContext.currentTime + feedbackDelay, accelerationPerformance);
    };


    var start = function (idlingLevel) {
        zeSound = configureAudio('src/sound/acceleration.ogg', true);
        engineOnSound = configureAudio('src/sound/engineOn.ogg', false);

        engineOnSound.playbackRate.setTargetAtTime(1, webAudioContext.currentTime, 0);
        //Todo: replace "webAudioContext.currentTime + 1.7" by previous finish event logic
        //engineOnSound.onended = function () {
        //}
        zeSound.playbackRate.setTargetAtTime(idlingLevel / mouseWheelKoef, webAudioContext.currentTime + 1.7, 0);
    };

    var stop = function () {
        var decelerationPerformance = 0.3;
        zeSound.playbackRate.setTargetAtTime(0, webAudioContext.currentTime + 0.1, decelerationPerformance);
        engineOnSound.playbackRate.setTargetAtTime(0, webAudioContext.currentTime + 0.1, decelerationPerformance);
        //zeSound.stop(webAudioContext.currentTime + 2)
        //engineOnSound.stop(webAudioContext.currentTime + 2)
    };

    return {init: init, accelerate: accelerate, stop: stop, start: start}
})();