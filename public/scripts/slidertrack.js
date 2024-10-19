document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    if (sliderTrack && prevButton && nextButton) {
        let currentIndex = 0;
        let itemsVisible = 1;
        const totalItems = document.querySelectorAll('.slider-track > div').length;

        function updateSlider() {
            const slideWidth = 100 / itemsVisible;
            const newTransformValue = -(currentIndex * slideWidth);
            sliderTrack.style.transform = `translateX(${newTransformValue}%)`;
        }

        function adjustItemsVisible() {
            if (window.innerWidth >= 1024) {
                itemsVisible = 5;
            } else if (window.innerWidth >= 768) {
                itemsVisible = 4;
            } else {
                itemsVisible = 1;
            }
            updateSlider();
        }

        nextButton.addEventListener('click', () => {
            if (currentIndex < totalItems - itemsVisible) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalItems - itemsVisible;
            }
            updateSlider();
        });

        window.addEventListener('resize', adjustItemsVisible);
        adjustItemsVisible();

        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < totalItems - itemsVisible) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 3000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        startAutoPlay();

        nextButton.addEventListener('mouseenter', stopAutoPlay);
        prevButton.addEventListener('mouseenter', stopAutoPlay);
        nextButton.addEventListener('mouseleave', startAutoPlay);
        prevButton.addEventListener('mouseleave', startAutoPlay);

        sliderTrack.addEventListener('mouseenter', stopAutoPlay);
        sliderTrack.addEventListener('mouseleave', startAutoPlay);
    }
});
