// define variables
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var pre = document.querySelector('pre');
var myScript = document.querySelector('script');
var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

var playbackControl = document.querySelector('.playback-rate-control');
var playbackValue = document.querySelector('.playback-rate-value');

var eoSound;
var aSound;

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
    eoSound = getData('engineOn.ogg', false);
    aSound = getData('acceleration.ogg', true);
}

play.onclick = function () {
    eoSound.start()
    aSound.start()

    eoSound.playbackRate.value = 1;
    aSound.playbackRate.value = 1;
}

stop.onclick = function () {
    eoSound.stop(0);
    aSound.stop(0);

    loadSounds()
}

playbackControl.oninput = function () {
    eoSound.playbackRate.value = playbackControl.value;
    aSound.playbackRate.value = playbackControl.value;
    playbackValue.innerHTML = playbackControl.value;
}

// dump script to pre element

pre.innerHTML = myScript.innerHTML;

loadSounds()



loadSounds()