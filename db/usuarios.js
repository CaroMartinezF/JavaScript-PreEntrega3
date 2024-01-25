export let usuariosBase = [
    {
        id: 1,
        user: "Carolina",
        pass: "caro",
        admin: true,
    },
];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(usuariosBase));
