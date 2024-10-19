document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbMap = {
        '/': 'Inicio',
        '/nosotros': 'Nosotros',
        '/categories': 'Productos',
        '/servicios': 'Servicios',
        '/contactenos': 'Contáctenos'
    };

    const currentPath = window.location.pathname;

    const breadcrumb = document.getElementById('breadcrumb');

    if (!breadcrumb) {
        console.error("El elemento breadcrumb no fue encontrado.");
        return;
    }

    const homeLink = `<a href="/" class="hover:text-green-600">${breadcrumbMap['/']}</a>`;
    const separator = '<span>/</span>';

    if (currentPath.startsWith('/products')) {
        const pathSegments = currentPath.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');

        breadcrumb.innerHTML = `${homeLink} ${separator} <span class="text-gray-500">${lastSegment}</span>`;
    } else if (breadcrumbMap[currentPath]) {
        const currentPage = breadcrumbMap[currentPath];
        const currentLink = `<a class="hover:text-green-600">${currentPage}</a>`;
        breadcrumb.innerHTML = `${homeLink} ${separator} ${currentLink}`;
    } else {
        breadcrumb.innerHTML = `${homeLink} ${separator} <span class="text-gray-500">Página desconocida</span>`;
    }
});
