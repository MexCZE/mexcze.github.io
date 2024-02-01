//---------- Navbar ----------//

window.addEventListener('scroll', function () {
    let navbar = document.getElementById("navbar");
    navbar.classList.toggle('fixed', this.window.scrollY > 0)
})
