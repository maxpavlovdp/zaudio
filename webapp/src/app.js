'use strict';
var mouseRpm = 0;
var waveNumbr = 0;
var waves = ['sine','square','sawtooth','triangle'];

$('.gas-pedal').on('mousewheel', function(e) {
    mouseRpm += e.deltaY * 70;
    if (mouseRpm < 0) mouseRpm = 0;
    if (mouseRpm > 800) mouseRpm = 800;
    eSound.accelerate(mouseRpm);
});

$('.stop-pedal').on('click', function(e) {
    eSound.stop();
});

$('.waveform').on('click', function(e) {
    waveNumbr++;
    if(waveNumbr > 3) waveNumbr = 0;
    eSound.oscillator.type = waves[waveNumbr];
    $(this).html(waves[waveNumbr])
    console.log(this);
});

eSound.init();
eSound.start();
