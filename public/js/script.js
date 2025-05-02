document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (currentTheme) {
        body.classList.add(currentTheme); // Assumes theme is 'dark-mode'
        if (currentTheme === 'dark-mode') {
            darkModeToggle.textContent = '☀️'; // Sun for dark mode
        }
    } else {
        // Optional: Check system preference
        // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //     body.classList.add('dark-mode');
        //     darkModeToggle.textContent = '☀️';
        // }
    }

    // Dark Mode Toggle Button
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        let theme = 'light-mode'; // Default is light
        if (body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
            darkModeToggle.textContent = '☀️'; // Sun icon
        } else {
             darkModeToggle.textContent = '🌙'; // Moon icon
        }
        localStorage.setItem('theme', theme); // Save preference
    });

    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });


    // Simple Carousel Functionality
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('[data-carousel-control="prev"]');
        const nextBtn = carousel.querySelector('[data-carousel-control="next"]');
        let currentIndex = 0;
        const totalItems = items.length;

        function updateCarousel() {
            items.forEach((item, index) => {
                if (index === currentIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            // This simplified carousel fades between items, doesn't need translate
            // If a sliding effect is desired, translateX logic would be needed here
            // based on currentIndex and item width.
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        // Initialize first item
        updateCarousel();
    });

    // Dynamic Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Form Handling Example (using Formspree or similar)
    const form = document.getElementById('quoteForm');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default unless submitting to a backend
            const formData = new FormData(form);
            const formAction = form.getAttribute('action');

            // Displaying a basic loading message (optional)
            formStatus.textContent = 'Sending...';
            formStatus.className = ''; // Reset classes

            // Replace with your actual endpoint submission logic (e.g., fetch)
            // Example using Fetch API for Formspree:
             if (formAction && formAction !== 'YOUR_FORM_ENDPOINT' && formAction.includes('formspree')) {
                 fetch(formAction, {
                     method: 'POST',
                     body: formData,
                     headers: { 'Accept': 'application/json' }
                 })
                 .then(response => {
                     if (response.ok) {
                         formStatus.textContent = "Thanks! Your message has been sent.";
                         formStatus.classList.add('success');
                         form.reset(); // Clear the form
                     } else {
                         response.json().then(data => {
                             if (Object.hasOwn(data, 'errors')) {
                                formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                            } else {
                                formStatus.textContent = "Oops! There was a problem submitting your form.";
                             }
                             formStatus.classList.add('error');
                         })
                     }
                 })
                 .catch(error => {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                    formStatus.classList.add('error');
                    console.error("Form submission error:", error);
                });

             } else {
                // Placeholder if no real endpoint is set
                console.log("Form submitted (placeholder). Data:", Object.fromEntries(formData));
                formStatus.textContent = 'Form submitted (simulated). Check console.';
                 formStatus.classList.add('success');
                setTimeout(() => { formStatus.textContent = ''; }, 5000); // Clear message
                 // form.reset(); // Optionally reset form
            }
        });
    }

    // Optional: Add smooth scrolling for nav links if CSS `scroll-behavior: smooth` is not sufficient or more control is needed
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Calculate offset considering the fixed navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                 });
            }
        });
    });


}); // End DOMContentLoadeds