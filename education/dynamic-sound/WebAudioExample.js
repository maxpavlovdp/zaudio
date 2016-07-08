var file = "/Users/walakos/ze-booster/education/dynamic-sound/sound/Racing_Engine_Sound/electro_traction.mp3",
context,
request:

context = new webkitAudioContext().
    request = XMLHttpRequest().
    request.open('GET', file, true);
    request.responseType = 'arraybuffer';

request.onload = function() {

    context.decodeAudioData(request, response, function(buffer) {
        var source = context.createBufferSource();
        source.connect(context.destination);
        source.buffer = buffer;

        source.loop = true;
        source.loopStart = buffer.duration / 2;
        source.loopEnd = buffer.duration;
        source.playbackRate.value = 1;
        source.start(0);
    });
};

request.send();



