document.addEventListener('DOMContentLoaded', () => {
    // --- Matrix Rain Effect ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-initialize columns on resize
            columns = Math.floor(width / fontSize);
            drops = [];
            for (let x = 0; x < columns; x++) drops[x] = 1;
        });

        const binaryChars = '01';
        const fontSize = 14;
        let columns = Math.floor(width / fontSize);

        let drops = [];
        for (let x = 0; x < columns; x++) {
            // Randomize initial positions so they don't all start falling at once
            drops[x] = Math.random() * -100;
        }

        function drawMatrix() {
            // Translucent black background to create trail effect
            ctx.fillStyle = 'rgba(3, 6, 10, 0.05)';
            ctx.fillRect(0, 0, width, height);

            // Pale blue text color
            ctx.fillStyle = '#88ccff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                // Ignore drops waiting to enter screen
                if (drops[i] < 0) {
                    drops[i] += 0.5; // fall speed modifier for off-screen
                    continue;
                }

                const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));

                // Add a slight glow effect occasionally to random characters
                if (Math.random() > 0.95) {
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = '#88ccff';
                    ctx.fillStyle = '#ffffff'; // Flash white
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = '#88ccff';
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly after it crosses screen
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Falling speed
                drops[i] += 0.7;
            }
        }

        // Run matrix animation
        setInterval(drawMatrix, 35);
    }

    // --- Nixie Tube Clock Logic ---
    const nixieDigits = document.querySelectorAll('.nixie-tube .digit');

    function updateNixieClock() {
        if (!nixieDigits || nixieDigits.length < 6) return;

        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');

        const timeStr = h + m + s;

        for (let i = 0; i < 6; i++) {
            // Update only if changed to avoid unnecessary repaints
            if (nixieDigits[i].textContent !== timeStr[i]) {
                // Slight glitch/flicker effect when digit changes
                nixieDigits[i].style.opacity = '0.5';
                setTimeout(() => {
                    nixieDigits[i].textContent = timeStr[i];
                    nixieDigits[i].style.opacity = '1';
                }, 50);
            }
        }
    }

    // Start clock if elements exist
    if (nixieDigits.length > 0) {
        updateNixieClock();
        setInterval(updateNixieClock, 1000);
    }

    // --- Boot Sequence & Portfolio Initialization ---
    const bootOverlay = document.getElementById('boot-sequence');
    const bootTextEl = document.getElementById('boot-text');

    function startPortfolioAnimations() {
        document.body.classList.add('show-content');
        // --- Typing effect for the intro section ---
        const typingElements = document.querySelectorAll('.typing-effect');

        typingElements.forEach(el => {
            const text = el.getAttribute('data-text');
            el.textContent = ''; // Clear fallback text if any

            let i = 0;
            const speed = 2; // Base milliseconds per character

            function typeWriter() {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    // Add a random slight delay for more realistic typing feel
                    const delay = speed + Math.random() * 80;
                    setTimeout(typeWriter, delay);
                }
            }

            // Start typing shortly after portfolio reveal
            setTimeout(typeWriter, 500);
        });
    }

    if (bootOverlay && bootTextEl) {
        // Block scrolling during boot
        document.body.style.overflow = 'hidden';

        const bootLogs = [
            "Initializing kernel... OK",
            "Loading base drivers: OK",
            "Mounting secure drive [\\\\.\\PhysicalDrive0]... DONE",
            "Establishing connection to SEL network...",
            "Connection Established. Protocol: TCP/IP",
            "",
            "Login: Hello, Navi!!",
            "Password: Make me mad, Make me sad, Make me feel alright?",
            "",
            "ACCESS GRANTED"
        ];

        let logIndex = 0;
        let charIndex = 0;

        function printLog() {
            if (logIndex >= bootLogs.length) {
                // Boot completed, start hide animation
                setTimeout(() => {
                    bootOverlay.classList.add('boot-hidden');
                    document.body.style.overflow = ''; // Restore scrolling
                    setTimeout(() => {
                        bootOverlay.style.display = 'none';
                        startPortfolioAnimations();
                    }, 1500);
                }, 1000);
                return;
            }

            const currentLine = bootLogs[logIndex];

            // Special typing effect for Login/Password inputs
            if (currentLine.startsWith("Login:") || currentLine.startsWith("Password:")) {
                if (charIndex === 0) {
                    bootTextEl.innerHTML += currentLine.split(':')[0] + ': ';
                }

                const valuePart = currentLine.split(': ')[1];
                if (charIndex < valuePart.length) {
                    bootTextEl.innerHTML += valuePart[charIndex];
                    charIndex++;
                    setTimeout(printLog, 4 + Math.random() * 100);
                } else {
                    bootTextEl.innerHTML += '<br>';
                    logIndex++;
                    charIndex = 0;
                    setTimeout(printLog, 600);
                }
            } else {
                // Print entire line at once
                bootTextEl.innerHTML += currentLine + '<br>';
                logIndex++;
                setTimeout(printLog, Math.random() * 200 + 50);
            }
        }

        // Start boot sequence shortly after load
        setTimeout(printLog, 800);
    } else {
        // Fallback if boot sequence overlay is missing
        startPortfolioAnimations();
    }

    // Random noise/text glitch generator for elements not using CSS glitch
    const glitchElements = document.querySelectorAll('.subtitle, h2');

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
