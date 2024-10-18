document.addEventListener('DOMContentLoaded', () => {
    const slidesData = [
        {
            imgSrc: '/images/slider/slide1.png',
            title: 'Experiencia y Calidad',
            description: 'Con más de 15 años de experiencia, Estructura Metálica Ato & Peña ofrece soluciones metálicas para remolques y carretas, hechas a la medida de cada cliente. Garantizamos calidad, eficiencia y el mejor soporte técnico del sector.',
        },
        {
            imgSrc: '/images/slider/slide2.png',
            title: 'Carretas Industriales',
            description: 'Fabricamos carretas robustas, diseñadas para soportar las exigencias de empresas de construcción y transporte. Con materiales de alta calidad, aseguramos máxima durabilidad y rendimiento en el traslado de cargas pesadas.',
        },
        {
            imgSrc: '/images/slider/slide3.png',
            title: 'Remolques Personalizados',
            description: 'Diseñamos y fabricamos remolques especializados para empresas mineras, agrícolas, industriales, telecomunicaciones y construcción. Adaptables y resistentes, que faciliten el traslado seguro, garantizando cada operación.',
        }
    ];

    const slider = document.getElementById('slider');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    const totalSlides = slidesData.length;
    let autoSlideInterval;

    // Inicializar las diapositivas en el slider
    slidesData.forEach(slide => {
        const slideElement = document.createElement('div');
        slideElement.className = "slide flex-shrink-0 w-full h-full relative";
        slideElement.innerHTML = `
            <img src="${slide.imgSrc}" alt="${slide.title}" class="w-full h-full object-cover opacity-85">
            <div class="absolute inset-0 bg-black bg-opacity-85"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center w-full px-4 max-w-4xl mx-auto">
                <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">${slide.title}</h1>
                <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl leading-relaxed md:py-2 mb-8 px-4 sm:px-8 md:px-12">${slide.description}</p>
                <a href="https://wa.me/+51995374449?text=Hola%20*Estructura%20Metálica%20Ato%20y%20Peña*,%20estoy%20interesado%20en%20mayor%20información%20sobre%20tus%20productos%20y%20servicios." class="bg-gradient-to-r from-primary to-secondary hover:from-green-900 hover:to-green-700 text-black hover:text-white font-bold py-3 px-6 md:px-8 rounded-2xl transition duration-300" target="_blank" rel="noopener noreferrer">
                    Cotizar ahora
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        `;
        slider.appendChild(slideElement);
    });

    updateIndicators();

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('opacity-100');
                indicator.classList.remove('bg-opacity-35');
            } else {
                indicator.classList.add('bg-opacity-35');
                indicator.classList.remove('opacity-100');
            }
        });
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliderPosition();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSliderPosition();
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliderPosition();
    }, 5000);
});