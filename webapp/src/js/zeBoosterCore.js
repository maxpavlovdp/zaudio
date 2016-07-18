'use strict';

var zeBoosterCore = (function () {
    //Depends on web browser
    var webAudioContext;
    var oscillator;
    var gainNode;

    var init = function () {
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

        gainNode = webAudioContext.createGain();

        // Plug to browser loud speaker
        gainNode.connect(webAudioContext.destination);

        configureAudio();
        configureUI()
    };

    function configureUI() {
        oscillograph(webAudioContext, oscillator);
        speedometer.init(oscillator);
    }

    function configureAudio() {
        oscillator = webAudioContext.createOscillator();
        oscillator.frequency.value = 0;
        oscillator.connect(gainNode);
        oscillator.type = 'sine';
        // We have sound
        oscillator.start(0);
    }

    var accelerate = function (gasVal) {
        var duration = 0.1;
        // Change sound waves
        oscillator.frequency.setTargetAtTime(gasVal, webAudioContext.currentTime + duration, 1.3);
    };

    var stop = function () {
        oscillator.frequency.setTargetAtTime(0, webAudioContext.currentTime + 0.1, 0.3);
    };

    return {init: init, accelerate: accelerate, stop: stop}
})();