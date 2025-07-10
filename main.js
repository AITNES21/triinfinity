/**
 * TRIINFINITY - JavaScript Principal Optimizado
 * Solo funcionalidades, sin CSS adicional
 */

class TriInfinityApp {
    constructor() {
        this.mobileMenuBtn = null;
        this.mobileMenu = null;
        this.carousels = [];
        this.init();
    }

    /**
     * Inicializa toda la aplicación
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Configuración principal
     */
    setup() {
        this.initMobileMenu();
        this.initDropdowns();
        this.initCarousels();
    }

    /**
     * Inicializar menú móvil
     */
    initMobileMenu() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');

        if (!this.mobileMenuBtn || !this.mobileMenu) return;

        // Toggle menú móvil
        this.mobileMenuBtn.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
            this.mobileMenuBtn.innerHTML = this.mobileMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Cerrar menú al hacer clic en enlaces (excepto dropdowns)
        this.mobileMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
                this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    /**
     * Inicializar dropdowns para móvil
     */
    initDropdowns() {
        document.querySelectorAll('.mobile-dropdown > .dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = toggle.parentElement;
                parent.classList.toggle('active');

                const icon = toggle.querySelector('.dropdown-icon');
                if (icon) {
                    icon.style.transform = parent.classList.contains('active')
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)';
                }
            });
        });
    }

    /**
     * Inicializar carruseles
     */
    initCarousels() {
        // Buscar todos los carruseles
        const carouselElements = document.querySelectorAll('.carousel');

        carouselElements.forEach((carousel, index) => {
            const images = carousel.querySelectorAll('img');

            if (images.length > 1) {
                if (!carousel.id) {
                    carousel.id = `carousel-${index}`;
                }

                this.carousels.push({
                    element: carousel,
                    images: images,
                    currentIndex: 0,
                    interval: null
                });

                this.startCarousel(this.carousels.length - 1);
            }
        });

        // Carruseles específicos por ID (compatibilidad con código anterior)
        this.rotateImages('carousel1');
        this.rotateImages('carousel2');
    }

    /**
     * Función original rotateImages (para compatibilidad)
     */
    rotateImages(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const images = carousel.querySelectorAll('img');
        if (images.length <= 1) return;

        let currentIndex = 0;
        images[0].classList.add('active');

        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000);
    }

    /**
     * Iniciar carrusel automático
     */
    startCarousel(carouselIndex) {
        const carousel = this.carousels[carouselIndex];
        if (!carousel) return;

        // Primera imagen activa
        carousel.images[0].classList.add('active');

        // Rotación automática
        carousel.interval = setInterval(() => {
            carousel.images[carousel.currentIndex].classList.remove('active');
            carousel.currentIndex = (carousel.currentIndex + 1) % carousel.images.length;
            carousel.images[carousel.currentIndex].classList.add('active');
        }, 3000);
    }
}

// Inicializar la aplicación
const triInfinityApp = new TriInfinityApp();