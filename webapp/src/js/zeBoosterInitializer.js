'use strict';
// Entry point to start play with web audio toy :)
$(document).ready(function() {
    zeBoosterInitializer.init()
});

var zeBoosterInitializer = (function () {
    var activationBpm = 250;

    var init = function () {
        configureMouseWheel();
        configureActivationSound();

        zeBoosterCore.init();
    };

    var configureMouseWheel = function () {
        var mouseRpm = 0;
        $('.tachometer-container').on('mousewheel', function (e) {
            mouseRpm += e.deltaY;
            //console.log(mouseRpm);
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
                zeBoosterCore.stop();
            })
    };

    return {init: init};
})();


