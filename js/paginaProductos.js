//IMPORTS
import {productos} from "../db/productos.js"; 
import {comprarProducto} from "./carrito.js"; //importo la funcion comprarProducto
import {eliminarProducto} from "./administrador.js";
//LOGIN
//Traigo el id del boton
const botonUsuario = document.getElementById("botonUsuario");
//Traigo al usuarioLogeado
let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))
//PRODUCTOS
const contenedorProductos = document.getElementById("contenedorProductos");

//Traigo productos disponibles
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));

//FUNCION para poner productos
export const generarCardsProductos = (productos) => {
    contenedorProductos.innerHTML = "";
    
    
    productos.forEach((producto) => {
        const { imagen, nombre, categoria, precio, id } = producto;
        let card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
        <img src="${imagen}" alt="">
        <h4>${nombre}</h4>
        <p>Categoría: ${categoria}</p>
        <P>Precio: $${precio}</P>
        <button class="boton" id="botonComprar${id}">COMPRAR</button>
        ${
            usuarioLogeado?.admin === true ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`  : ""
            
        }
        </div>
        </div>`;
        contenedorProductos.appendChild(card);
        //Para comprar ese producto en particular
        const botonComprar = document.getElementById(`botonComprar${id}`);
        botonComprar.addEventListener("click", () => comprarProducto(id));
        //Opcion para agregar boton de eliminar si soy admin
        if(usuarioLogeado?.admin === true){
            const botonEliminar = document.getElementById(`eliminar${id}`)
            botonEliminar.addEventListener("click", () => eliminarProducto(id))
        }
    })
};

const UserLogin = document.getElementById("userLogin");

//Recarga de evento para correr funcion + desloguear usuario
document.addEventListener("DOMContentLoaded", () => {
    if (usuarioLogeado === null){
        const a = document.createElement("a")
        a.href = "../pages/usuarios.html"
        botonUsuario.appendChild(a)
    }else{
        botonUsuario.style.display="none"
        imgUsuario.style.display="none"
        const div = document.createElement("div")
        div.classList.add("divUsuario");
        const close = document.createElement("button")
        div.innerHTML = `
        <p>Bienvenido/a ${usuarioLogeado.user}</p>
        <img class="imagenPerfil" src ="${usuarioLogeado.img}">
        
        `
        
        close.id = "cerrarSesion"
        close.innerHTML = "cerrar sesion"
        close.addEventListener("click", () => {
            sessionStorage.removeItem("usuario")
            location.reload()
        })
        userLogin.appendChild(div)
        userLogin.appendChild(close)
    }
    generarCardsProductos (productosDisponibles)
});

//FILTROS
const filterInput = document.getElementById("buscador");
//Por imput
filterInput.addEventListener("keyup", (e) => {
    const productosFilter = productosDisponibles.filter((producto) => producto.nombre.toLowerCase().includes(e.target.value))
    productosDisponibles = productosFilter
    if(e.target.value !== ""){
        generarCardsProductos(productosFilter)
    }else{
        productosDisponibles = JSON.parse(localStorage.getItem("productos"))
        generarCardsProductos(productosDisponibles)
    }
});

//Por Categoría
const filterLista = document.getElementById("filterLista");
filterLista.addEventListener("click", (e) => {
    const productosFilter = productosDisponibles.filter((producto) => producto.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
    productosDisponibles = productosFilter
    if(e.target.innerHTML !== "Todos"){
        generarCardsProductos(productosFilter)
    }else{
        productosDisponibles = JSON.parse(localStorage.getItem("productos"))
        generarCardsProductos(productosDisponibles)
    }
});

  // Ordenar por precio
const ordenarPrecio = document.getElementById("ordenarPrecio");
ordenarPrecio.addEventListener("click", (e) => {
    const orden = e.target.innerHTML
    let productos
    if(orden === "Menor a mayor"){
        productos = productosDisponibles.sort((a, b) => a.precio - b.precio)
    }else if(orden === "Mayor a menor"){
        productos = productosDisponibles.sort((a, b) => b.precio - a.precio)
    }
    console.log(productos);
    generarCardsProductos(productos)
});


import {imgPerfiles} from "../db/usuarios.js";


