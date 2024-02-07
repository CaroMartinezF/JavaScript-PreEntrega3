const formLogin = document.getElementById("loginUsuario");
const botonLogin = document.getElementById("botonLogueo");
const botonRegistrarse = document.getElementById("botonRegistrarse");
const formRegistrarse = document.getElementById("registroUsuario");
import {imgPerfiles} from "../db/usuarios.js";
console.log(imgPerfiles);
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
//Creo una clase constructora de un nuevo Usuario, con los datos, y por default el permiso de administrador como false.
class nuevoUsuario{
    constructor(user, pass){
        this.id = usuarios.length + 1
        this.user = user
        this.pass = pass
        this.admin = false
    }
}

botonLogin.addEventListener("click", (e) =>{
    e.preventDefault(); //para que no se recargue
    const user = formLogin.children[0].children[1].value
    const pass = formLogin.children[1].children[1].value
    validarYLogear(user, pass)
});
//Cuando hace click, valido si existe el usuario y si la contraseña es la correcta
const validarYLogear = (user, pass) => {
    const usuarioExiste = usuarios.find((usuario)  => usuario?.user === user)

    if(usuarioExiste === undefined || usuarioExiste.pass !== pass){
        Swal.fire({
            icon: "error",
            title: "Ups",
            text: "Hubo un problema con tu usuario o contraseña",
        });
    }else{
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Bienvenida a ElevaFit, ${user}`,
            showConfirmButton: false,
            timer: 2000
        });
        setTimeout(()=>{
            location.href = "../index.html" 
        }
        ,2200
        )
        let usuario = {
            user: usuarioExiste.user,
            pass: usuarioExiste.pass,
            admin: usuarioExiste.admin,
            img: imgPerfiles[usuarioExiste.id]
        }
        sessionStorage.setItem("usuario", JSON.stringify(usuario))
    }
    
}

botonRegistrarse.addEventListener("click", (e) =>{
    e.preventDefault(); //para que no se recargue
    const user = formRegistrarse.children[0].children[1].value
    const pass = formRegistrarse.children[1].children[1].value

    const usuarioNuevo = new nuevoUsuario (user, pass)
    validarYRegistrar(usuarioNuevo)
    let usuario = {
        user: user,
        pass: pass,
        admin: false,
        img: imgPerfiles[usuarios.length]
    }
    sessionStorage.setItem("usuario", JSON.stringify(usuario))
});
//Cuando hace click, valido si existe el usuario y si la contraseña es la correcta
const validarYRegistrar = (usuarioNuevo) => {
    const userNuevo = usuarios.find((usuario)  => usuario?.user === usuarioNuevo.user)

    if(userNuevo === undefined){
        usuarios.push(usuarioNuevo)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        sessionStorage.setItem("usuario", JSON.stringify(usuarioNuevo))
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Felicidades! Te registraste correctamente. Serás redirigido a la pantalla de productos",
            showConfirmButton: false,
            timer: 2000
        });
        setTimeout(()=>{
            location.href = "../index.html" 
        }
        ,2200
        )
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario ya existe.",
        });
        sessionStorage.setItem("usuario", JSON.stringify(usuario))
    };
}

