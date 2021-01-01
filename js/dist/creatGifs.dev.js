"use strict";

//Se definen las funciones que van ejecutar la creaciòn de los GIFOS//
var video = document.querySelector('#video');
var videoContainer = document.querySelector('#video-container');
var recorder; // globally accessible

var progressBar = document.getElementById('GifLoading');
var GifoComplete = document.getElementById('GifoContainerFinish');
var preview;

function captureCamera(stream) {
  console.log('Entro en capture camara');
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  }).then(function (stream) {
    video.srcObject = stream;
  })["catch"](function (error) {
    console.error(error);
  });
  console.log('Vamos a imp el video', video.srcObject);
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

document.getElementById('start').onclick = function () {
  videoContainer.style.display = 'block';
  var hideContCreateGifs = document.getElementById('ContainerCreate');
  hideContCreateGifs.style.display = 'none';
  this.disabled = true;
  captureCamera(video.srcObject);
}; // CON ESTA FUNCIÒN COMENZAMOS LA CAPTURA DE GIF


document.getElementById("Capturegifs").addEventListener('click', function () {
  console.log('Se ingreó en recordinGifs()');
  recording = true;
  recorder = RecordRTC(video.srcObject, {
    //Almacenamos en la variable
    type: "gif",
    frameRate: 1,
    quality: 10,
    onGifRecordingStarted: function onGifRecordingStarted() {}
  });
  recorder.startRecording();
  getTime();
  document.getElementById("Gifscreen").style.display = "none";
  document.getElementById("containerReady").style.display = "block";
  document.getElementById("Stylcheck").style.display = "none";
  document.getElementById("stylcapture").style.display = "block";
});

function getTime() {
  var seconds = 0;
  var Counter = document.getElementById("time");
  var Counter2 = document.getElementById("time2");
  var minutes = 0;
  var time = setInterval(function () {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = "0" + seconds;
        }

        Counter.style.display = "block";
        Counter2.style.display = "block";
        Counter.innerHTML = "00:00:0".concat(minutes, ":").concat(seconds);
        Counter2.innerHTML = "00:00:0".concat(minutes, ":").concat(seconds);
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
    } else {
      clearInterval(time);
    }
  }, 1000);
}

document.getElementById('recordGif').addEventListener("click", function () {
  document.getElementById('frontBar').innerHTML = "\n  <span class=\"forward\" id=\"forward\">\n    <img  class =\"forwardContainer\"  src=\"./images/forward.svg\">\n  </span>\n  <div class=\"BarLoading\" id=\"BarLoading\" style=\"width:0;\"></div>\n  ";

  function ProgressBar() {
    var progressLoading = document.getElementById('BarLoading');
    setTimeout(function () {
      document.getElementById('forward').style.cssText = 'transition: none;';
      progressLoading.style.cssText = 'transition: all 2s ease;width:100%;';
    }, 1000);
  }

  ;
  ProgressBar();
  video.srcObject.getTracks().forEach(function (track) {
    track.stop();
  });
  recorder.stopRecording(function () {
    recording = false; // Se oculta video y muestra el preview del gif

    video.style.display = "none";
    preview = document.getElementById("gifPreview");
    preview.src = URL.createObjectURL(recorder.getBlob());
    console.log("preview establecido");
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("gifContainer").style.display = "block";
    document.getElementById("containerReady").style.display = "none";
    document.getElementById("Titlevideo").innerHTML = "\n    <p class='Stylcheck' id='Stylcheck'>Vista Previa</p>\n    <img class='closeGif' src='./images/button3.svg'> ";
    document.getElementById("previewGif").style.display = "block"; // Creamos el formulario para enviarlo por el body a giphy

    var form = new FormData();
    form.append("file", recorder.getBlob(), "myGif.gif");
    document.getElementById("Gifscreen").addEventListener("click", function () {
      uploadGif(form);
    });
  });
});

window.onload = function () {
  imagenDiaNoche();
  changeTheme();

  document.getElementById('upGif').onclick = function () {
    document.getElementById('previewGif').style.display = 'none';
    document.getElementById('Stylcheck').style.display = 'none';
    document.getElementById("Titlevideo").innerHTML = "\n      <p class='UpGifo' id='UpGifo'>Subiendo Guifo</p>\n      <img class='closeGif' src='./images/button3.svg'> ";
    var form = new FormData();
    form.append("file", recorder.getBlob(), "myGif.gif");
    uploadGif(form);
    videoContainer.style.display = 'block';
    videoContainer.style.display = 'block';
    videoContainer.style.display = 'block';
    var hideContCreateGifs = document.getElementById('ContainerCreate');
    hideContCreateGifs.style.display = 'none';
    this.disabled = true;
    captureCamera(video.srcObject);
  };
}; //Ahora vamos a definir la funciòn para subir el GIF y luego para descargarlo


function uploadGif(gif) {
  console.log('Se ejecuta la funcion de subir el gifo');
  document.getElementById('gifContainer').innerHTML = "\n  <div class='upGifos'>\n    <img src=\"./images/globe_img.png\">\n    <p class='upGifosTitle'>Estamos subiendo tu guifo...<p>\n    <div class=\"progressGif\" id=\"progressGif\">\n      <div class=\"GifLoading\" id=\"GifLoading\" style=\"width:0;\"></div>\n    </div>\n    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 a\xF1os</span> algunos segundos</p>\n    <button class='StopGif'>\n      <a href='indexCreate.html'>Cancelar</a>\n    </button>\n  </div>";

  function ProgressLoad() {
    console.log('Se carga la barrita de la subida del GIFO');
    var progressBar = document.getElementById('GifLoading');
    setTimeout(function () {
      progressBar.style.cssText = 'transition: all 2s ease;width:99%;';
    }, 1000);
  }

  ;
  ProgressLoad();
  fetch("https://upload.giphy.com/v1/gifs?api_key=5c44dQP47Sp08444UvPPyAnTcqoReYrf", {
    method: "POST",
    body: gif
  }).then(function (response) {
    if (response.status === 200) {
      console.log('Gif subido!');
      return response.json();
    } else {
      console.log('error.');
    }
  }).then(function (data) {
    console.log(data);
    fetch("https://api.giphy.com/v1/gifs/".concat(data.data.id, "?&api_key=5c44dQP47Sp08444UvPPyAnTcqoReYrf")).then(function (response) {
      return response.json();
    }).then(function (data) {
      localStorage.setItem("MyGuifos-".concat(data.data.id), JSON.stringify(data.data));
      setTimeout(function () {
        document.getElementById("Titlevideo").innerHTML = "\n            <p class='StylFinish' id='StylFinish'>Guifo subido con \xE8xito</p>\n            <img class='closeGifFinish' src='./images/button3.svg'> ";
        console.log(gif);
        document.getElementById('principalVideoBody').innerHTML = " \n               \n            <div class='FinishGifo' id='FinishGifo'>\n              <img class='GifoContainerFinish' id='GifoContainerFinish' src='".concat(data.data.images.original.url, "'>\n              <div class='GifoFinishButton'>\n                <span class='CreateGifoText'>Guifo creado con \xE8xito</span>\n                <button class='CopyGifo'>Copiar Enlace Guifo</button>\n                <a href='").concat(preview.src, "' download='Gifo'>\n                <button class='DownloadGifo'>Descargar Guifo</button>\n                </a>\n                <button class='ReadyGifo'>Listo</button>\n              </div>\n            <div>");
        document.getElementById('GifoContainerFinish').style.cssText = 'width:371px;height:196px;margin-top: 30px;margin-left: 20px;';
        document.getElementById('FinishGifo').style.background = '#E6E6E6;';
      }, 1001); //document.getElementById('GifoFinishTit').addEventListener('click', () => {
      //  
      // window.location.href = "./MyGuifos.html";
      //});
    });
  });
}