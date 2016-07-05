//создание аудиоконтекста

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

//загрузка файла в буфер из сети

var request = new XMLHttpRequest();
request.open("GET", url, true);
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

//создание узла буфера (семплера) - таких надо будет 6

var sourceNode = audioContext.createBufferSource();

//подключение узла - некоторых узлов обработки согласно предварительному плану тут пока не хватает
// в этом я буду также нуждаться в вашей помощи

sourceNode.connect(audioContext.destination);
sourceNode.start(0);
sourceNode.stop();

//привязка изменения скорости воспроизведения к контроллеру
//здесь не знаю как правильно сделать, ведь контроллером должен стать не слайдер, а колесико мышки

throttleSlider.onMove = function(val){
    sourceNode.source.playbackRate.value = val;
};

//закольцовывание аудиофрагмента

sourceNode.source.loop = true;

//назначение старта и финиша закольцованного фрагмента

engineAudioSource.source.loopStart = 0.5;
engineAudioSource.source.loopEnd = 1.5;
