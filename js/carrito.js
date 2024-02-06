import {productosDisponibles} from "./paginaProductos.js";

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]));
let carrito = JSON.parse(sessionStorage.getItem("carrito"));
//funcion ComprarProducto que la exporto para usar en paginaProductos
export const comprarProducto = (idProducto) =>{
    const producto = productosDisponibles.find((producto) => producto.id === idProducto) // Busco el producto
    const {nombre, precio, imagen, id} = producto
    const productoEnCarrito = carrito.find((producto) => producto.id === idProducto)
//Si el producto no se encuentra a través del id, entonces lo sumo al carrito de cero
    if(productoEnCarrito === undefined){
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }
    carrito.push(nuevoProductoCarrito)
    //Guardo el carrito en el sessionStorage.
    sessionStorage.setItem("carrito", JSON.stringify(carrito) );
    }else{//Si está, le agrego una cantidad y aumenta el precio
        const productoCarrito = carrito.findIndex((producto) => producto.id === idProducto)
        carrito[productoCarrito].cantidad++
        carrito[productoCarrito].precio = precio * carrito[productoCarrito].cantidad
        //Subo el carrtio
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    //Actualizo mi carrito
    carrito = JSON.parse(sessionStorage.getItem("carrito"))
    crearCarrito()
    Swal.fire({
        icon: "success",
        title: `Producto: ${nombre} agregado con exito al carrito`,
    });
}

//Crear carrito al tocar el boton de Carrito
document.addEventListener("DOMContentLoaded", () => {
    crearCarrito()
})

const listaCarrito = document.getElementById("items");
const totalesCarrito = document.getElementById("totales");
const botonCarrito = document.getElementById("botonCarrito");
const carritoTabla = document.getElementById("carrito");
//Para cuando haces click aparezca/desaparezca
botonCarrito.addEventListener("click", () =>{
    if(carritoTabla.style.display === "block"){
        carritoTabla.style.display = "none";
    } else{
        carritoTabla.style.display = "block"
        crearCarrito()
    }
})

//Funcion crearCarrito mostrar los que estan en el sessionStorage
const crearCarrito = () => {
    //Primero limpio el carrito asi se carga de nuevo
    listaCarrito.innerHTML= "" 
    carrito.forEach(producto =>{
        const {imagen, nombre, cantidad, precio, id} = producto
        let body = document.createElement("tr")
        body.className = "productoCarrito"
        body.innerHTML = `
        <th><img id="imagenProducto" class="imagenCarrito"src="${imagen}"</th>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio/cantidad}</td>
        <td>${precio}</td>
        <td>
        <button id="+${id}">+</button>
        <button id="-${id}">-</button>
        </td>
        `
        listaCarrito.append(body)
        //agrego dos botones para restar o sumar cantidad de producto
        const botonAgregar = document.getElementById(`+${id}`)
        const botonRestar = document.getElementById(`-${id}`)

        botonAgregar.addEventListener("click", () => aumentarCantidad(id))
        botonRestar.addEventListener("click", () => restarCantidad(id))
        
    });
    //Funcion de para la suma total
    crearTotales()
}
//FUNCION SUMA TOTAL
const crearTotales = () => {

    if(carrito.length > 0){
        totalesCarrito.innerHTML = ""

        let totales = document.createElement("tr")

        totales.innerHTML = `
        <th><b>Totales:</b></th>
        <td></td>
        <td>Cantidad: ${totalesFinales().cantidadTotal}</td>
        <td></td>
        <td>Precio: $${totalesFinales().costoTotal}</td>
        `

        totalesCarrito.append(totales)
    }else{
        totalesCarrito.innerHTML = "<p>Por el momento no cuentas con productos en el carrito</p>"
    }
};
const totalesFinales = () => {
    const costoTotal = carrito.reduce((total, {precio}) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal,
    }
};

const aumentarCantidad = (id) => {
    const productoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[productoCarrito].precio / carrito[productoCarrito].cantidad

    carrito[productoCarrito].cantidad++
    carrito[productoCarrito].precio = precio*carrito[productoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    crearCarrito()

}

const restarCantidad = (id) => {
    const productoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[productoCarrito].precio / carrito[productoCarrito].cantidad

    carrito[productoCarrito].cantidad--
    carrito[productoCarrito].precio = precio*carrito[productoCarrito].cantidad

    if(carrito[productoCarrito].cantidad === 0){
        carrito.splice(productoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    crearCarrito()
}