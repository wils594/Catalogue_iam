document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Mobile ---
    const header = document.getElementById('main-header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuButton.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });

    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            header.classList.remove('nav-open');
        }
    });

    // --- Effet de Header au Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


// --- Animation de décompte pour les statistiques ---
const animateCounter = (element) => {
    const target = parseInt(element.dataset.target, 10);
    const prefix = element.dataset.prefix || '';
    const suffix = element.innerText.replace(/[0-9]/g, '');
    
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const updateCount = () => {
        current += increment;
        if (current < target) {
            // MODIFIÉ : On place le préfixe AVANT le nombre
            element.innerText = prefix + Math.ceil(current) + suffix;
            requestAnimationFrame(updateCount);
        } else {
            // MODIFIÉ : On place aussi le préfixe à la fin
            element.innerText = prefix + target + suffix;
        }
    };
    requestAnimationFrame(updateCount);
};

    // --- MODIFIÉ : Préparation du titre CTA pour l'animation par MOTS ---
    const ctaTitle = document.getElementById('cta-title');
    if (ctaTitle) {
        const text = ctaTitle.textContent;
        const words = text.split(' '); // On découpe par espace pour avoir les mots
        ctaTitle.innerHTML = ''; // Vide le contenu original
        
        words.forEach((word) => {
            const wordSpan = document.createElement('span');
            // On ajoute le mot et un espace insécable pour recréer la phrase
            wordSpan.innerHTML = `${word} `; 
            ctaTitle.appendChild(wordSpan);
        });
    }

    // --- Animation d'Apparition au Scroll (Fade In & autres) ---
    const observerOptions = {
        threshold: 0.5, // Se déclenche quand 50% de l'élément est visible
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation fade-in classique
                entry.target.classList.add('visible');

                // Déclenchement du compteur de stats
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('[data-target]');
                    if (counter) {
                        animateCounter(counter);
                    }
                }
                
                // MODIFIÉ : Déclenchement de l'animation des mots du titre CTA
                if (entry.target.id === 'cta-title') {
                    entry.target.classList.add('animate');
                    // Applique le délai progressif à chaque mot (span)
                    const wordSpans = entry.target.querySelectorAll('span');
                    wordSpans.forEach((span, index) => {
                        // Un délai plus long entre les mots est plus agréable
                        span.style.transitionDelay = `${index * 120}ms`; 
                    });
                }

                // Arrête d'observer l'élément pour ne pas répéter l'animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments .fade-in et le titre CTA
    document.querySelectorAll('.fade-in, #cta-title, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // --- Gestion du formulaire de contact vers WhatsApp ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const whatsappNumber = '22890229652';
            const whatsappMessage = `Bonjour, je vous contacte depuis votre site.\n\n*Nom :* ${name}\n*Email :* ${email}\n\n*Message :*\n${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${22890229652}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
        });
    }
});