const whatsappButtons = document.querySelectorAll('.whatsapp-button');
const phoneNumber = '+51995374449';

whatsappButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const productName = button.getAttribute('data-product-name');
        const message = `Hola *Estructura Metálica Ato & Peña*, estoy interesado en el producto: *${productName}*. Me gustaría cotizar por favor.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});