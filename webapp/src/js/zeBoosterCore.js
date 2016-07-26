'use strict';

var zeBoosterCore = (function () {
    var webAudioContext;
    var audioSource;

    var init = function () {
        //Depends on web browser
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

        audioSource = configureAudio();
        configureUI()
    };

    function configureUI() {
        oscillograph(webAudioContext, audioSource);
        speedometer.init(audioSource.playbackRate);
    }

    function configureAudio() {
        var gainNode = webAudioContext.createGain();
        // Plug to browser loud speaker
        gainNode.connect(webAudioContext.destination);

        var audioSource = webAudioContext.createBufferSource();
        var request = new XMLHttpRequest();

        request.open('GET', 'src/sound/accelerationV3.ogg', true);

        request.responseType = 'arraybuffer';

        request.onload = function () {
            var audioData = request.response;

            webAudioContext.decodeAudioData(audioData, function (buffer) {
                    var myBuffer = buffer;
                    var songLength = buffer.duration;
                    audioSource.buffer = myBuffer;
                    audioSource.playbackRate.value = 0;
                    audioSource.connect(gainNode);
                    audioSource.loop = true;

                    //loopstartControl.setAttribute('max', Math.floor(songLength));
                    //loopendControl.setAttribute('max', Math.floor(songLength));
                },

                function (e) {
                    "Error with decoding audio data" + e.err
                });

        };
        request.send();

        audioSource.start(0);

        return audioSource;
    }


    var accelerate = function (gasVal) {
        var feedbackDelay = 0.1;
        var accelerationPerformance = 3;

        audioSource.playbackRate.setTargetAtTime(gasVal / 500, webAudioContext.currentTime + feedbackDelay, accelerationPerformance);
    };


    var stop = function () {
        var decelerationPerformance = 0.3;
        audioSource.playbackRate.setTargetAtTime(0, webAudioContext.currentTime + 0.1, decelerationPerformance);
    };

    return {init: init, accelerate: accelerate, stop: stop}
})();