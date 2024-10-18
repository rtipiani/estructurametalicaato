document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('main-navbar');

    // Mostrar u ocultar el menú móvil al hacer clic en el botón
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cambiar la clase del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'bg-white', 'shadow-md');
            navbar.classList.remove('relative');
        } else {
            navbar.classList.remove('fixed', 'top-0', 'left-0', 'w-full', 'bg-white', 'shadow-md');
            navbar.classList.add('relative');
        }
    }, { passive: true });

    // Resaltar la pestaña activa en la barra de navegación
    const currentPath = window.location.pathname.replace(/\/$/, ''); // Normaliza la ruta actual
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('data-path').replace(/\/$/, ''); // Normaliza el enlace
        if (currentPath === linkPath) {
            link.classList.add('bg-gradient-to-l', 'from-primary', 'to-secondary', 'text-white', 'shadow-md', 'scale-105');
        } else {
            link.classList.add('text-green-900'); // Clase para enlaces inactivos
        }
    });
});
