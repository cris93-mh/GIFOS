"use strict";

var API_KEY = '5c44dQP47Sp08444UvPPyAnTcqoReYrf';
var buttonsearch = document.getElementById("buttonsearch");
var divcontainersugge = document.getElementsByClassName('divcontainersugge')[0];
var gif_img = document.getElementsByClassName('gif_img');
var tenden_conte_Gif = document.getElementsByClassName('trends-contain-Gif');
var divGif = document.getElementsByClassName('containersugge')[0]; //SUGGESTION//

var arraySuggestion = [];

function suggestion(query, cantidad) {
  var apiGifos, response;
  return regeneratorRuntime.async(function suggestion$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          apiGifos = "https://api.giphy.com/v1/gifs/search?api_key=".concat(API_KEY, "&q=").concat(query, "&limit=").concat(cantidad, "&offset=2&rating=G&lang=en");
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(apiGifos));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          arraySuggestion = _context.sent;
          console.log(arraySuggestion);
          return _context.abrupt("return", arraySuggestion.data);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
} //Creacion de Gifos en la secciòn de sugerencias//


suggestion('random', 4).then(function (data) {
  var _loop = function _loop(i) {
    var GiftTitle = document.createElement('p');
    GiftTitle.textContent = data[i].title; //Se llama la variable que contiene un pàrrafo(p), para que luego en el p me traiga del data aleatorio en dicho pàrrafo para el tìtulo del GIFT en sugerencias.

    var BtnverMas = document.createElement('button');
    var textBtnverMas = document.createTextNode('Ver màs...');
    var query = data[i].title;
    BtnverMas.className = 'seeMore';

    BtnverMas.onclick = function () {
      document.getElementById('trends-container').innerHTML = "";
      document.getElementById('principaltrends').innerHTML = "Resultados para: ".concat(query);
      busqueda(query, 12);
    };

    BtnverMas.appendChild(textBtnverMas);
    var divBtnverMas = document.createElement('div');
    divBtnverMas.className = 'tenden_conteGif_BtnverMas headerDark';
    divBtnverMas.appendChild(BtnverMas);
    var gif_img = document.createElement('img');
    gif_img.className = 'gif_img';
    gif_img.src = data[i].images.original.url;
    var dismiss_button = document.createElement('img');
    dismiss_button.src = '../images/button3.svg';
    dismiss_button.className = 'dismiss-button';
    var divConteGif = document.createElement('div');
    var divTittleGif = document.createElement('div');
    divConteGif.className = 'container-conteGif';
    divTittleGif.appendChild(GiftTitle);
    divTittleGif.appendChild(dismiss_button);
    divConteGif.appendChild(divTittleGif);
    divConteGif.appendChild(gif_img);
    divConteGif.appendChild(divBtnverMas);
    divGif.appendChild(divConteGif);
  };

  for (var i = 0; i < data.length; i++) {
    _loop(i);
  }
})["catch"](function (e) {
  return console.log(e);
}); //---TRENDS---//

function busqueda(query, cantidad) {
  console.log(query);
  fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat(API_KEY, "&q=").concat(query, "&limit=").concat(cantidad, "&offset=2&rating=G&lang=en")).then(function (response) {
    return response.json();
  }).then(function (data) {
    //console.log(json.data); // imprimimos solo el atributo data del Json 
    console.log(data); // imprimimos el Json completo

    for (var i = 0; i < data.data.length; i++) {
      document.getElementById('trends-container').innerHTML += "\n            <div class=\"container-search\">\n            <div class=\"trends-contain-Gif\">\n            <img class=\"img-gif\" src=\"".concat(data.data[i].images.original.url, "\" alt=\"\">\n            <p class=\"text-finish\">#").concat(data.data[i].title, "</p>\n            </div>\n            </div>");
    }
  });
} //////////////////////


busqueda("random", 4);
busqueda("calamardo", 4);
busqueda("dance", 4);
busqueda("girls", 4);
busqueda("rabbits", 4); //Definimos la funciòn para habilitar el botòn de bùsqueda cuando se va a buscar//

function activeButton() {
  document.getElementById('buttonsearch').disabled = false;
  document.getElementById('buttonsearch').style.background = '#F7C9F3';
  console.log("botón de búsqueda habilitado");
} //Definimos la funciòn que nos va a permitir realizar las bùsquedas y va a realizar las bùsquedas de lo que sea que busquemos//


document.getElementById('buttonsearch').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('trends-container').innerHTML = "";
  var querySearch = document.getElementById('input-search').value;
  document.getElementById('main-trends').style.display = "block";
  document.getElementById('suggestions').style.display = "none";
  document.getElementById('search-container').style.display = "none";
  busqueda(querySearch, 16);
}); //Definimos la funciòn que nos va a ocultar los botones que filtran luego de hacer click en alguno y luego de ello nos va a mostrar los GIFS en el elemento search-container//

document.getElementsByClassName('alliedbutton').addEventListener('click', function () {
  document.getElementById('alliedbtn').style.display = "none";
  document.getElementById('search-container').style.display = "block";
}); //Ahora vamos a crear la Funciòn que va a permitir ver màs elementos al darle click en el ver màs de las sugerencias//

function verMas(query) {
  busqueda(query, 16);
}

var seeMore = document.getElementById('seeMore');
seeMore.addEventListener('click', function () {}); //---

function showResults() {
  var search = document.getElementById("search").value.trim();

  if (contRelatedBtn.style.display = "flex") {
    contRelatedBtn.style.display = "none";
    tendenPheader.innerHTML = 'Resultados de la query';
    sugeContent.style.display = 'none';
    divGif.style.display = 'none';
    relatedTags.style.zIndex = '-1';
  } //creacion dinamica de resultados


  results(search).then(function (data) {
    console.log(data);
    pBoxHeader.innerHTML = 'Resultados para: ' + search;
    divSearch.innerHTML = '';
    relatedTags.innerHTML = '';

    for (var i = 0; i < 3; i++) {
      var searchRtag = document.createElement('button');
      searchRtag.className = 'searchRtag verMas';
      relatedTags.appendChild(searchRtag);
      var searchRtagText = document.createTextNode('#' + data[i].title);
      searchRtag.appendChild(searchRtagText);
    }

    for (var _i = 0; _i < data.length; _i++) {
      var BtnverMas = document.createElement('p');
      var textBtnverMas = document.createTextNode('#' + data[_i].title);
      BtnverMas.className = 'textBtnverMas';
      BtnverMas.appendChild(textBtnverMas);
      var divBtnverMas = document.createElement('div');
      divBtnverMas.className = 'tenden_conteGif_BtnverMas headerDark';
      divBtnverMas.appendChild(BtnverMas);

      var _gif_img = document.createElement('img');

      _gif_img.className = 'gif_img';
      _gif_img.src = data[_i].images.original.url;
      var divConteGif = document.createElement('div');
      divConteGif.className = 'tenden_conte_Gif';
      divConteGif.appendChild(_gif_img);
      divConteGif.appendChild(divBtnverMas);
      divSearch.appendChild(divConteGif);
    } //local storage para los element nuevos producto de la query


    if (localStorage.getItem("dark") == "true") {
      for (var _i2 = 0; _i2 < headerDark.length; _i2++) {
        headerDark[_i2].style.backgroundImage = 'linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%)';
      }

      for (var _i3 = 0; _i3 < btnVerMas.length; _i3++) {
        btnVerMas[_i3].style.backgroundColor = '#4180F6';
      }

      ;
    } else if (localStorage.getItem("dark") == "false") {
      for (var _i4 = 0; _i4 < headerDark.length; _i4++) {
        headerDark[_i4].style.backgroundImage = 'linear-gradient(270deg, #ee3efe 0%, #2e32fb 100%)';
      }

      for (var _i5 = 0; _i5 < btnVerMas.length; _i5++) {
        btnVerMas[_i5].style.backgroundColor = '#2E32FB';
      }
    }
  })["catch"](function (e) {
    return console.log(e);
  });
} //Se define la funciòn de busqueda para el botòn buscar//


function showHastag() {
  var showHastag = document.getElementById('alliedbtn');
  showHastag.style.display = 'block';
} //Creamos la funciòn que va a ocultar los botones de showHastag y va a mostrar los botones de la bùsqueda segùn a lo que se de click
//Funcion para los Gifos en el Botòn de Bùsqueda//


function filter(query) {
  document.getElementById('alliedbtn').style.display = "none";
  document.getElementById('search-related').style.display = "block";
  fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat(API_KEY, "&q=").concat(query, "&limit=16&offset=2&rating=G&lang=en")).then(function (response) {
    return response.json();
  }).then(function (data) {
    var containerGif = document.getElementById('containsearch');
    var seeMore = document.getElementById('containerbtn'); //console.log(json.data); // imprimimos solo el atributo data del Json 

    console.log(data); // imprimimos el Json completo

    seeMore.innerHTML = "";
    containerGif.innerHTML = "";

    for (var i = 0; i < 3; i++) {
      seeMore.innerHTML += "\n            <button class=\"containerMore\">\n                <p class=\"textContainer\">#".concat(data.data[i].title, "</p>\n            </button>");
    }

    for (var _i6 = 0; _i6 < data.data.length; _i6++) {
      //console.log('titulos'); 
      //console.log(data.data[i].title);
      var hide = document.getElementById('suggestions');
      hide.style.display = 'none';
      var conceal = document.getElementById('main-trends');
      conceal.style.display = 'none';
      var search = document.getElementById('search-container');
      search.style.display = "block";
      containerGif.innerHTML += "\n            <div class=\"container-search\">\n            <div class=\"trends-container-Gif\">\n            <img class=\"img-gif\" src=\"".concat(data.data[_i6].images.original.url, "\" alt=\"\">\n            <p class=\"text-end\">#").concat(data.data[_i6].title, "</p>\n            </div>\n            </div>");
    }
  });
  document.getElementById('input-search').value = query;
  document.getElementById('randomHeader').innerHTML = "Resultados para: ".concat(query);
} //Se definen los eventos que van a limpiar la barra de bùsquedas para consultar de nuevo cualquiera de los tres botones//


document.getElementsByClassName('alliedbutton').addEventListener = function () {
  document.getElementById('randomHeader').innerHTML = "";
  document.getElementById('input-search').value = "";
  console.log(query);
}; //Se define la funciòn para cambiar el estilo de dìa y de noche//


document.getElementById('Menucontainerunfolded').addEventListener('click', function () {
  if (document.getElementById('containerdrop').style.display == "block") {
    document.getElementById('containerdrop').style.display = "none";
  } else {
    document.getElementById('containerdrop').style.display = "block";
  }
});