"use strict";

var API_KEY = '5c44dQP47Sp08444UvPPyAnTcqoReYrf';
var searchInput = document.getElementById('input-search');
var buttonsearch = document.getElementById("buttonsearch");
var divcontainersugge = document.getElementsByClassName('divcontainersugge')[0];
var gif_img = document.getElementsByClassName('gif_img');
var tenden_conte_Gif = document.getElementsByClassName('trends-contain-Gif');
var divGif = document.getElementsByClassName('containersugge')[0];
var changeNight = document.getElementById('sayNight');
var changeDay = document.getElementById('sayDay');
var dayTheme = "./sass/style/dist/style.css";
var nightTheme = "./sass/style/dist/themenight.css"; //SUGGESTION//

var arraySuggestion = [];

function imagenDiaNoche() {
  if (localStorage.getItem("theme") == 2) {
    document.getElementById('imageGifNight').style.display = "block";
    document.getElementById('imageGif').style.display = "none";
  } else {
    document.getElementById('imageGifNight').style.display = "none";
    document.getElementById('imageGif').style.display = "block";
  }
}

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
}

;

document.getElementById('Menucontainerunfolded').onclick = function () {
  console.log('se ejecuto la funcion expandir botones');

  if (document.getElementById('containerdrop').style.display == "block") {
    document.getElementById('containerdrop').style.display = "none";
  } else {
    document.getElementById('containerdrop').style.display = "block";
  }
}; //Creacion de Gifos en la secciòn de sugerencias//


suggestion('random', 4).then(function (data) {
  var _loop = function _loop(i) {
    var GiftTitle = document.createElement('p');
    GiftTitle.textContent = data[i].title; //Se llama la variable que contiene un pàrrafo(p), para que luego en el p me traiga del data aleatorio en dicho pàrrafo para el tìtulo del GIFT en sugerencias.

    GiftTitle.innerHTML = '#' + data[i].title;
    var BtnverMas = document.createElement('button');
    var textBtnverMas = document.createTextNode('Ver màs...');
    var query = data[i].title;
    BtnverMas.className = 'seeMore';

    BtnverMas.onclick = function () {
      document.getElementById('trends-container').innerHTML = "";
      document.getElementById('principaltrends').innerHTML = "Resultados para: ".concat(query);
      document.getElementById('suggestions').style.display = "none";
      filter(query, 16);
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

  if (localStorage.getItem("theme") == 2) {
    document.getElementById('buttonsearch').style.background = '#EE3EFE';
    document.getElementById('Searchtext').style.color = '#100134';
    document.getElementById('fas fa-search').style.color = '#FAFAFA';
  } else {
    document.getElementById('buttonsearch').style.background = '#F7C9F3';
    document.getElementById('Searchtext').style.color = '#100134';
    document.getElementById('fas fa-search').style.color = '#100134';
  }

  console.log("botón de búsqueda habilitado");
  cleanButton();
} //Definimos la funciòn que va a permitir que cuando se borre el texto del input va a tomar el color normal nuevamente//


function cleanButton() {
  if (searchInput.value == "" && localStorage.getItem("theme") == 2) {
    document.getElementById('buttonsearch').style.background = '#B4B4B4';
    document.getElementById('Searchtext').style.color = '#8F8F8F';
    document.getElementById('fas fa-search').style.color = '#8F8F8F';
  } else if (searchInput.value == "" && localStorage.getItem("theme") == 1) {
    document.getElementById('buttonsearch').style.background = '#E6E6E6';
    document.getElementById('Searchtext').style.color = '#A09696';
    document.getElementById('fas fa-search').style.color = '#CDC3C3';
  } else if (searchInput.value != "" && localStorage.getItem("theme") == 2) {
    document.getElementById('buttonsearch').style.background = '#EE3EFE';
    document.getElementById('Searchtext').style.color = '#100134';
    document.getElementById('fas fa-search').style.color = '#FAFAFA';
  } else if (searchInput.value != "" && localStorage.getItem("theme") == 1) {
    document.getElementById('buttonsearch').style.background = '#F7C9F3';
    document.getElementById('Searchtext').style.color = '#100134';
    document.getElementById('fas fa-search').style.color = '#100134';
  }
}

; //Definimos la funciòn que nos va a permitir realizar las bùsquedas y va a realizar las bùsquedas de lo que sea que busquemos//

document.getElementById('buttonsearch').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('trends-container').innerHTML = "";
  var query = document.getElementById('input-search').value;
  document.getElementById('main-trends').style.display = "block";
  document.getElementById('suggestions').style.display = "none";
  document.getElementById('search-container').style.display = "none";
  document.getElementById('alliedbtn').style.display = "none";
  document.getElementById('principaltrends').innerHTML = "Resultados para: ".concat(query);
  filter(query, 16);
}); //Se define la funciòn de busqueda para el botòn buscar//

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
    var seeMore = document.getElementById('containerbtn');
    console.log(data); // imprimimos el Json completo

    seeMore.innerHTML = "";
    containerGif.innerHTML = "";

    for (var i = 0; i < 3; i++) {
      seeMore.innerHTML += "\n            <button class=\"containerMore\">\n                <p class=\"textContainer\">#".concat(data.data[i].title, "</p>\n            </button>");
    }

    for (var _i = 0; _i < data.data.length; _i++) {
      //console.log('titulos'); 
      //console.log(data.data[i].title);
      var hide = document.getElementById('suggestions');
      hide.style.display = 'none';
      var conceal = document.getElementById('main-trends');
      conceal.style.display = 'none';
      var search = document.getElementById('search-container');
      search.style.display = "block";
      containerGif.innerHTML += "\n            <div class=\"container-search\">\n            <div class=\"trends-container-Gif\">\n            <img class=\"img-gif\" src=\"".concat(data.data[_i].images.original.url, "\" alt=\"\">\n            <p class=\"text-end\">#").concat(data.data[_i].title, "</p>\n            </div>\n            </div>");
    }
  });
  document.getElementById('input-search').value = query;
  document.getElementById('randomHeader').innerHTML = "Resultados para: ".concat(query);
} //Se definen los eventos que van a limpiar la barra de bùsquedas para consultar de nuevo cualquiera de los tres botones//


document.getElementsByClassName('alliedbutton').addEventListener = function () {
  document.getElementById('randomHeader').innerHTML = "";
  document.getElementById('input-search').value = "";
  console.log(query);
}; //Ahora se define las funciones que van a permitir cambiar los estilos o temas de la página, de día y de noche//
//se define el tema de dia y de noche//


changeNight.addEventListener('click', function () {
  document.getElementById('changeTheme').href = nightTheme;
  saveCurrentThemeLS();
  imagenDiaNoche();
  cleanButton();
});
changeDay.addEventListener('click', function () {
  document.getElementById('changeTheme').href = dayTheme;
  saveCurrentThemeLS();
  imagenDiaNoche();
  cleanButton();
}); //Se define la funciòn que me va a almacenar en el Local Storage el tipo de tema, si es de dìa o de noche//

function saveCurrentThemeLS() {
  theme = document.getElementById("changeTheme").getAttribute("href");

  if (theme == dayTheme) {
    localStorage.setItem("theme", 1);
  } else {
    localStorage.setItem("theme", 2);
  }
} //Se define la funciòn que va a mostrar el tema en el momento que se carga la pagina//


window.onload = function () {
  changeTheme();
  imagenDiaNoche();
};

function changeTheme() {
  if (localStorage.getItem("theme") == 2) {
    document.getElementById('changeTheme').href = nightTheme;
  } else {
    document.getElementById('changeTheme').href = dayTheme;
  }
}