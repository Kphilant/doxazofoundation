document.addEventListener("DOMContentLoaded", function() {

    /* --- 1. ANIMATED IMPACT COUNTERS (Homepage) --- */
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const hasPlus = counter.getAttribute('data-target').includes('+') || counter.innerText.includes('+');
            const hasPercent = counter.getAttribute('data-target').includes('100') || counter.innerText.includes('%');
            
            let count = 0;
            const increment = target / 40;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + (hasPercent ? '%' : (hasPlus ? '+' : ''));
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + (hasPercent ? '%' : (hasPlus ? '+' : ''));
                }
            };
            updateCount();
        });
    }

    // Trigger counter animation when scrolled into view
    if (counters.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY + window.innerHeight;
            const statsElement = document.querySelector('.stats-bar');
            if (statsElement && scrollPos >= statsElement.offsetTop + 50 && !animated) {
                runCounters();
                animated = true;
            }
        });
    }

    /* --- 2. CONTACT FORM SUBMISSION FEEDBACK --- */
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents default page refresh
            
            // Create a sleek success notice
            const successMsg = document.createElement('div');
            successMsg.style.backgroundColor = '#0A1128';
            successMsg.style.color = '#D4AF37';
            successMsg.style.padding = '1rem';
            successMsg.style.marginTop = '1rem';
            successMsg.style.borderRadius = '4px';
            successMsg.style.textAlign = 'center';
            successMsg.style.fontWeight = 'bold';
            successMsg.style.border = '1px solid #D4AF37';
            successMsg.innerText = 'Thank you! Your message has been successfully sent to Doxazo Foundation. We will be in touch shortly.';
            
            contactForm.reset();
            contactForm.appendChild(successMsg);

            // Remove message after 6 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 6000);
        });
    }

});