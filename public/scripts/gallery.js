document.addEventListener('DOMContentLoaded', () => {
    const counters = [
        { element: document.getElementById('count1'), endValue: 300, duration: 2000, symbol: '+' },
        { element: document.getElementById('count2'), endValue: 15, duration: 2000, symbol: '%' },
        { element: document.getElementById('count3'), endValue: 100, duration: 2000, symbol: '%' },
        { element: document.getElementById('count4'), endValue: 25, duration: 2000, symbol: '+' },
    ];

    let isCounting = false;

    const startCounting = () => {
        if (isCounting) return;
        isCounting = true;

        counters.forEach(counter => {
            let startValue = 0;
            const increment = counter.endValue / (counter.duration / 100);
            const interval = setInterval(() => {
                if (startValue < counter.endValue) {
                    startValue += increment;
                    counter.element.innerText = Math.floor(startValue).toString() + counter.symbol; // Agrega el símbolo correspondiente
                } else {
                    counter.element.innerText = counter.endValue.toString() + counter.symbol; // Agrega el símbolo correspondiente
                    clearInterval(interval);
                }
            }, 100);
        });
    };

    const counterSection = document.getElementById('counter-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(counterSection);
            }
        });
    });

    observer.observe(counterSection);

    const gallery = document.getElementById('gallery');
    const images = document.querySelectorAll('#gallery > div');
    const totalImages = images.length;
    let currentIndex = 0;

    const getItemsToShow = () => {
        if (window.innerWidth >= 1024) {
            return 5;
        } else if (window.innerWidth >= 768) {
            return 3;
        } else {
            return 1;
        }
    };

    let itemsToShow = getItemsToShow();

    const updateGallery = () => {
        const offset = -currentIndex * (100 / itemsToShow);
        gallery.style.transform = `translateX(${offset}%)`;
    };

    const nextImage = () => {
        currentIndex += itemsToShow;
        if (currentIndex >= totalImages) {
            currentIndex = 0;
        }
        updateGallery();
    };

    const prevImage = () => {
        currentIndex -= itemsToShow;
        if (currentIndex < 0) {
            currentIndex = Math.max(totalImages - itemsToShow, 0);
        }
        updateGallery();
    };

    let autoPlayInterval;

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextImage, 3000);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    }

    startAutoPlay();

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevImage();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextImage();
        startAutoPlay();
    });

    gallery.addEventListener('mouseenter', stopAutoPlay);
    gallery.addEventListener('mouseleave', startAutoPlay);

    window.addEventListener('resize', () => {
        itemsToShow = getItemsToShow();
        updateGallery();
    });

    updateGallery();
});