/* Navigation*/
const menu = document.querySelector('.menu');
const crossIcon = document.querySelector('.icon-close');

/* Dropdowns */
const advice = document.querySelector('.preparations-dropdown');

/* contact */
const contact = document.querySelector('.contact-options');

document.addEventListener('DOMContentLoaded', eventos);

function eventos() {
    menu.addEventListener('click', showMenu);
    crossIcon.addEventListener('click', hideMenu);
    advice.addEventListener('click', collapse);

}

function showMenu() {
    const menuMobile = document.querySelector('.navbar-mobile');
    if (menuMobile.classList.contains('hide')) {
        menuMobile.classList.toggle('shows');
    }
}

function hideMenu() {
    const menuMobile = document.querySelector('.navbar-mobile');
    if (menuMobile.classList.contains('shows')) {
        menuMobile.classList.toggle('shows');
    }
}

function collapse(e) {
    const btnCollapse = e.target.tagName;
    const container = e.target.closest('.advice');
    const expandable = container.querySelector('.expandable');

    if (btnCollapse === 'I') {

        const icon = e.target;

        if (expandable.classList.contains('hide')) {
            expandable.classList.remove('hide');
            expandable.classList.add('shows');
            container.classList.add('shadow');

            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-up');

        } else if (expandable.classList.contains('shows')) {
            expandable.classList.remove('shows');
            expandable.classList.add('hide');
            container.classList.remove('shadow');

            icon.classList.remove('fa-caret-up');
            icon.classList.add('fa-caret-down');
        }
    }
}