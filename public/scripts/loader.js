document.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('.fixed');
    const content = document.getElementById('content');

    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
            if (content) {
                content.classList.remove('hidden');
            }
        }, 1000);
    }
});
