const menuHamburguesa = document.querySelector('.menu-hb a');
const btnCerrar = document.querySelector('.btn-cerrar');
const menuMobile = document.querySelector('.menu-mb')

// console.log(menuHamburguesa);


menuHamburguesa.addEventListener('click', abrirNavegacion);
btnCerrar.addEventListener('click', cerrarNavegacion);
menuMobile.addEventListener('click', enlaces);


function abrirNavegacion(e) {
    // e.preventDefault();
    menuMobile.classList.add('visible');
    menuMobile.classList.remove('oculto');

}

function cerrarNavegacion(e) {
    // e.preventDefault();
    menuMobile.classList.add('oculto');
    menuMobile.classList.remove('visible');
}

function enlaces(e) {
    const evento = e.target.tagName;
    if (evento === 'A') {
        cerrarNavegacion();
    }
}