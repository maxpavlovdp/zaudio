'use strict';
// Entry point to start play with web audio toy :)
$(document).ready(function() {
    zeBoosterInitializer.init()
});

var zeBoosterInitializer = (function () {
    var idlingLevel = 350,
        volumeControl;

    var init = function () {
        initMouseWheel();
        initActivationSound();
        initVolumeControl();

        zeBoosterCore.init();
    };

    var initVolumeControl = function () {
        volumeControl = $('.volume-control');
        volumeControl.on('input', function () {
            zeBoosterCore.setVolume(this.value);
        });
        zeBoosterCore.setVolume(volumeControl.val())
    };

    var initMouseWheel = function () {
        var mouseRpm = 0;
        $('.tachometer-container').on('mousewheel', function (e) {
            mouseRpm += e.deltaY;
            //console.log(mouseRpm);
            if (mouseRpm < 0) mouseRpm = 0;
            if (mouseRpm > 800) mouseRpm = 800;
            if (mouseRpm > idlingLevel) {
                zeBoosterCore.accelerate(mouseRpm);
            } else {
                zeBoosterCore.accelerate(idlingLevel);
            }
        });
    };

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


