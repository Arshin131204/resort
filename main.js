// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Highlighting
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Testimonials Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Auto-scrolling every 5 seconds
        setInterval(nextSlide, 5000); 

        // Initial show
        showSlide(currentSlide);
    }
});

// 3. Floating Button Styling (added directly via CSS in index.html for simplicity, 
// but the general JS is here for other functionalities)

/* Floating Button CSS for style.css (add this to style.css)

.floating-btn {
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--color-ocean);
    color: var(--color-white);
    text-align: center;
    line-height: 60px;
    font-size: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 999;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.floating-btn:hover {
    background-color: var(--color-teal);
    transform: scale(1.05);
}
*/