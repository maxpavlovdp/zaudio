'use strict';
// Entry point to start play with web audio toy :)
$(document).ready(function () {
    zeBoosterInitializer.init()
});

var zeBoosterInitializer = (function () {
    var idlingLevel = 400,
        volumeControl;

    var init = function () {
        initPedal();
        initSound()

        initActivationSound();
        initVolumeControl();

        zeBoosterCore.init(volumeControl.val());
    };

    var initVolumeControl = function () {
        volumeControl = $('.volume-control');
        volumeControl.on('input', function () {
            zeBoosterCore.setVolume(this.value);
        });
    };

    var initPedal = function () {
        var pedalPosition = 0;
        $('.tachometer-container').on('mousewheel', function (e) {
            pedalPosition += e.deltaY;
            if (pedalPosition < 0) pedalPosition = 0;
            if (pedalPosition > 800) pedalPosition = 800;

            //console.log("Mouse wheel position:" + pedalPosition);
            $('.pedal-control').val(pedalPosition).change()
        });
    };

    var initSound = function () {
        $('.pedal-control').change(function () {
            var pedalPosition = $('.pedal-control').val()
            //console.log("Pedal position: " + pedalPosition)

            if (pedalPosition > idlingLevel) {
                zeBoosterCore.accelerate(pedalPosition);
            } else {
                zeBoosterCore.accelerate(idlingLevel);
            }
        })


    }

    var initActivationSound = function () {
        $('.tachometer-container')
            .mouseenter(function () {
                zeBoosterCore.start();
            })
            .mouseleave(function () {
                zeBoosterCore.stop();
            })
    };

    return {init: init};
})();


