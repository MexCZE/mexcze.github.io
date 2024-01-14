document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const obsah = document.querySelector('.obsah');

    hamburgerIcon.addEventListener('click', function() {
        obsah.classList.toggle('show');
    });
});