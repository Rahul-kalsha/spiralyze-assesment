/* Slider Part Script*/
const slides = document.querySelectorAll('.slider__content > div');
const sliderContent = document.getElementById('sliderContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bulletsContainer = document.getElementById('sliderBullets');
let currentIndex = 0;
let startX = 0;
let endX = 0;
let slideInterval;

slides.forEach((slide, index) => {
    const bullet = document.createElement('span');
    bullet.classList.add('slider__bullet');
    if (index === 0) bullet.classList.add('active');
    bullet.addEventListener('click', () => {
        goToSlide(index);
        resetSlideInterval();
    });
    bulletsContainer.appendChild(bullet);
});

function showSlide(index) {
    sliderContent.style.transform = `translateX(-${index * 100}%)`;

    const bullets = document.querySelectorAll('.slider__bullet');
    bullets.forEach(bullet => bullet.classList.remove('active'));
    bullets[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000); // Slide every 5 seconds
}
function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}
startSlideInterval();
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
});
sliderContent.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

sliderContent.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
});

sliderContent.addEventListener('touchend', () => {
    if (startX > endX + 50) {
        nextSlide();
    } else if (startX < endX - 50) {
        prevSlide();
    }
    resetSlideInterval();
});



/* Dialogue Part Script*/
function openModal() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    modal.style.display = "flex";
    video.play();
}
function closeModal() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    video.pause();
    video.currentTime = 0;
    modal.style.display = "none";
}
window.onclick = function (event) {
    const modal = document.getElementById("videoModal");
    if (event.target === modal) {
        closeModal();
    }
}



/* Mobile Menu Part Script*/
const burgerMenu = document.getElementById('burgerMenu');
const headerNav = document.querySelector('.header__nav');
burgerMenu.addEventListener('click', () => {
    headerNav.classList.toggle('active');
});




/* Contact us Form Part Script*/
document.getElementById('contactusForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get required fields
    const requiredFields = ['fname', 'lname', 'email'];
    let formIsValid = true;
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const parentField = field.closest('.form__field');
        const tooltip = parentField.querySelector('.tooltip');

        if (!field.value.trim()) {
            parentField.classList.add('has_error');
            formIsValid = false;
            tooltip.textContent = "This field can’t be empty. Please fill it in.";
        } else if (fieldId === 'email' && !isValidEmail(field.value.trim())) {
            parentField.classList.add('has_error');
            formIsValid = false;
            tooltip.textContent = "Please enter a valid email address.";
        } else {
            parentField.classList.remove('has_error');
            tooltip.textContent = ""; // Clear tooltip text if valid
        }

        field.addEventListener('input', function () {
            if (field.value.trim()) {
                if (fieldId === 'email' && !isValidEmail(field.value.trim())) {
                    tooltip.textContent = "Please enter a valid email address.";
                } else {
                    parentField.classList.remove('has_error');
                    tooltip.textContent = "";
                }
            }
        });

    });

    if (formIsValid) {
        alert('Form submitted successfully!');
        // this.submit(); 
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;

        // Redirect to thank-you.html with query parameters
        window.location.href = `thank-you.html?fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}`;
    }
});