const API_KEY = '5c44dQP47Sp08444UvPPyAnTcqoReYrf';

let buttonsearch = document.getElementById("buttonsearch")
let divcontainersugge = document.getElementsByClassName('divcontainersugge')[0];
let gif_img = document.getElementsByClassName('gif_img')
let tenden_conte_Gif = document.getElementsByClassName('trends-contain-Gif')
let divGif = document.getElementsByClassName('containersugge')[0];
console.log("se tomò el JS");

//SUGGESTION//
let arraySuggestion = [];

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
}


//creacion de gifos dinamicamente

suggestion('randon', 4) 
    .then(data => {  
        
        for(let i = 0; i<data.length; i++) {
        let GiftTitle = document.createElement('p');
        GiftTitle.textContent = data[i].title;//Se llama la variable que contiene un pàrrafo(p), para que luego en el p me traiga del data aleatorio en dicho pàrrafo para el tìtulo del GIFT en sugerencias.
        let BtnverMas = document.createElement('button');
        let textBtnverMas = document.createTextNode('Ver màs...');
        BtnverMas.id = 'seeMore';
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
        console.log(data); // imprimimos el Json completo
        
            
        for(let i = 0; i< data.data.length; i++){
            //console.log('titulos'); 
           //console.log(data.data[i].title);      
            
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
busqueda("onepiece",4);


//---
function showResults() {
    
    let search = document.getElementById("search").value.trim();

    if(contRelatedBtn.style.display = "flex"){
        contRelatedBtn.style.display = "none";
        tendenPheader.innerHTML = 'Resultados de la query';
        sugeContent.style.display ='none';
        divGif.style.display = 'none';
        relatedTags.style.zIndex = '-1';
    } 
   //creacion dinamica de resultados
    results(search)
        .then (data => {
            console.log(data);
            pBoxHeader.innerHTML = 'Resultados para: '+ search
            divSearch.innerHTML = '';
            relatedTags.innerHTML = '';
        
            for (let i = 0; i < 3; i++) {
                
                let searchRtag = document.createElement('button');
                searchRtag.className = 'searchRtag verMas'
                relatedTags.appendChild(searchRtag);
                let searchRtagText = document.createTextNode('#'+ data[i].title);
                searchRtag.appendChild(searchRtagText); 
            }
                      
            for(let i = 0; i<data.length; i++) {

                let BtnverMas = document.createElement('p');
                let textBtnverMas = document.createTextNode('#'+ data[i].title);
                BtnverMas.className = 'textBtnverMas';
                BtnverMas.appendChild(textBtnverMas);
                        
                let divBtnverMas = document.createElement('div');
                divBtnverMas.className = 'tenden_conteGif_BtnverMas headerDark';
                divBtnverMas.appendChild(BtnverMas);

                let gif_img = document.createElement('img');
                gif_img.className = 'gif_img';
                gif_img.src = data[i].images.original.url;
                
                let divConteGif = document.createElement('div');
                divConteGif.className = 'tenden_conte_Gif';
                divConteGif.appendChild(gif_img);
                divConteGif.appendChild(divBtnverMas);
            
                divSearch.appendChild(divConteGif);
            }
            

            //local storage para los element nuevos producto de la query
            if(localStorage.getItem("dark") == "true") {
                for (let i = 0; i < headerDark.length; i++) {
                    headerDark[i].style.backgroundImage = 'linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%)'
                }
                for (let i = 0; i < btnVerMas.length; i++) {
                    btnVerMas[i].style.backgroundColor = '#4180F6'
                };
            }else if(localStorage.getItem("dark") == "false") {
                for (let i = 0; i < headerDark.length; i++) {
                    headerDark[i].style.backgroundImage = 'linear-gradient(270deg, #ee3efe 0%, #2e32fb 100%)'
                }
                for (let i = 0; i < btnVerMas.length; i++) {
                    btnVerMas[i].style.backgroundColor = '#2E32FB'
                }
            }
            
        })
        .catch(e => console.log(e))
}

//botones Ver Mas
let _conteGif_HeaderText = document.getElementsByClassName('_conteGif_HeaderText')

function loadVerMas(random) {
let searchvermas = document.getElementById("explore")   

    searchvermas.value = random
    
    console.log(searchvermas)
    results(searchvermas)
    
    showResults()   

}




//busqueda para el botòn buscar



let queryBusqueda = document.getElementById("input-search").value;
console.log(queryBusqueda)
botonBuscar.click = busqueda(queryBusqueda,22);
function showHastag() {
    let showHastag = document.getElementById('alliedbtn')
    showHastag.style.display='block';
}
//Funcion para los Gifos en el Botòn de Bùsqueda//
function filter(query) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=16&offset=2&rating=G&lang=en`)
    
    .then((response) => {
        return response.json()
    })
    .then((data) => {
            
        //console.log(json.data); // imprimimos solo el atributo data del Json 
        console.log(data); // imprimimos el Json completo
        
            
        for(let i = 0; i< data.data.length; i++){
            //console.log('titulos'); 
           //console.log(data.data[i].title);
            let hide = document.getElementById('suggestions');  
            hide.style.display='none';
            let conceal = document.getElementById('main-trends');
            conceal.style.display='none';
            let search = document.getElementById('search-container');
            search.style.display="block";
            document.getElementById('containsearch').innerHTML += `
            <div class="container-search">
            <div class="trends-contain-Gif">
            <img class="img-gif" src="${data.data[i].images.original.url}" alt="">
            <p class="text-finish">#${data.data[i].title}</p>
            </div>
            </div>`                 
        }
    }) 
}




