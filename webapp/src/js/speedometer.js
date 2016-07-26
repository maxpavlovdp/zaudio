'use strict';
var speedometer = {
    init: function (playbackRate) {
        this.ticks = $('.tick');
        this.digits = $('.digit');
        this.details = $('.details');
        this.progress = $('.progress');
        this.outerRingRadius = 175;
        this.digitRingRadius = 155;
        this.digitValueMax = 160;
        var self = this;
        this.ticks.each(function (i) {
            var angle = 210 - i * 3.33;
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
        this.digits.each(function (i) {
            var angle = 210 - i * 20;
            var theta = self.deg2rad(angle);
            var x = Math.cos(theta) * self.digitRingRadius;
            var y = Math.sin(theta) * -self.digitRingRadius;
            $(this).css({
                '-webkit-transform': 'translate(' + x + 'px, ' + y + 'px)',
                '-moz-transform': 'translate(' + x + 'px, ' + y + 'px)',
                'transform': 'translate(' + x + 'px, ' + y + 'px)'
            });
        });

        window.setInterval(function () {
            var v = playbackRate.value;
            speedometer.setStatValue((v*100).toFixed(1));
        }, 50);
    },

    setStatValue: function (value) {
        var angle = -120 + 240 * (value / this.digitValueMax);
        this.progress.css({
            'transform': 'rotate(' + angle + 'deg)'
        });
    },

    deg2rad: function (angle) {
        return angle * (Math.PI / 180);
    },
    rad2deg: function (angle) {
        return angle * (180 / Math.PI);
    }
};
