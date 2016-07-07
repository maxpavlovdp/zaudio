'use strict';
var zeBoosterInitializer = {
    init: function () {
        zeBoosterCore.init();
        zeBoosterCore.start();

        zeBoosterInitializer.configureMouseWheel();
        zeBoosterInitializer.configureStopSound();
        zeBoosterInitializer.configureSoundChanger();
        zeBoosterInitializer.configureActivationSound();
    },

    configureMouseWheel: function () {
        var mouseRpm = 0;
        $('.gas-pedal').on('mousewheel', function (e) {
            mouseRpm += e.deltaY * 70;
            if (mouseRpm < 0) mouseRpm = 0;
            if (mouseRpm > 800) mouseRpm = 800;
            zeBoosterCore.accelerate(mouseRpm);
        });
    },

    configureActivationSound: function () {
        $('.tachometer-container')
            .mouseover(function () {
                zeBoosterCore.accelerate(150);
            })
            .mouseout(function(){
                zeBoosterCore.stop()
            })
    },

    // Will be replaced by hover off
    // KISS principle will drive us to success :)
    configureStopSound: function () {
        $('.stop-pedal').on('click', function (e) {
            zeBoosterCore.stop();
        });
    },

    //Will be replaced by accelerate/regeneration sound
    configureSoundChanger: function () {
        var waveNumbr = 0;
        var waves = ['sine', 'square', 'sawtooth', 'triangle'];
        $('.waveform').on('click', function (e) {
            waveNumbr++;
            if (waveNumbr > 3) waveNumbr = 0;
            zeBoosterCore.oscillator.type = waves[waveNumbr];
            $(this).html(waves[waveNumbr]);
            console.log(this);
        });
    }
};

// Entry point to start play with web audio toy :)
$(document).ready(zeBoosterInitializer.init);


