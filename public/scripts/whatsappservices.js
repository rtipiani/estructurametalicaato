document.addEventListener('DOMContentLoaded', () => {
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    const phoneNumber = '+51995374449';

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const serviceName = button.getAttribute('data-service-name');
            const message = `Hola *Estructura Metálica Ato & Peña*, estoy interesado en el servicio de: *${serviceName}*. Me gustaría solicitar una cotización.`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});