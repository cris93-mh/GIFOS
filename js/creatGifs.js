var video = document.querySelector('#video');
var videoContainer = document.querySelector('#video-container');
var recorder; // globally accessible

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


document.getElementById('start').onclick = function() {
    videoContainer.style.display='block'; 
    var hideContCreateGifs = document.getElementById('ContainerCreate');
    hideContCreateGifs.style.display='none';
    this.disabled = true;
    captureCamera(video.srcObject);
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
    getTime();  
    document.getElementById("Gifscreen").style.display = "none";
    document.getElementById("containerReady").style.display = "block";
});


function getTime() {
  let seconds = 0;
  let Counter = document.getElementById("time");
  let Counter2 = document.getElementById("time2");

  
  let minutes = 0;
  let time = setInterval(() => {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = "0" + seconds;
        }
        Counter.style.display = "block";
        Counter2.style.display = "block";

        Counter.innerHTML = `00:00:0${minutes}:${seconds}`;
        Counter2.innerHTML = `00:00:0${minutes}:${seconds}`;
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


document.getElementById('recordGif').addEventListener("click",()=> {
  video.srcObject.getTracks().forEach(function (track) {
    track.stop();
  });
  recorder.stopRecording(function () {
    recording = false;
    // Se oculta video y muestra el preview del gif
    video.style.display = "none";
    preview = document.getElementById("gifPreview");
    preview.src = URL.createObjectURL(recorder.getBlob());
    console.log("preview establecido");
    document.getElementById("videoContainer").style.display = "none";
    console.log("Vìdeo ocultado");
    
    document.getElementById("gifContainer").style.display = "block";
    console.log("Mostrando contenedor de gif");
    document.getElementById("Titlevideo").innerHTML = "Vista Previa";
    console.log("Tìtulo cambiado");

    document.getElementById("previewGif").style.display = "block";
    console.log("Mostrando menù para subir o repetir git");


    // Creamos el formulario para enviarlo por el body a giphy
   

    document.getElementById("Gifscreen").addEventListener("click", () => {
      uploadGif(form);
    });
  });
});

//Ahora vamos a definir la funciòn para subir el GIF
function uploadGif(gif) {
  document.getElementById('gifContainer').innerHTML = `
  <div class='uploading-gif'>
    <img src="./images/globe_img.png" width = '50px' height = '50'>
    <p class='uploading-gif-title'>Estamos subiendo tu guifo...<p>
    <div class="progressGif" id="progressGif">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 años</span> algunos segundos</p>
  </div>
  `;
  animateProgressBar();
  document.querySelector('.btns-upload-gif').innerHTML = `
  <button class="btn-create-gif repeat push" onclick="location.href='upload.html'"><span>Cancelar</span></button>
  `
  
  fetch(
    "https://upload.giphy.com/v1/gifs?api_key=5c44dQP47Sp08444UvPPyAnTcqoReYrf",
    {
      method: "POST",
      body: gif
    }
  )
    .then(response => {
      if (response.status === 200) {
        console.log('Gif subido!');
        return response.json();
      } else {
        console.log('error.');
      }
    })
    .then(data => {
      console.log(data);
      fetch(
        `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=5c44dQP47Sp08444UvPPyAnTcqoReYrf`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          localStorage.setItem(
            `mygif-${data.data.id}`,
            JSON.stringify(data.data)
          );
          let alertGif = document.createElement('div');
          alertGif.className = 'alert-gif';
          alertGif.innerHTML = `
          <p class='title-modal'> Guifo subido con éxito! <span style='float: right'><img id='closeModal' src="./images/close.svg"></span></p>
          <div class='content-modal'>
            <img class='gif-modal' src='${data.data.images.original.url}'>
            <div class='gif-modal-btns'>
              <button>Copiar Enlace Guifo</button>
              <button>Descargar Guifo</button>
            </div>
          <div>
          `;
          document.querySelector('.content').style.filter = 'grayscale(70%) blur(2px)';
          document.querySelector('.top-bar').style.filter = 'grayscale(70%) blur(2px)';
          document.body.append(alertGif);
          document.getElementById('closeModal').addEventListener('click', () => {
            document.querySelector('.alert-gif').style.display = 'none';
            window.location.href = "./my-gifos.html";
          });
        });
    });
}

document.getElementById('upGif').onclick = function() {
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  uploadGif(form);
  videoContainer.style.display='block'; 
  var hideContCreateGifs = document.getElementById('ContainerCreate');
  hideContCreateGifs.style.display='none';
  this.disabled = true;
  captureCamera(video.srcObject);
};
