'use strict';
var zeBooster = {};

zeBooster.init = function() {
    //Depends on web browser
    var audioContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
    this.webAudioContext = new audioContextClass();
    this.gainValue = 0.1;
    this.gainNode;
    this.oscillator;
    this.oscillator2;
    this.animationID;
    this.canvas = document.getElementById('visualizer');
    this.canvasContext = this.canvas.getContext('2d');
    this.analyser = this.webAudioContext.createAnalyser();
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.85;
    this.tachometer.init();
};

zeBooster.start = function() {
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
    this.oscillograph();

    this.animationID = window.setInterval(function() {
        var v = self.oscillator.frequency.value;
        $(".current-frequency p").html(parseInt(self.oscillator.frequency.value) + 'Hz');
        zeBooster.tachometer.setStatValue((v / 5).toFixed(1));
    }, 50);
};

zeBooster.accelerate = function(gasVal) {
    var duration = 0.1;
    // Change sound waves
    this.oscillator.frequency.setTargetAtTime(gasVal, this.webAudioContext.currentTime + duration, 1.3);
};

zeBooster.stop = function() {
    this.oscillator.frequency.setTargetAtTime(0, this.webAudioContext.currentTime + 0.1, 0.3);
};

zeBooster.tachometer = {};
zeBooster.tachometer.init = function() {
    this.ticks = $('.tick');
    this.digits = $('.digit');
    this.details = $('.details');
    this.progress = $('.progress');
    this.outerRingRadius = 164;
    this.digitRingRadius = 145;
    this.digitValueMax = 160;
    var self = this;
    this.ticks.each(function(i) {
        var angle = 210 - i * 5;
        var theta = self.deg2rad(angle);
        var radius = self.outerRingRadius + (i % 6 ? 0 : 4);
        var x = Math.cos(theta) * radius;
        var y = Math.sin(theta) * -radius;
        var transform = [
            'translate(' + x + 'px, ' + y + 'px)',
            'rotate(' + -angle + 'deg)'
        ].join(' ');
        $(this).css({
            '-webkit-transform': transform,
            '-moz-transform': transform,
            'transform': transform
        });
    });
    this.digits.each(function(i) {
        var angle = 210 - i * 30;
        var theta = self.deg2rad(angle);
        var x = Math.cos(theta) * self.digitRingRadius;
        var y = Math.sin(theta) * -self.digitRingRadius;
        $(this).css({
            '-webkit-transform': 'translate(' + x + 'px, ' + y + 'px)',
            '-moz-transform': 'translate(' + x + 'px, ' + y + 'px)',
            'transform': 'translate(' + x + 'px, ' + y + 'px)'
        });
    });
};

zeBooster.tachometer.setStatValue = function(value) {
    var angle = -120 + 240 * (value / this.digitValueMax);
    this.progress.css({
        'transform': 'rotate(' + angle + 'deg)'
    });
    this.details.find('.speed').text((value * 100).toFixed(0));
};

zeBooster.tachometer.deg2rad = function(angle) {
    return angle * (Math.PI / 180);
}
zeBooster.tachometer.rad2deg = function(angle) {
    return angle * (180 / Math.PI);
}

zeBooster.oscillograph = function() {
    var self = this;
    var WIDTH = this.canvas.width;
    var HEIGHT = this.canvas.height;
    this.analyser.fftSize = 2048;
    var bufferLength = this.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    this.canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
    function draw() {
        var drawVisual = requestAnimationFrame(draw);
        self.analyser.getByteTimeDomainData(dataArray);
        self.canvasContext.fillStyle = '#000';
        self.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
        self.canvasContext.lineWidth = 2;
        self.canvasContext.strokeStyle = '#3b3d45';
        self.canvasContext.beginPath();
        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;
            if (i === 0) {
                self.canvasContext.moveTo(x, y);
            } else {
                self.canvasContext.lineTo(x, y);
            }
            x += sliceWidth;
        }
        self.canvasContext.lineTo(self.canvas.width, self.canvas.height / 2);
        self.canvasContext.stroke();
    }
    draw();
}