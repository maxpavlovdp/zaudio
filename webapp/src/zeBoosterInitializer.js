'use strict';
// jQuery import
$.getScript('src/zeBoosterCore.js', function () {

    //Object name is equal to file name
    var zeBoosterInitializer = {
        init: function () {
            zeBoosterInitializer.configureMouseWheel();
            zeBoosterInitializer.configureStopSound();
            zeBoosterInitializer.configureSoundChanger();

            zeBoosterCore.init();
            zeBoosterCore.start();
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
});


