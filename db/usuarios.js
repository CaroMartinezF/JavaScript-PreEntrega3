export let usuariosBase = [
    {
        id: 1,
        user: "Carolina",
        pass: "caro",
        admin: true
    }
];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(usuariosBase));

//IMAGEN USUARIOS
const accesKey = "ZGpQVYJ4bpIUJ4eqkZ1KBlaS4vOfbgHvMkEro8y4r2c";
const endPoint = 'https://api.unsplash.com/search/photos';

export let imgPerfiles = [];

async function getImages(query){
    let response = await fetch(endPoint + '?query=' + query + 
    '&client_id=' + accesKey);
    let jsonResponse = await response.json();
    let imagesList = await jsonResponse.results
    //console.log(imagesList[0].urls.full);
    imgPerfiles = imagesList.map((imagen) => 
    imagen.urls.full
);
}

getImages("animal");
