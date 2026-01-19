// ================================
// Gallery Slideshow
// ================================
const slideshowContainer = document.getElementById('slideshow');
const thumbnailContainer = document.getElementById('thumbnails');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

let currentSlide = 0;
let slides = [];
let autoSlideInterval;

// Gallery images from past-work folder
const galleryImages = [
    { src: 'images/past-work/trailer-junk-removal.JPG', alt: 'Trailer loaded with junk removal items' },
    { src: 'images/past-work/trailer-haul-winter.JPG', alt: 'Winter trailer haul' },
    { src: 'images/past-work/trailer-haul-town.JPG', alt: 'Trailer haul in town' },
    // Before & Finished pairs
    { src: 'images/past-work/attic-before.JPG', alt: 'Attic before junk removal' },
    { src: 'images/past-work/attic-finished.JPG', alt: 'Attic after junk removal' },
    { src: 'images/past-work/basement-before.JPG', alt: 'Basement before junk removal' },
    { src: 'images/past-work/basement-finished.JPG', alt: 'Basement after junk removal' },
    // Trailer hauls
    { src: 'images/past-work/trailer-garbage.JPG', alt: 'Trailer full of garbage' },
    { src: 'images/past-work/trailer-waste.JPG', alt: 'Trailer loaded with waste' },
    { src: 'images/past-work/trail-haul-chairs.JPG', alt: 'Trailer haul with chairs' },
    { src: 'images/past-work/trash-dump-before.JPG', alt: 'Trash dump run' },
    { src: 'images/past-work/trash-dump-finished.jpeg', alt: 'Trash dump run' },
    // Furniture & appliances
    { src: 'images/past-work/furniture-trash.JPG', alt: 'Furniture trash removal' },
    { src: 'images/past-work/couch-waste.JPG', alt: 'Couch waste removal' },
    { src: 'images/past-work/mattress-garbage.JPG', alt: 'Mattress garbage removal' },
    { src: 'images/past-work/bed-junk-removal.JPG', alt: 'Bed junk removal' },
    { src: 'images/past-work/appliance-garbage.JPG', alt: 'Appliance garbage removal' }
];

// Initialize slideshow if on gallery page
if (slideshowContainer && thumbnailContainer) {
    initGallery();
}

function initGallery() {
    // Clear placeholder
    slideshowContainer.innerHTML = '';
    thumbnailContainer.innerHTML = '';

    // Create slides and thumbnails
    galleryImages.forEach((image, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        
        // Handle image load errors
        img.onerror = function() {
            this.src = 'data:image/svg+xml,' + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#e0e0e0"/>
                    <text x="50%" y="50%" font-family="Arial" font-size="18" fill="#999" text-anchor="middle" dy=".3em">
                        Image ${index + 1}
                    </text>
                </svg>
            `);
        };
        
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
        slides.push(slide);

        // Create thumbnail
        const thumb = document.createElement('img');
        thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.src = image.src;
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.loading = 'lazy';
        thumb.onclick = () => goToSlide(index);
        
        // Handle thumbnail load errors
        thumb.onerror = function() {
            this.src = 'data:image/svg+xml,' + encodeURIComponent(`
                <svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#e0e0e0"/>
                    <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#999" text-anchor="middle" dy=".3em">
                        ${index + 1}
                    </text>
                </svg>
            `);
        };
        
        thumbnailContainer.appendChild(thumb);
    });

    // Update counter
    totalSlidesEl.textContent = galleryImages.length;
    currentSlideEl.textContent = 1;

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
    slideshowContainer.addEventListener('mouseleave', startAutoSlide);
}

function goToSlide(index) {
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    // Update thumbnails
    const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    // Update counter
    currentSlide = index;
    currentSlideEl.textContent = index + 1;
}

function changeSlide(direction) {
    let newIndex = currentSlide + direction;
    
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    
    goToSlide(newIndex);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Keyboard navigation for slideshow
document.addEventListener('keydown', (e) => {
    if (!slideshowContainer) return;
    
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});
