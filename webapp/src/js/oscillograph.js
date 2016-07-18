// Needed for dev purposes
var oscillograph = function (webAudioContext, oscillator) {

    var waveNumbr = 0;
    var waves = ['sine', 'square', 'sawtooth', 'triangle'];
    $('.waveform').on('click', function (e) {
        waveNumbr++;
        if (waveNumbr > 3) waveNumbr = 0;
        oscillator.type = waves[waveNumbr];
        $(this).html(waves[waveNumbr]);
    });

    var analyser = webAudioContext.createAnalyser();
    oscillator.connect(analyser);

    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    var canvas = document.getElementById('visualizer');
    var canvasContext = canvas.getContext('2d');


    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
        var drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        canvasContext.fillStyle = '#000';
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = '#3b3d45';
        canvasContext.beginPath();
        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;
            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }
            x += sliceWidth;
        }
        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();
    }

    draw();
};