'use strict';
// Entry point to start play with web audio toy :)
$(document).ready(function() {
    zeBoosterInitializer.init()
});

var zeBoosterInitializer = (function () {
    var activationBpm = 120;

    var init = function () {
        configureMouseWheel();
        configureActivationSound();
        configureSoundChanger();

        zeBoosterCore.init();
        zeBoosterCore.start();
    };

    var configureMouseWheel = function () {
        var mouseRpm = 0;
        $('.tachometer-container').on('mousewheel', function (e) {
            mouseRpm += e.deltaY * 2;
            if (mouseRpm < 0) mouseRpm = 0;
            if (mouseRpm > 800) mouseRpm = 800;
            if (mouseRpm > activationBpm) {
                zeBoosterCore.accelerate(mouseRpm);
            } else {
                zeBoosterCore.accelerate(activationBpm);
            }
        });
    };

    var configureActivationSound = function () {
        $('.tachometer-container')
            .mouseover(function () {
                zeBoosterCore.accelerate(activationBpm);
            })
            .mouseout(function () {
                zeBoosterCore.stop()
            })
    };

    //Will be replaced by accelerate/regeneration sound
    var configureSoundChanger = function () {
        var waveNumbr = 0;
        var waves = ['sine', 'square', 'sawtooth', 'triangle'];
        $('.waveform').on('click', function (e) {
            waveNumbr++;
            if (waveNumbr > 3) waveNumbr = 0;
            zeBoosterCore.oscillator.type = waves[waveNumbr];
            $(this).html(waves[waveNumbr]);
            console.log(this);
        });
    };

    return {init: init};
})();


