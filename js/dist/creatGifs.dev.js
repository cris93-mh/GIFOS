"use strict";

var video = document.querySelector('#video');
var videoContainer = document.querySelector('#video-container');
var recorder; // globally accessible

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
  console.log("%%%%%%%", video.srcObject);
  recorder = RecordRTC(video.srcObject, {
    //Almacenamos en la variable
    type: "gif",
    frameRate: 1,
    quality: 10,
    onGifRecordingStarted: function onGifRecordingStarted() {
      console.log("begined");
    }
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

    document.getElementById("Gifscreen").addEventListener("click", function () {
      uploadGif(form);
    });
  });
}); //Ahora vamos a definir la funciòn para subir el GIF y luego para descargarlo

function uploadGif(gif) {
  document.getElementById('gifContainer').innerHTML = "\n  <div class='upGifos'>\n    <img src=\"./images/globe_img.png\">\n    <p class='upGifosTitle'>Estamos subiendo tu guifo...<p>\n    <div class=\"progressGif\" id=\"progressGif\">\n      <ul>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n      </ul>\n    </div>\n    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 a\xF1os</span> algunos segundos</p>\n  </div>\n  ";
  animateProgressBar();
  document.querySelector('.btns-upload-gif').innerHTML = "\n  <button class=\"btn-create-gif repeat push\" onclick=\"location.href='upload.html'\"><span>Cancelar</span></button>\n  ";
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
      localStorage.setItem("mygif-".concat(data.data.id), JSON.stringify(data.data));
      var alertGif = document.createElement('div');
      alertGif.className = 'alert-gif';
      alertGif.innerHTML = "\n          <p class='title-modal'> Guifo subido con \xE9xito! <span style='float: right'><img id='closeModal' src=\"./images/close.svg\"></span></p>\n          <div class='content-modal'>\n            <img class='gif-modal' src='".concat(data.data.images.original.url, "'>\n            <div class='gif-modal-btns'>\n              <button>Copiar Enlace Guifo</button>\n              <button>Descargar Guifo</button>\n            </div>\n          <div>\n          ");
      document.querySelector('.content').style.filter = 'grayscale(70%) blur(2px)';
      document.querySelector('.top-bar').style.filter = 'grayscale(70%) blur(2px)';
      document.body.append(alertGif); //document.getElementById('closeModal').addEventListener('click', () => {
      // window.location.href = "./my-gifos.html";
      // });
    });
  });
}

document.getElementById('upGif').onclick = function () {
  document.getElementById('previewGif').style.display = 'none';
  var form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  uploadGif(form);
  videoContainer.style.display = 'block';
  var hideContCreateGifs = document.getElementById('ContainerCreate');
  hideContCreateGifs.style.display = 'none';
  this.disabled = true;
  captureCamera(video.srcObject);
};