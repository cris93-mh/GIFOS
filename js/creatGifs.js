var video = document.querySelector('video');

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        console.error(error);
    });
}

function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());
    
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

var recorder; // globally accessible

document.getElementById('start').onclick = function() {
    var startVideo = document.getElementById('video');
    startVideo.style.display='block'; 
    var hideContCreateGifs = document.getElementById('ContainerCreate');
    hideContCreateGifs.style.display='none';
    this.disabled = true;
    captureCamera(function(camera) {
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;

        recorder = RecordRTC(camera, {
            type: 'video'
        });

        recorder.startRecording();

        // release camera on stopRecording
        recorder.camera = camera;

        document.getElementById('stop').disabled = false;
    });
};


function RecordingGif() {
    recording = true;
    recorder = RecordRTC(video.srcObject, { //Almacenamos en la variable
      type: "gif",
      frameRate: 1,
      quality: 10,
      onGifRecordingStarted: function () {
        console.log("begined");
      }
    });
  
    recorder.startRecording();
    getDuration();
  
    /*document.getElementById("titleBox").innerHTML = "Capturando Tu Guifo";
    document.getElementById("startRecording").style.display = "none";
    document.querySelector(".stop").style.display = "block";*/
  }


document.getElementById("Capturegifs").addEventListener('click',RecordingGif());

