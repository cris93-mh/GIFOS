"use strict";

//Se definen las funciones que van ejecutar la creaciòn de los GIFOS//
var video = document.querySelector('#video');
var videoContainer = document.querySelector('#video-container');
var recorder; // globally accessible

var progressBar = document.getElementById('GifLoading');
var GifoComplete = document.getElementById('GifoContainerFinish');
var preview;
var pintGifos = document.getElementById('pintGifos');

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
}); //Se define la funcion que va a mostrar los GIFOS creados//

function getMisGifos() {
  var idsMyGuifos, arrayData, i, response, data, gifosData;
  return regeneratorRuntime.async(function getMisGifos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          idsMyGuifos = JSON.parse(localStorage.getItem("ContMyGifos"));
          arrayData = [];
          _context.prev = 2;
          i = 0;

        case 4:
          if (!(i < idsMyGuifos.length)) {
            _context.next = 16;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/".concat(idsMyGuifos[i], "?api_key=").concat(API_KEY)));

        case 7:
          response = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context.sent;
          gifosData = data.data;
          arrayData.push(gifosData);

        case 13:
          i++;
          _context.next = 4;
          break;

        case 16:
          return _context.abrupt("return", arrayData);

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", _context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 19]]);
}

;

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

  document.getElementById('myGifos').style.display = 'none';
  document.getElementById('galery').style.display = 'none';
}; //Ahora vamos a crear la funciòn que va a permitir copiar el GIFO//


function GifoCopy() {
  console.log(preview.src);
  alert('Se va a copiar el GIFO');
  var copyLink = document.getElementById('copylink');
  copyLink.style.display = 'block';
  copyLink.select();
  copyLink.value = preview.src;
  document.execCommand('copy');
  copyLink.style.display = 'none';
}

; //Ahora vamos a crear la funciòn que va a permitir la descarga del GIF//

function downloadGif() {
  console.log('Se ejecuta la funcion de descargar el GIFO');
  var linkGifo = document.createElement('a');
  linkGifo.href = URL.createObjectURL(recorder.getBlob());
  linkGifo.setAttribute('download', 'gifo');
  document.body.appendChild(linkGifo);
  linkGifo.click();
  linkGifo.remove();
} //Ahora vamos a definir la funciòn para subir el GIF//


function uploadGif(gif) {
  console.log('Se ejecuta la funcion de subir el gifo');
  document.getElementById('gifContainer').innerHTML = "\n  <div class='upGifos' id='upGifos'>\n    <img src=\"./images/globe_img.png\">\n    <p class='upGifosTitle'>Estamos subiendo tu guifo...<p>\n    <div class=\"progressGif\" id=\"progressGif\">\n      <div class=\"GifLoading\" id=\"GifLoading\" style=\"width:0;\"></div>\n    </div>\n    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 a\xF1os</span> algunos segundos</p>\n    <button class='StopGif'>\n      <a href='indexCreate.html'>Cancelar</a>\n    </button>\n  </div>";

  function ProgressLoad() {
    console.log('Se carga la barrita de la subida del GIFO');
    var progressBar = document.getElementById('GifLoading');
    setTimeout(function () {
      progressBar.style.cssText = 'transition: all 2s ease;width:99%;';
    }, 1000);
  }

  ;
  ProgressLoad();
  fetch("https://upload.giphy.com/v1/gifs?api_key=".concat(API_KEY), {
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
    fetch("https://api.giphy.com/v1/gifs/".concat(data.data.id, "?&api_key=").concat(API_KEY)).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (!localStorage.getItem("ContMyGifos")) {
        localStorage.setItem("ContMyGifos", "[]");
      }

      var arrayId = JSON.parse(localStorage.getItem("ContMyGifos"));
      arrayId.push(data.data.id);
      localStorage.setItem('ContMyGifos', JSON.stringify(arrayId));
      setTimeout(function () {
        getMisGifos().then(function (data) {
          return data.forEach(function (element) {
            pintGifos.innerHTML += "\n                  <div class=\"myGifosCont\">                \n                      <img class=\"imageMyGifos\" src=\"".concat(element.images.original.url, "\" alt=\"\">                \n                  </div>");
          });
        });
        preview.src = data.data.images.original.url;
        document.getElementById('principalVideoBody').innerHTML = "               \n              <div class='FinishGifo' id='FinishGifo'>\n                <p class='TitlevideoFinish' id='TitlevideoFinish'>Guifo subido con \xE8xito\n                <img class='closeGifFinish' src='./images/button3.svg'>\n                </p>\n                <img class='GifoContainerFinish' id='GifoContainerFinish' src='".concat(preview.src, "'>\n                <div class='GifoFinishButton'>\n                  <p class='CreateGifoText'>Guifo creado con \xE8xito</span>\n                  <input type='text' id='copylink' style=\"display:none;\">\n                  <button class='CopyGifo' onclick=\"GifoCopy()\" id='CopyGifo'>Copiar Enlace Guifo</button>\n                  <button class='downloadGifo' onclick=\"downloadGif()\" id='downloadGifo'>Descargar Guifo</button>\n                  <button class='ReadyGifo' id='ReadyGifo'>\n                    <a class='readyGifoBye'  href='indexCreate.html'>Listo<a/>\n                  </button>\n                </div>\n              <div>");
        document.getElementById('GifoContainerFinish').style.cssText = 'width:371px;height:196px;margin-top: 30px;margin-left: 20px;';
        document.getElementById('FinishGifo').style.background = '#E6E6E6;';
        document.getElementById('video-container').style.display = 'none';
        document.getElementById('galery').style.display = 'block';
        document.getElementById('myGifos').style.display = 'block';
      }, 1001);
    });
  });
} //Ahora vamos a definir la funciòn que va a permitir ver los gifos guardados//


function seeGifos() {
  console.log('Se ejecuta la funciòn que va a permitir mostrar los gifs');
  document.getElementById('containersearch').style.display = 'none';
  document.getElementById('suggestions').style.display = 'none';
  document.getElementById('main-trends').style.display = 'none';
  document.getElementById('galery').style.display = 'block';
  document.getElementById('myGifos').style.display = 'block';

  function getMisGifos() {
    var idsMyGuifos, arrayData, i, response, data, gifosData;
    return regeneratorRuntime.async(function getMisGifos$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            idsMyGuifos = JSON.parse(localStorage.getItem("ContMyGifos"));
            arrayData = [];
            _context2.prev = 2;
            i = 0;

          case 4:
            if (!(i < idsMyGuifos.length)) {
              _context2.next = 16;
              break;
            }

            _context2.next = 7;
            return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/".concat(idsMyGuifos[i], "?api_key=").concat(API_KEY)));

          case 7:
            response = _context2.sent;
            _context2.next = 10;
            return regeneratorRuntime.awrap(response.json());

          case 10:
            data = _context2.sent;
            gifosData = data.data;
            arrayData.push(gifosData);

          case 13:
            i++;
            _context2.next = 4;
            break;

          case 16:
            return _context2.abrupt("return", arrayData);

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", _context2.t0);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 19]]);
  }

  ;
  getMisGifos().then(function (data) {
    return data.forEach(function (element) {
      pintGifos.innerHTML += "\n        <div class=\"myGifosCont\">                \n          <img class=\"imageMyGifos\" src=\"".concat(element.images.original.url, "\" alt=\"\">                \n        </div>");
    });
  });
}

;