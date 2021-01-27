

//Se definen las funciones que van ejecutar la creaciòn de los GIFOS//


var video = document.querySelector('#video');
var videoContainer = document.querySelector('#video-container');
var recorder; // globally accessible
let progressBar = document.getElementById('GifLoading');
let GifoComplete = document.getElementById('GifoContainerFinish');
var preview;
let pintGifos = document.getElementById('pintGifos');
let pintGifoContainer = document.getElementById('pintGifoContainer');

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


document.getElementById('start').addEventListener('click', ()=> {
  videoContainer.style.display='block'; 
  var hideContCreateGifs = document.getElementById('ContainerCreate');
  hideContCreateGifs.style.display='none';
  this.disabled = true;
  captureCamera(video.srcObject);
});


// CON ESTA FUNCIÒN COMENZAMOS LA CAPTURA DE GIF
document.getElementById("Capturegifs").addEventListener('click',()=>{
  console.log('Se ingreó en recordinGifs()');
    recording = true;
    recorder = RecordRTC(video.srcObject, { //Almacenamos en la variable
      type: "gif",
      frameRate: 1,
      quality: 10,
      onGifRecordingStarted: function () {
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
  document.getElementById('frontBar').innerHTML = `
  <span class="forward" id="forward">
    <img  class ="forwardContainer"  src="./images/forward.svg">
  </span>
  <div class="BarLoading" id="BarLoading" style="width:0;"></div>
  `
  function ProgressBar(){
    let progressLoading = document.getElementById('BarLoading');
    setTimeout(() => {
      document.getElementById('forward').style.cssText = 'transition: none;'
      progressLoading.style.cssText = 'transition: all 2s ease;width:100%;';
    }, 2000);
  };
  ProgressBar();

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
    document.getElementById("gifContainer").style.display = "block";
    document.getElementById("containerReady").style.display = "none";
    document.getElementById("Titlevideo").innerHTML = `
    <p class='Stylcheck' id='Stylcheck'>Vista Previa</p>
    <img class='closeGif' src='./images/button3.svg'> `
    document.getElementById("previewGif").style.display = "block";

    // Creamos el formulario para enviarlo por el body a giphy

    let form = new FormData();
    form.append("file", recorder.getBlob(), "myGif.gif");
    
    document.getElementById("Gifscreen").addEventListener("click", () => {
      uploadGif(form);
    });
  });
});

//Se define la funcion que va a mostrar los GIFOS creados//

async function getMisGifos() {
  let idsMyGuifos = JSON.parse(localStorage.getItem("ContMyGifos")); 
  let  arrayData= [];
  try{
      for(let i=0;i<idsMyGuifos.length;i++){
      const response = await fetch(`https://api.giphy.com/v1/gifs/${idsMyGuifos[i]}?api_key=${API_KEY}`)
      let data = await response.json();
      let gifosData = data.data;      
      arrayData.push(gifosData); 
      }      
      return arrayData;
  }catch(e){
      return e;

  }
};



window.onload = function() {
  
  imagenDiaNoche();
  changeTheme();
  document.getElementById('upGif').onclick = function() {
      document.getElementById('previewGif').style.display = 'none';
      document.getElementById('Stylcheck').style.display = 'none';
      document.getElementById("Titlevideo").innerHTML = `
      <p class='UpGifo' id='UpGifo'>Subiendo Guifo</p>
      <img class='closeGif' src='./images/button3.svg'> `
      let form = new FormData();
      form.append("file", recorder.getBlob(), "myGif.gif");
      uploadGif(form);
      videoContainer.style.display='block'; 
      videoContainer.style.display='block'; 
      videoContainer.style.display='block'; 
      var hideContCreateGifs = document.getElementById('ContainerCreate');
      hideContCreateGifs.style.display='none';
      this.disabled = true;
      captureCamera(video.srcObject);
  };
  document.getElementById('myGifos').style.display = 'none';
  document.getElementById('galery').style.display = 'none';
  document.getElementById('titleMyGifos').style.display = 'none';
  
};

//Ahora vamos a crear la funciòn que va a permitir copiar el GIFO//

function GifoCopy() {
  console.log(preview.src);
  alert('Se va a copiar el enlace del GIFO');
  let copyLink = document.getElementById('copylink');
  copyLink.style.display = 'block';
  copyLink.select();
  copyLink.value = preview.src;
  document.execCommand('copy');
  copyLink.style.display = 'none';
};

//Ahora vamos a crear la funciòn que va a permitir la descarga del GIF//

function downloadGif() {
  console.log('Se ejecuta la funcion de descargar el GIFO');
    let linkGifo = document.createElement('a');
    linkGifo.href = URL.createObjectURL(recorder.getBlob());
    linkGifo.setAttribute('download', 'gifo');
    document.body.appendChild(linkGifo);
    linkGifo.click();
    linkGifo.remove();
}


//Ahora vamos a definir la funciòn para subir el GIF//

function uploadGif(gif) {
  console.log('Se ejecuta la funcion de subir el gifo');
  document.getElementById('gifContainer').innerHTML = `
  <div class='upGifos' id='upGifos'>
    <img src="./images/globe_img.png">
    <p class='upGifosTitle'>Estamos subiendo tu guifo...<p>
    <div class="progressGif" id="progressGif">
      <div class="GifLoading" id="GifLoading" style="width:0;"></div>
    </div>
    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 años</span> algunos segundos</p>
    <button class='StopGif'>
      <a href='indexCreate.html'>Cancelar</a>
    </button>
  </div>`;
  function ProgressLoad(){
    console.log('Se carga la barrita de la subida del GIFO');
    let progressBar = document.getElementById('GifLoading');
    setTimeout(() => {
      progressBar.style.cssText = 'transition: all 2s ease;width:99%;';
    }, 2000);
  };
  ProgressLoad();

  fetch(
    `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,
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
        `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=${API_KEY}`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          
          if(!localStorage.getItem("ContMyGifos")){
            localStorage.setItem("ContMyGifos","[]");
          }
          let arrayId = JSON.parse(localStorage.getItem("ContMyGifos"));
          arrayId.push(data.data.id);
          localStorage.setItem('ContMyGifos',JSON.stringify(arrayId));

          setTimeout(() => {
            getMisGifos().then(data =>

                  data.forEach(element => {
                  pintGifos.innerHTML += `
                  <div class="myGifosCont">                
                      <img class="imageMyGifos" src="${element.images.original.url}" alt="">                
                  </div>`  
                  
                  })
              );
          
            preview.src = data.data.images.original.url;

            document.getElementById('principalVideoBody').innerHTML = `               
              <div class='FinishGifo' id='FinishGifo'>
                <p class='TitlevideoFinish' id='TitlevideoFinish'>Guifo subido con èxito
                <img class='closeGifFinish' src='./images/button3.svg'>
                </p>
                <img class='GifoContainerFinish' id='GifoContainerFinish' src='${preview.src}'>
                <div class='GifoFinishButton'>
                  <p class='CreateGifoText'>Guifo creado con èxito</span>
                  <input type='text' id='copylink' style="display:none;">
                  <button class='CopyGifo' onclick="GifoCopy()" id='CopyGifo'>Copiar Enlace Guifo</button>
                  <button class='downloadGifo' onclick="downloadGif()" id='downloadGifo'>Descargar Guifo</button>
                  <button class='ReadyGifo' id='ReadyGifo'>
                    <a class='readyGifoBye'  href='indexCreate.html'>Listo<a/>
                  </button>
                </div>
              <div>`;

            

            
            document.getElementById('GifoContainerFinish').style.cssText = 'width:371px;height:196px;margin-top: 30px;margin-left: 20px;';
            document.getElementById('FinishGifo').style.background = '#E6E6E6;';
            document.getElementById('video-container').style.display = 'none';
            document.getElementById('galery').style.display = 'block';
            document.getElementById('myGifos').style.display = 'block';
          }, 2001);
        });
    });
}

//Ahora vamos a definir la funciòn que va a permitir ver los gifos guardados//

async function seeGifos() {
  document.getElementById('MainContainer').style.display = 'none';
  document.getElementById('containersearch').style.display = 'none';
  document.getElementById('fatherContainerGifo').style.display = 'block';
  document.getElementById('ContainerMyGifos').style.display = 'block';
  let pintGifoContainer = document.getElementById('pintGifoContainer');
  const data = await getMisGifos();
  data.forEach(async (element) => {
    pintGifoContainer.style.cssText = 'display:grid;grid-template-columns: repeat(4, 25%);row-gap:10px;column-gap:4px;';
    pintGifoContainer.innerHTML += `
      <div class="myGifosFinish" style="width:285px;height:295px;display: flex;flex-direction: row;flex-wrap: wrap;position: relative;" >                
        <img class="imageMyGifos" style="width: 300px;height: 295px;margin: 13px;margin-left: -1px;background: #E6E6E6;box-shadow: inset -2px -2px 0 0 #B4B4B4, inset 2px 2px 0 0 #FAFAFA;" src="${element.images.original.url}" alt="">                
      </div>`
  });
}