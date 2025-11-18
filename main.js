// Saffran Patisserie - Main JavaScript
// Interactive functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initHeroAnimations();
    initCarousels();
    initScrollAnimations();
    initProductInteractions();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Hero Section Animations
function initHeroAnimations() {
    // Animate hero elements on page load
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroButtons = document.getElementById('hero-buttons');
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (heroTitle) {
        anime({
            targets: heroTitle,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: 500,
            easing: 'easeOutQuart'
        });
    }
    
    if (heroSubtitle) {
        anime({
            targets: heroSubtitle,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 800,
            easing: 'easeOutQuart'
        });
    }
    
    if (heroButtons) {
        anime({
            targets: heroButtons,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 1100,
            easing: 'easeOutQuart'
        });
    }
    
    // Initialize typewriter animation
    if (typewriterElement) {
        initTypewriter(typewriterElement);
    }
}

// Typewriter Animation
function initTypewriter(element) {
    const phrases = [
        'Sweets & Pastries',
        'Family Heritage',
        'Handcrafted Desserts',
        'Flavours Since 1987',
        'Traditional Recipes'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isPaused) {
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeWriter();
            }, 2000);
            return;
        }
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentPhrase.length) {
                isPaused = true;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter animation after hero title animation
    setTimeout(typeWriter, 1500);
}

// Initialize Carousels
function initCarousels() {
    // Featured Products Carousel
    const featuredProducts = document.getElementById('featured-products');
    if (featuredProducts) {
        new Splide('#featured-products', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                }
            }
        }).mount();
    }
    
    // Testimonials Carousel
    const testimonials = document.getElementById('testimonials');
    if (testimonials) {
        new Splide('#testimonials', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: false,
            pagination: true
        }).mount();
    }
    
    // Product Gallery Carousel (for menu page)
    const productGallery = document.getElementById('product-gallery');
    if (productGallery) {
        new Splide('#product-gallery', {
            type: 'fade',
            perPage: 1,
            arrows: true,
            pagination: true,
            cover: true,
            heightRatio: 0.75
        }).mount();
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Fade in animation
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuart'
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card-hover, .splide__slide, section h2, section p');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Product Interactions (for menu page)
function initProductInteractions() {
    // Product modal functionality
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productData = {
                name: this.dataset.name,
                price: this.dataset.price,
                description: this.dataset.description,
                ingredients: this.dataset.ingredients,
                image: this.dataset.image
            };
            
            openProductModal(productData);
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', closeProductModal);
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
    
    // Category filtering (for menu page)
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Update active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Product Modal Functions
function openProductModal(productData) {
    const modal = document.getElementById('product-modal');
    const modalContent = {
        name: document.getElementById('modal-product-name'),
        price: document.getElementById('modal-product-price'),
        description: document.getElementById('modal-product-description'),
        ingredients: document.getElementById('modal-product-ingredients'),
        image: document.getElementById('modal-product-image')
    };
    
    // Update modal content
    if (modalContent.name) modalContent.name.textContent = productData.name;
    if (modalContent.price) modalContent.price.textContent = `$${productData.price}`;
    if (modalContent.description) modalContent.description.textContent = productData.description;
    if (modalContent.ingredients) modalContent.ingredients.textContent = productData.ingredients;
    if (modalContent.image) modalContent.image.src = productData.image;
    
    // Show modal with animation
    if (modal) {
        modal.classList.remove('hidden');
        anime({
            targets: modal.querySelector('.modal-content'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        anime({
            targets: modal.querySelector('.modal-content'),
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInQuart',
            complete: function() {
                modal.classList.add('hidden');
            }
        });
    }
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Product Filtering (for menu page)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        
        if (category === 'all' || productCategory === category) {
            anime({
                targets: product,
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
            product.style.display = 'block';
        } else {
            anime({
                targets: product,
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 200,
                easing: 'easeInQuart',
                complete: function() {
                    product.style.display = 'none';
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for buttons
document.querySelectorAll('a[href*="ubereats"], a[href*="doordash"]').forEach(link => {
    link.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Opening...';
        this.style.opacity = '0.7';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.opacity = '1';
        }, 2000);
    });
});

// Contact form handling (if present)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        
        this.appendChild(successMessage);
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Business hours functionality (for contact page)
function updateBusinessHours() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const businessHours = {
        0: { open: 9, close: 18, name: 'Sunday' },
        1: { open: 0, close: 0, name: 'Monday' }, // Closed
        2: { open: 9, close: 19, name: 'Tuesday' },
        3: { open: 9, close: 19, name: 'Wednesday' },
        4: { open: 9, close: 19, name: 'Thursday' },
        5: { open: 9, close: 19, name: 'Friday' },
        6: { open: 9, close: 19, name: 'Saturday' }
    };
    
    const today = businessHours[currentDay];
    const statusElement = document.getElementById('business-status');
    
    if (statusElement && today) {
        if (today.open === 0) {
            statusElement.textContent = 'Closed Today';
            statusElement.className = 'text-red-600 font-semibold';
        } else if (currentHour >= today.open && currentHour < today.close) {
            statusElement.textContent = 'Open Now';
            statusElement.className = 'text-green-600 font-semibold';
        } else {
            statusElement.textContent = 'Closed Now';
            statusElement.className = 'text-red-600 font-semibold';
        }
    }
}

// Update business hours on page load and every minute
updateBusinessHours();
setInterval(updateBusinessHours, 60000);

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add Persian pattern overlay effects
function addPersianPatterns() {
    const sections = document.querySelectorAll('.persian-pattern');
    sections.forEach(section => {
        section.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create subtle light effect following mouse
            this.style.backgroundPosition = `${x}px ${y}px`;
        });
    });
}

addPersianPatterns();