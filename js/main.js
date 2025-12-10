document.addEventListener('DOMContentLoaded', () => {
    // Scroll Header Styling
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon shape (optional logic, keeping simple for now)
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close when clicking outside (on the body? no, overlay would be better but this is simple starer)
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- HERO EXPLODE EFFECT ---
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                heroVisual.classList.add('explode-away');
            } else {
                heroVisual.classList.remove('explode-away');
            }
        });
    }

    // --- PROCESS VISUAL ANIMATION ---
    const processSection = document.querySelector('.process-section');
    const processLineFill = document.querySelector('.process-line-fill');
    const processNodes = document.querySelectorAll('.process-node');

    if (processSection && processLineFill) {
        let animationStarted = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    animationStarted = true;

                    // Start Line Animation
                    processLineFill.style.width = '100%';

                    // Fast Sync Logic (Total 1.5s)
                    // Node 0: IDEA (Start immediately)
                    setTimeout(() => processNodes[0].classList.add('active'), 50);

                    // Node 1: DISEÑO (approx 33% -> 500ms)
                    setTimeout(() => processNodes[1].classList.add('active'), 500);

                    // Node 2: CÓDIGO (approx 66% -> 1000ms)
                    setTimeout(() => processNodes[2].classList.add('active'), 1000);

                    // Node 3: LANZAMIENTO (100% -> 1500ms)
                    setTimeout(() => processNodes[3].classList.add('active'), 1500);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(processSection);
    }
    // --- WHATSAPP FORM SUBMISSION ---
    const contactForms = document.querySelectorAll('form, .contact-form'); // Target all forms
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get inputs
            const inputs = form.querySelectorAll('input, textarea, select');
            let messageBody = "Hola Velo Code, me gustaría iniciar un proyecto:%0A";

            // Build message
            inputs.forEach(input => {
                if (input.value) {
                    // Check if it's the message area
                    const label = input.getAttribute('placeholder') || input.name || "Detalle";
                    messageBody += `%0A*${label}:* ${input.value}`;
                }
            });

            // Redirect to WhatsApp (Replace number with actual)
            const phoneNumber = "584120534267"; // Placeholder
            window.open(`https://wa.me/${phoneNumber}?text=${messageBody}`, '_blank');
        });
    });
});
