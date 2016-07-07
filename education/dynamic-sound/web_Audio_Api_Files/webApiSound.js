//audiocontext creation

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

//uploading files tu audiobufer from web source

var request = new XMLHttpRequest();
request.open("GET", '../sound/Racing_Engine_Sound/electro_traction.mp3', true);
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

//creation of buffer node - 6 needed

var sourceNode = audioCtx.createBufferSource();

//connecting source node to processing nodes - I will need your help there

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
