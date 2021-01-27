const API_KEY = 'x4qXAjjRXaIgG0YjMdT9G8iHTFEKR1qG';
let searchInput = document.getElementById('input-search');
let buttonsearch = document.getElementById("buttonsearch");
let divcontainersugge = document.getElementsByClassName('divcontainersugge')[0];
let gif_img = document.getElementsByClassName('gif_img')
let tenden_conte_Gif = document.getElementsByClassName('trends-contain-Gif')
let divGif = document.getElementsByClassName('containersugge')[0];
let changeNight = document.getElementById('sayNight');
let changeDay =document.getElementById('sayDay');
let dayTheme ="./sass/style/dist/style.css";
let nightTheme ="./sass/style/dist/themenight.css";

//SUGGESTION//
let arraySuggestion = [];

function imagenDiaNoche(){
    if (localStorage.getItem("theme") == 2) {
        document.getElementById('imageGifNight').style.display = "block";
        document.getElementById('imageGif').style.display = "none";       
    }else{
        document.getElementById('imageGifNight').style.display = "none";
        document.getElementById('imageGif').style.display = "block";
    }

}

async function suggestion(query, cantidad) {    
    try {
        let apiGifos= `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${cantidad}&offset=2&rating=G&lang=en`;
        let response = await fetch(apiGifos);
        arraySuggestion = await response.json();
        console.log(arraySuggestion);
        return arraySuggestion.data;   
    
    }catch (e){ 
        return e;
    } 
};



document.getElementById('Menucontainerunfolded').onclick=()=> {
    console.log('se ejecuto la funcion expandir botones');
    
    if(document.getElementById('containerdrop').style.display =="block"){
        document.getElementById('containerdrop').style.display ="none";
        
    }else {
        document.getElementById('containerdrop').style.display ="block";
    }
};

//Creacion de Gifos en la secciòn de sugerencias//


suggestion('random',4)

    .then(data => {  
        
        for(let i = 0; i<data.length; i++) {
        let GiftTitle = document.createElement('p');
        GiftTitle.textContent = data[i].title;//Se llama la variable que contiene un pàrrafo(p), para que luego en el p me traiga del data aleatorio en dicho pàrrafo para el tìtulo del GIFT en sugerencias.
        GiftTitle.innerHTML = '#' + data[i].title;
        let BtnverMas = document.createElement('button');
        let textBtnverMas = document.createTextNode('Ver màs...');
        let query = data[i].title;
        BtnverMas.className = 'seeMore';
        BtnverMas.onclick = function () {
            document.getElementById('trends-container').innerHTML = "";                        
            document.getElementById('principaltrends').innerHTML = `Resultados para: ${query}`
            document.getElementById('suggestions').style.display = "none";

            filter(query, 16);
        };
        BtnverMas.appendChild(textBtnverMas);
                
        let divBtnverMas = document.createElement('div');
        divBtnverMas.className = 'tenden_conteGif_BtnverMas headerDark';
        divBtnverMas.appendChild(BtnverMas);

        let gif_img = document.createElement('img');
        gif_img.className = 'gif_img';
        gif_img.src = data[i].images.original.url;

        let dismiss_button = document.createElement('img')
        dismiss_button.src = '../images/button3.svg';
        dismiss_button.className = 'dismiss-button';
        
        let divConteGif = document.createElement('div');
        let divTittleGif = document.createElement('div');
        divConteGif.className = 'container-conteGif';
        divTittleGif.appendChild(GiftTitle);
        divTittleGif.appendChild(dismiss_button);
        divConteGif.appendChild(divTittleGif);
        divConteGif.appendChild(gif_img);
        divConteGif.appendChild(divBtnverMas);
    
        divGif.appendChild(divConteGif);
        
        }
    }).catch(e => console.log(e)) 



//---TRENDS---//
function busqueda(query,cantidad) {
    console.log(query);

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${cantidad}&offset=2&rating=G&lang=en`)
    
    .then((response) => {
        return response.json()
    })
    .then((data) => {
            
        //console.log(json.data); // imprimimos solo el atributo data del Json 
        //console.log(data); // imprimimos el Json completo
        
           
        for(let i = 0; i< data.data.length; i++){     
            
            document.getElementById('trends-container').innerHTML += `
            <div class="container-search">
            <div class="trends-contain-Gif">
            <img class="img-gif" src="${data.data[i].images.original.url}" alt="">
            <p class="text-finish">#${data.data[i].title}</p>
            </div>
            </div>`                
        }
    
    })
    
}

//////////////////////

busqueda("random",4);
busqueda("calamardo",4);
busqueda("dance",4);
busqueda("girls",4);
busqueda("rabbits",4);

//Definimos la funciòn para habilitar el botòn de bùsqueda cuando se va a buscar//


function activeButton() {
    
    console.log('se ejecuto la funcion de activar los botones');
    
    if (localStorage.getItem("theme") == 2) {
        document.getElementById('buttonsearch').style.background = '#EE3EFE';
        document.getElementById('Searchtext').style.color = '#100134';
        document.getElementById('fas-fa-search').style.color = '#FAFAFA';
    }else{
        
        document.getElementById('Searchtext').style.color = '#100134';
        document.getElementById('fas-fa-search').style.color = '#100134';
    }
    console.log("botón de búsqueda habilitado");
    
    cleanButton();

}



//Definimos la funciòn que va a permitir que cuando se borre el texto del input va a tomar el color normal nuevamente//


function cleanButton() {
    
    
    if(searchInput.value == "" && localStorage.getItem("theme") == 2) {
        document.getElementById('buttonsearch').style.background = '#C1C1C1';
        document.getElementById('buttonsearch').style.border = 'none';
        document.getElementById('Searchtext').style.color = '#8F8F8F';
        document.getElementById('fas-fa-search').style.color = '#8F8F8F';
        document.getElementById('alliedbtn').style.display = 'none';
        
    }else if(searchInput.value == "" && localStorage.getItem("theme") == 1) {
        document.getElementById('buttonsearch').style.background = '#DADADA';
        document.getElementById('buttonsearch').style.border = 'none';
        document.getElementById('Searchtext').style.color = '#A09696';
        document.getElementById('fas-fa-search').style.color = '#CDC3C3';
        document.getElementById('alliedbtn').style.display = 'none';
        

    }else if(searchInput.value != "" && localStorage.getItem("theme") == 2) {

        document.getElementById('buttonsearch').style.background = '#EE3EFE';
        document.getElementById('Searchtext').style.color = '#100134';
        document.getElementById('fas-fa-search').style.color = '#FAFAFA';

    }else if(searchInput.value != "" && localStorage.getItem("theme") == 1) {
        document.getElementById('buttonsearch').style.background = '#F7C9F3';
        document.getElementById('Searchtext').style.color = '#100134';
        document.getElementById('fas-fa-search').style.color = '#100134';
    }
    
};


//Definimos la funciòn que nos va a permitir realizar las bùsquedas y va a realizar las bùsquedas de lo que sea que busquemos//

document.getElementById('buttonsearch').addEventListener('click', (event)=> {
    event.preventDefault();
    document.getElementById('trends-container').innerHTML = "";
    let query = document.getElementById('input-search').value;
    document.getElementById('main-trends').style.display = "block";
    document.getElementById('suggestions').style.display = "none";
    document.getElementById('search-container').style.display = "none";
    document.getElementById('alliedbtn').style.display = "none";
    document.getElementById('principaltrends').innerHTML = `Resultados para: ${query}`
    filter(query, 16);
});




//Creamos la funciòn que va a ocultar los botones de showHastag y va a mostrar los botones de la bùsqueda segùn a lo que se de click
//Funcion para los Gifos en el Botòn de Bùsqueda//
function filter(query) {

    

    document.getElementById('alliedbtn').style.display="none";
    document.getElementById('search-related').style.display="block";    
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=16&offset=2&rating=G&lang=en`)
    
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let containerGif = document.getElementById('containsearch');
        let seeMore = document.getElementById('containerbtn');

        console.log(data); // imprimimos el Json completo
        
        seeMore.innerHTML = "";
        containerGif.innerHTML = "";
        for(let i = 0; i<3; i++){
            seeMore.innerHTML += `
            <button class="containerMore">
                <p class="textContainer">#${data.data[i].title}</p>
            </button>`
            
        }
            
        for(let i = 0; i< data.data.length; i++){

            let hide = document.getElementById('suggestions');  
            hide.style.display='none';
            let conceal = document.getElementById('main-trends');
            conceal.style.display='none';
            let search = document.getElementById('search-container');
            search.style.display="block";
            containerGif.innerHTML += `
            <div class="container-search">
            <div class="trends-container-Gif">
            <img class="img-gif" src="${data.data[i].images.original.url}" alt="">
            <p class="text-end">#${data.data[i].title}</p>
            </div>
            </div>`                 
        }
    })
    document.getElementById('input-search').value = query;
    document.getElementById('randomHeader').innerHTML = `Resultados para: ${query}`;
}

//Se define la funcion que permite al borrar en el input los elementos de los tres botyones tambien se elimininen//

/*document.getElementById('input-search').addEventListener('keydown', ()=> { 
    console.log('se ejecuta la funcion de limpiar el boton');
    let elements = document.querySelector('allied');
    let searchInput = document.getElementById('input-search');
    if((searchInput.value.trim() !== "")){
     elements.style.visibility = 'visible';
    }
    else{
     elements.style.visibility = 'hidden';
    }

});*/
//Se define la funciòn de busqueda para el botòn buscar//

function showHastag(query) {
    console.log(query);
    query=document.getElementById('input-search').value.trim();
    console.log(query);
    let showHastag = document.getElementById('alliedbtn');
    showHastag.style.display='block';
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=3&offset=5&rating=G&lang=en`)
    .then((response) => {
        return response.json();
    })
    .then((data) => { 
        console.log(data.data);
        if(data.data.length>0){
             for(let i=0; i<3;i++){
                showHastag.children[i].innerHTML = data.data[i].title;
             }        
        } 
    


    })
    

}


//Se definen los eventos que van a limpiar la barra de bùsquedas para consultar de nuevo cualquiera de los tres botones//

document.getElementsByClassName('alliedbutton').addEventListener=()=> {
    document.getElementById('randomHeader').innerHTML = "";
    document.getElementById('input-search').value = "";
    console.log(query);
};

//Definimos la función que me va a permitir deshabilitar completamente el botón de Buscar cuando el input esté vacío//

function disableButtonSearch() {
    let searchInput = document.getElementById('input-search');
    let buttonsearch = document.getElementById("buttonsearch");
    
  
  
    if (searchInput.value.trim() !== "") {
      console.log(searchInput.value)
      buttonsearch.removeAttribute('disabled');
      
      
    } else {
        buttonsearch.setAttribute('disabled', 'true')
      
    }
    
    console.log('Ya no puede buscar nada, se deshabilitó el botón...');
}  

//Ahora se define las funciones que van a permitir cambiar los estilos o temas de la página, de día y de noche//

//se define el tema de dia y de noche//



changeNight.addEventListener('click', ()=> {
    document.getElementById('changeTheme').href = nightTheme;  
    saveCurrentThemeLS();
    imagenDiaNoche();
    cleanButton();

});

changeDay.addEventListener('click', ()=> {
    document.getElementById('changeTheme').href = dayTheme;   
    saveCurrentThemeLS();
    imagenDiaNoche();
    cleanButton();

});

//Se define la funciòn que me va a almacenar en el Local Storage el tipo de tema, si es de dìa o de noche//

function saveCurrentThemeLS() {
    theme = document.getElementById("changeTheme").getAttribute("href");
    if (theme == dayTheme) {
      localStorage.setItem("theme", 1);
    } else {
      localStorage.setItem("theme", 2);
    }
}
//Se define la funciòn que va a mostrar el tema en el momento que se carga la pagina//

window.onload = function() {
    disableButtonSearch();
    changeTheme();
    imagenDiaNoche();
    cleanButton();
    
}



function changeTheme () {
    if (localStorage.getItem("theme") == 2) {
        document.getElementById('changeTheme').href = nightTheme;
        
    }else{

        document.getElementById('changeTheme').href = dayTheme;
        
    }
}





