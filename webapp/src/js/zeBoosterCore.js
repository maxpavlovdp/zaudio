'use strict';
var zeBoosterCore = {
    init: function () {
        //Depends on web browser
        var audioContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        this.webAudioContext = new audioContextClass();
        this.gainValue = 0.1;
        this.gainNode;
        this.oscillator;
        this.animationID;
        this.canvas = document.getElementById('visualizer');
        this.canvasContext = this.canvas.getContext('2d');
        this.analyser = this.webAudioContext.createAnalyser();
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10;
        this.analyser.smoothingTimeConstant = 0.85;
        speedometr.init();
    },

    start: function () {
        var self = this;
        if (typeof this.oscillator != 'undefined') this.oscillator.disconnect();

        this.gainNode = this.webAudioContext.createGain();
        this.gainNode.connect(this.webAudioContext.destination);

        this.oscillator = this.webAudioContext.createOscillator();
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
            speedometr.setStatValue((v / 5).toFixed(1));
        }, 50);
    },

    accelerate: function (gasVal) {
        var duration = 0.1;
        // Change sound waves
        this.oscillator.frequency.setTargetAtTime(gasVal, this.webAudioContext.currentTime + duration, 1.3);
    },

    stop: function () {
        this.oscillator.frequency.setTargetAtTime(0, this.webAudioContext.currentTime + 0.1, 0.3);
    }
};