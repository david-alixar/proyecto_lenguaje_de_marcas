function mostrar() {
    var x = document.getElementById("toast");

    x.className += " show";
}

function cerrar() {
    var x = document.getElementById("toast");

    x.classList.remove("show");
}