// Needed for dev purposes
var oscillograph = function (soundControl) {
    var WIDTH = soundControl.canvas.width;
    var HEIGHT = soundControl.canvas.height;
    soundControl.analyser.fftSize = 2048;
    var bufferLength = soundControl.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    soundControl.canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
    function draw() {
        var drawVisual = requestAnimationFrame(draw);
        soundControl.analyser.getByteTimeDomainData(dataArray);
        soundControl.canvasContext.fillStyle = '#000';
        soundControl.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
        soundControl.canvasContext.lineWidth = 2;
        soundControl.canvasContext.strokeStyle = '#3b3d45';
        soundControl.canvasContext.beginPath();
        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;
            if (i === 0) {
                soundControl.canvasContext.moveTo(x, y);
            } else {
                soundControl.canvasContext.lineTo(x, y);
            }
            x += sliceWidth;
        }
        soundControl.canvasContext.lineTo(soundControl.canvas.width, soundControl.canvas.height / 2);
        soundControl.canvasContext.stroke();
    }

    draw();
};