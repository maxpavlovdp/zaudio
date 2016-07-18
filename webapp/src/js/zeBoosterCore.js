'use strict';

var zeBoosterCore = (function () {
    //Depends on web browser
    var webAudioContext;
    var audioSource;

    var init = function () {
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

        var gainNode = webAudioContext.createGain();
        // Plug to browser loud speaker
        gainNode.connect(webAudioContext.destination);

        configureAudioFromOscillator(gainNode);
        //configureAudioFromMp3(gainNode);

        configureUI()
    };

    function configureUI() {
        oscillograph(webAudioContext, audioSource);
        speedometer.init(audioSource);
    }

    function configureAudioFromOscillator(gainNode) {
        audioSource = webAudioContext.createOscillator();
        audioSource.frequency.value = 0;
        audioSource.connect(gainNode);
        audioSource.type = 'sine';
        // We have sound
        audioSource.start(0);
    }

    function configureAudioFromMp3(gainNode) {
        var source = webAudioContext.createBufferSource();
        var request = new XMLHttpRequest();

        request.open('GET', 'src/sound/acceleration.mp3', true);

        request.responseType = 'arraybuffer';

        request.onload = function () {
            var audioData = request.response;

            webAudioContext.decodeAudioData(audioData, function (buffer) {
                    var myBuffer = buffer;
                    var songLength = buffer.duration;
                    source.buffer = myBuffer;
                    source.playbackRate.value = 1;
                    source.connect(gainNode);
                    source.loop = true;

                    //loopstartControl.setAttribute('max', Math.floor(songLength));
                    //loopendControl.setAttribute('max', Math.floor(songLength));
                },

                function (e) {
                    "Error with decoding audio data" + e.err
                });

        };
        request.send();


        source.start();
    }


    var accelerate = function (gasVal) {
        var duration = 0.1;
        // Change sound waves
        audioSource.frequency.setTargetAtTime(gasVal, webAudioContext.currentTime + duration, 1.3);
    };

    var stop = function () {
        audioSource.frequency.setTargetAtTime(0, webAudioContext.currentTime + 0.1, 0.3);
    };

    return {init: init, accelerate: accelerate, stop: stop}
})();