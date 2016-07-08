//audiocontext creation

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

//uploading files to audiobufer from web source

var request = new XMLHttpRequest();
request.open("GET", '../sound/Racing_Engine_Sound/Engine_on.mp3', true);
request.open("GET", '../sound/Racing_Engine_Sound/Acceleration.mp3', true);
request.open("GET", '../sound/Racing_Engine_Sound/Recuperation.mp3', true);
request.open("GET", '../sound/Racing_Engine_Sound/Engine_off.mp3', true);
request.responseType = "arraybuffer";
 
var loader = this;
 
request.onload = function() {
    loader.context.decodeAudioData(
        request.response,
        function(buffer) {
            if (!buffer) {
                console.log('error decoding file data: ' + url);
                return;
            }
            loader.bufferList[index] = buffer;
            if (++loader.loadCount === loader.urlList.length){
                loader.onload(loader.bufferList);
            }
        },
        function(error) {
            console.error('decodeAudioData error', error);
        }
    );
};

//creation of buffer node

var sourceNode = audioCtx.createBufferSource();

//connecting source node to destination
// later it wiil be needed to connect it to processing nodes

sourceNode.connect(audioCtx.destination);
sourceNode.start(0);
sourceNode.stop();

//connecting playback speed to mouse wheel moving

//throttleSlider.onMove = function(val){
//    sourceNode.source.playbackRate.value = 10;
//};

//looping audio sample

//sourceNode.source.loop = true;

//assigntment loop start nad finish

//engineAudioSource.source.loopStart = 0.5;
//engineAudioSource.source.loopEnd = 1.5;
