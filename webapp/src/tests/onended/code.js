// define variables
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var pre = document.querySelector('pre');
var myScript = document.querySelector('script');
var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

var playbackControl = document.querySelector('.playback-rate-control');
var playbackValue = document.querySelector('.playback-rate-value');

var engineOnSound;
var accelerationSound;

// use XHR to load an audio track, and
// decodeAudioData to decode it and stick it in a buffer.
// Then we put the buffer into the source

function getData(soundUrl, looped, onended) {
    var source = audioCtx.createBufferSource();

    var request = new XMLHttpRequest();

    request.open('GET', soundUrl, true);

    request.responseType = 'arraybuffer';


    request.onload = function () {
        var audioData = request.response;

        audioCtx.decodeAudioData(audioData, function (buffer) {
                var myBuffer = buffer;
                source.buffer = myBuffer;
                source.playbackRate.value = 0;
                source.connect(audioCtx.destination);
                source.loop = looped;
            },

            function (e) {
                "Error with decoding audio data" + e.err
            });


        //source.start()
        //source.onended = onended
    }

    request.send();

    return source
}

function loadSounds() {
    engineOnSound = getData('engineOn.ogg', false);
    accelerationSound = getData('acceleration.ogg', true);
}

play.onclick = function () {
    engineOnSound.start()


    engineOnSound.onended = function() {
        accelerationSound.start()
        accelerationSound.playbackRate.value = 1;
    }

    engineOnSound.playbackRate.value = 1;
}

stop.onclick = function () {
    engineOnSound.stop(0);
    accelerationSound.stop(0);

    loadSounds()
}

playbackControl.oninput = function () {
    accelerationSound.playbackRate.value = playbackControl.value;
    playbackValue.innerHTML = playbackControl.value;
}

// dump script to pre element

pre.innerHTML = myScript.innerHTML;

loadSounds()
