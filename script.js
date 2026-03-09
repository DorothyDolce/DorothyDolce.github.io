document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for the intro section
    const typingElements = document.querySelectorAll('.typing-effect');

    typingElements.forEach(el => {
        const text = el.getAttribute('data-text');
        el.textContent = ''; // Clear fallback text if any

        let i = 0;
        const speed = 50; // Base milliseconds per character

        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                // Add a random slight delay for more realistic typing feel
                const delay = speed + Math.random() * 80;
                setTimeout(typeWriter, delay);
            }
        }

        // Start typing after a short initial delay matching the boot sequence feel
        setTimeout(typeWriter, 500);
    });

    // Random noise/text glitch generator for elements not using CSS glitch
    const glitchElements = document.querySelectorAll('.subtitle, h2, li');

    setInterval(() => {
        if (Math.random() > 0.98) { // Occasional glitch
            const el = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            const originalText = el.textContent;

            // Generate some random characters
            const chars = '!<>-_\\/[]{}—=+*^?#________1010101010';
            let newText = originalText.split('').map(char => {
                if (Math.random() > 0.85 && char !== ' ') {
                    return chars[Math.floor(Math.random() * chars.length)];
                }
                return char;
            }).join('');

            el.textContent = newText;

            // Revert back quickly
            setTimeout(() => {
                el.textContent = originalText;
            }, 80 + Math.random() * 100);
        }
    }, 200);
});
