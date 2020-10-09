var video = document.querySelector('#video');

function captureCamera(stream) {

    console.log('Entro en capture camara')
    
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then(stream => {
        video.srcObject = stream;
      })
      .catch(error => {
        console.error(error);
      });

    console.log('Vamos a imp el video',video.srcObject)

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
    
    video.style.display='block'; 
    var hideContCreateGifs = document.getElementById('ContainerCreate');
    hideContCreateGifs.style.display='none';
    this.disabled = true;
    captureCamera(video.srcObject);
    //document.getElementById('stop').disabled = false;
};


// CON ESTA FUNCIÒN COMENZAMOS LA CAPTURA DE GIF
document.getElementById("Capturegifs").addEventListener('click',()=>{
  console.log('Se ingreó en recordinGifs()');
    recording = true;
    console.log("%%%%%%%",video.srcObject);
    recorder = RecordRTC(video.srcObject, { //Almacenamos en la variable
      type: "gif",
      frameRate: 1,
      quality: 10,
      onGifRecordingStarted: function () {
        console.log("begined");
      }
    });
    recorder.startRecording();
    console.log('video.srcObject===================================================  ', video.srcObject)
    //getDuration();
  
    /*document.getElementById("titleBox").innerHTML = "Capturando Tu Guifo";
    document.getElementById("startRecording").style.display = "none";
    document.querySelector(".stop").style.display = "block";*/
});

