'use strict';
var zeBoosterCore = (function () {

    //Depends on web browser
    var webAudioContext;

    var init = function () {
        webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

        this.gainValue = 0.1;
        this.gainNode;
        this.oscillator;
        this.animationID;
        this.canvas = document.getElementById('visualizer');
        this.canvasContext = this.canvas.getContext('2d');
        this.analyser = webAudioContext.createAnalyser();
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10;
        this.analyser.smoothingTimeConstant = 0.85;
        speedometer.init();
    };

    var start = function () {
        var self = this;
        if (typeof this.oscillator != 'undefined') this.oscillator.disconnect();

        this.gainNode = webAudioContext.createGain();
        this.gainNode.connect(webAudioContext.destination);

        this.oscillator = webAudioContext.createOscillator();
        this.oscillator.frequency.value = 0;
        this.oscillator.connect(this.gainNode);
        this.oscillator.type = 'sine';
        // We have sound
        this.oscillator.start(0);
        this.oscillator.connect(this.analyser);
        oscillograph(this);

        this.animationID = window.setInterval(function () {
            var v = self.oscillator.frequency.value;
            $(".current-frequency p").html(parseInt(self.oscillator.frequency.value) + 'Hz');
            speedometer.setStatValue((v / 5).toFixed(1));
        }, 50);
    };

    var accelerate = function (gasVal) {
        var duration = 0.1;
        // Change sound waves
        this.oscillator.frequency.setTargetAtTime(gasVal, webAudioContext.currentTime + duration, 1.3);
    };

    var stop = function () {
        this.oscillator.frequency.setTargetAtTime(0, webAudioContext.currentTime + 0.1, 0.3);
    };

    return {init: init, start: start, accelerate: accelerate, stop: stop}
})();