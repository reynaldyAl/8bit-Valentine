// ============================================
// 8-BIT VALENTINE - FULL INTERACTIVE EXPERIENCE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('💕 Valentine Website Loaded!');
    
    // Initialize all modules
    initHeroTextAnimation();  // <- di paling atas agar text animate duluan
    initCursorTrail();
    initBackgroundEffects();
    initNavigation();
    initScrollProgress();
    initHeroSection();
    initLetterSection();
    initMemoriesSection();
    initGameSection();
    initTimeSection();
    initQuestionSection();
    initBackToTop();
    initScrollAnimations();
    initMusicPrompt(); 
});

// ============================================
// HERO TEXT ANIMATION - 8-BIT STYLE
// ============================================
function initHeroTextAnimation() {
    // Animate title lines (Happy, Valentine's, Day)
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach(line => {
        const text = line.textContent.trim();
        if (!text) return;
        
        line.textContent = '';
        line.setAttribute('aria-label', text);
        
        // Split into characters
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            line.appendChild(span);
        });
    });
    
    // Animate subtitle (A little something special...)
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent.trim();
        if (!text) return;
        
        subtitle.textContent = '';
        subtitle.setAttribute('aria-label', text);
        
        // Split into words
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word;
            span.style.animationDelay = `${index * 0.15}s`;
            subtitle.appendChild(span);
            
            // Add space after word (except last)
            if (index < words.length - 1) {
                const space = document.createTextNode(' ');
                subtitle.appendChild(space);
            }
        });
    }
}

// ============================================
// CURSOR TRAIL
// ============================================
function initCursorTrail() {
    const trail = document.getElementById('cursorTrail');
    if (!trail) return;
    
    let lastX = 0;
    let lastY = 0;
    let throttle = false;
    
    document.addEventListener('mousemove', (e) => {
        if (throttle) return;
        throttle = true;
        
        setTimeout(() => {
            throttle = false;
        }, 50);
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
        );
        
        if (distance > 20) {
            createCursorDot(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
    
    function createCursorDot(x, y) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        trail.appendChild(dot);
        
        setTimeout(() => dot.remove(), 1000);
    }
}

// ============================================
// BACKGROUND EFFECTS
// ============================================
function initBackgroundEffects() {
    const heartsContainer = document.getElementById('bgHearts');
    const sparklesContainer = document.getElementById('bgSparkles');
    
    // Create floating hearts
    function createHeart() {
        if (!heartsContainer) return;
        
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = '♡';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (15 + Math.random() * 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (10 + Math.random() * 10) + 'px';
        
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 25000);
    }
    
    // Create sparkles
    function createSparkle() {
        if (!sparklesContainer) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'bg-sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        
        sparklesContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 6000);
    }
    
    // Initial creation
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 1000);
    }
    
    for (let i = 0; i < 20; i++) {
        setTimeout(createSparkle, i * 200);
    }
    
    // Continuous creation
    setInterval(createHeart, 3000);
    setInterval(createSparkle, 500);
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
        
        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Music toggle
    if (musicToggle && bgMusic) {
        let isPlaying = false;
        const musicIcon = musicToggle.querySelector('.music-icon');
        const musicText = musicToggle.querySelector('.music-text');
        
        // Set volume (0.0 to 1.0)
        bgMusic.volume = 0.5;
        
        musicToggle.addEventListener('click', () => {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    if (musicIcon) musicIcon.textContent = '♫';
                    if (musicText) musicText.textContent = 'Playing';
                }).catch(error => {
                    console.log('Audio play failed:', error);
                    isPlaying = false;
                });
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                if (musicIcon) musicIcon.textContent = '♪';
                if (musicText) musicText.textContent = 'Music';
            }
        });
        
        // Update button when music ends (jika tidak loop)
        bgMusic.addEventListener('ended', () => {
            isPlaying = false;
            musicToggle.classList.remove('playing');
            if (musicIcon) musicIcon.textContent = '♪';
            if (musicText) musicText.textContent = 'Music';
        });
    }
}

// ============================================
// SCROLL PROGRESS
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// ============================================
// HERO SECTION
// ============================================
function initHeroSection() {
    // Animate stats
    const statDays = document.getElementById('statDays');
    const startDate = new Date(2024, 1, 14); // Feb 14, 2024
    const now = new Date();
    const days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    
    if (statDays) {
        animateNumber(statDays, 0, days, 2000);
    }
    
    // Pixel heart animation
    const pixelHeartCells = document.querySelectorAll('.pixel-heart-large .heart-row span.filled');
    pixelHeartCells.forEach((cell, index) => {
        cell.style.animationDelay = (index * 0.05) + 's';
    });
}

function animateNumber(element, start, end, duration) {
    if (!element) return;
    
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Tambahkan di akhir DOMContentLoaded atau buat fungsi baru
function initMusicPrompt() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!bgMusic) return;
    
    // Tampilkan prompt setelah 2 detik
    setTimeout(() => {
        const prompt = document.createElement('div');
        prompt.id = 'musicPrompt';
        prompt.innerHTML = `
            <div class="music-prompt-content">
                <span class="prompt-icon">♪</span>
                <p>Play romantic music?</p>
                <div class="prompt-buttons">
                    <button class="prompt-yes">Yes, play! 💕</button>
                    <button class="prompt-no">No thanks</button>
                </div>
            </div>
        `;
        prompt.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: white;
            padding: 20px 25px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.5s ease;
            border: 2px solid #FFCCD5;
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .music-prompt-content {
                text-align: center;
            }
            .prompt-icon {
                font-size: 2rem;
                display: block;
                margin-bottom: 10px;
                color: #FF758F;
            }
            .music-prompt-content p {
                margin-bottom: 15px;
                color: #343A40;
                font-weight: 600;
            }
            .prompt-buttons {
                display: flex;
                gap: 10px;
            }
            .prompt-yes {
                background: linear-gradient(135deg, #FF758F, #FF4D6D);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: transform 0.2s;
            }
            .prompt-yes:hover {
                transform: scale(1.05);
            }
            .prompt-no {
                background: #f0f0f0;
                color: #666;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                transition: background 0.2s;
            }
            .prompt-no:hover {
                background: #e0e0e0;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(prompt);
        
        // Event listeners
        prompt.querySelector('.prompt-yes').addEventListener('click', () => {
            bgMusic.volume = 0.5;
            bgMusic.play();
            if (musicToggle) {
                musicToggle.classList.add('playing');
                const musicIcon = musicToggle.querySelector('.music-icon');
                const musicText = musicToggle.querySelector('.music-text');
                if (musicIcon) musicIcon.textContent = '♫';
                if (musicText) musicText.textContent = 'Playing';
            }
            prompt.remove();
        });
        
        prompt.querySelector('.prompt-no').addEventListener('click', () => {
            prompt.remove();
        });
        
        // Auto hide after 10 seconds
        setTimeout(() => {
            if (prompt.parentNode) {
                prompt.style.animation = 'slideIn 0.5s ease reverse';
                setTimeout(() => prompt.remove(), 500);
            }
        }, 10000);
        
    }, 2000);
}

// ============================================
// LETTER SECTION - SIMPLE WITH CLOSE
// ============================================
function initLetterSection() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.querySelector('.letter-paragraph');
    const letterClose = document.getElementById('letterClose');
    const letterInstruction = document.getElementById('letterInstruction');
    
    if (!envelope || !letterContent) return;
    
    const letterText = `In a world where everything seems to move so fast, you are my peaceful moment. From the very first time we met, I knew there was something special about you – something that made my heart skip a beat.

Every day with you feels like a new adventure. Your laugh is my favorite sound, your smile is my favorite sight, and your happiness is my greatest priority. You've taught me what it truly means to love and be loved.

Thank you for being my best friend, my confidant, and my greatest love. Thank you for all the little things you do that make my life infinitely better. Thank you for choosing me, every single day.

This Valentine's Day, I want you to know that my love for you grows stronger with each passing moment. You are my today and all of my tomorrows.`;

    let isOpened = false;
    let hasTyped = false;
    
    // OPEN - Klik envelope
    envelope.addEventListener('click', function(e) {
        // Jangan buka jika klik tombol close
        if (e.target.closest('.letter-close')) return;
        
        if (!isOpened) {
            isOpened = true;
            envelope.classList.add('opened');
            
            // Sembunyikan instruction
            if (letterInstruction) {
                letterInstruction.style.opacity = '0';
                letterInstruction.style.visibility = 'hidden';
            }
            
            // Mulai typing
            if (!hasTyped) {
                setTimeout(function() {
                    typeText(letterContent, letterText, 20);
                }, 1200);
                hasTyped = true;
            }
        }
    });
    
    // CLOSE - Klik tombol X
    if (letterClose) {
        letterClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isOpened) {
                isOpened = false;
                envelope.classList.remove('opened');
                
                // Tampilkan kembali instruction
                if (letterInstruction) {
                    letterInstruction.style.opacity = '1';
                    letterInstruction.style.visibility = 'visible';
                }
            }
        });
    }
}

function typeText(element, text, speed) {
    if (!element) return;
    
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// MEMORIES SECTION
// ============================================
function initMemoriesSection() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove flipped class from all cards
            memoryCards.forEach(c => {
                if (c !== card) c.classList.remove('flipped');
            });
            
            // Toggle current card
            card.classList.toggle('flipped');
        });
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// ============================================
// GAME SECTION
// ============================================
function initGameSection() {
    const gameArena = document.getElementById('gameArena');
    const gameHearts = document.getElementById('gameHearts');
    const gameOverlay = document.getElementById('gameOverlay');
    const gameEnd = document.getElementById('gameEnd');
    const startBtn = document.getElementById('startGame');
    const restartBtn = document.getElementById('restartGame');
    const scoreDisplay = document.getElementById('gameScore');
    const timeDisplay = document.getElementById('gameTime');
    const highDisplay = document.getElementById('gameHigh');
    const finalScoreDisplay = document.getElementById('finalScore');
    const endMessage = document.getElementById('endMessage');
    const powerups = document.querySelectorAll('.powerup');
    
    if (!gameArena || !startBtn) return;
    
    let score = 0;
    let timeLeft = 30;
    let highScore = localStorage.getItem('valentineHighScore') || 0;
    let gameInterval;
    let timerInterval;
    let isPlaying = false;
    let multiplier = 1;
    
    if (highDisplay) highDisplay.textContent = highScore;
    
    const heartTypes = [
        { emoji: '♡', points: 1, color: '#FF758F' },
        { emoji: '♥', points: 2, color: '#FF4D6D' },
        { emoji: '💕', points: 3, color: '#C9184A' },
        { emoji: '💖', points: 5, color: '#A4133C' }
    ];
    
    const messages = [
        { min: 0, max: 10, text: "Keep practicing! Love takes time 💕" },
        { min: 11, max: 30, text: "Not bad! Your love is growing! 💖" },
        { min: 31, max: 50, text: "Great job! You're full of love! 💗" },
        { min: 51, max: 100, text: "Amazing! You're a love master! 💝" },
        { min: 101, max: Infinity, text: "INCREDIBLE! Cupid would be proud! 💘" }
    ];
    
    function startGame() {
        score = 0;
        timeLeft = 30;
        multiplier = 1;
        isPlaying = true;
        
        if (scoreDisplay) scoreDisplay.textContent = score;
        if (timeDisplay) timeDisplay.textContent = timeLeft;
        
        if (gameOverlay) gameOverlay.classList.add('hidden');
        if (gameEnd) gameEnd.classList.add('hidden');
        if (gameHearts) gameHearts.innerHTML = '';
        
        powerups.forEach(p => p.classList.remove('active'));
        
        // Spawn hearts
        gameInterval = setInterval(spawnHeart, 800);
        
        // Timer
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeDisplay) timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
            
            // Random powerup activation
            if (timeLeft % 10 === 0 && Math.random() > 0.5) {
                activateRandomPowerup();
            }
        }, 1000);
    }
    
    function spawnHeart() {
        if (!isPlaying || !gameHearts || !gameArena) return;
        
        const heartType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        const heart = document.createElement('div');
        heart.className = 'game-heart';
        heart.textContent = heartType.emoji;
        heart.dataset.points = heartType.points;
        
        const arenaRect = gameArena.getBoundingClientRect();
        const maxX = arenaRect.width - 50;
        const maxY = arenaRect.height - 50;
        
        heart.style.left = (20 + Math.random() * maxX) + 'px';
        heart.style.top = (20 + Math.random() * maxY) + 'px';
        heart.style.color = heartType.color;
        
        heart.addEventListener('click', () => catchHeart(heart));
        
        gameHearts.appendChild(heart);
        
        // Remove heart after 2 seconds if not caught
        setTimeout(() => {
            if (heart.parentNode && !heart.classList.contains('caught')) {
                heart.style.opacity = '0';
                setTimeout(() => heart.remove(), 300);
            }
        }, 2000);
    }
    
    function catchHeart(heart) {
        if (heart.classList.contains('caught')) return;
        
        heart.classList.add('caught');
        const points = parseInt(heart.dataset.points) * multiplier;
        score += points;
        if (scoreDisplay) scoreDisplay.textContent = score;
        
        // Show points popup
        showPointsPopup(heart, points);
        
        setTimeout(() => heart.remove(), 300);
    }
    
    function showPointsPopup(heart, points) {
        if (!gameHearts) return;
        
        const popup = document.createElement('div');
        popup.textContent = '+' + points;
        popup.style.cssText = `
            position: absolute;
            left: ${heart.style.left};
            top: ${heart.style.top};
            font-family: 'Press Start 2P', cursive;
            font-size: 0.8rem;
            color: #FF4D6D;
            pointer-events: none;
            animation: popupFloat 0.8s ease-out forwards;
            z-index: 100;
        `;
        
        gameHearts.appendChild(popup);
        setTimeout(() => popup.remove(), 800);
    }
    
    function activateRandomPowerup() {
        const types = ['double', 'time', 'multi'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        powerups.forEach(p => {
            if (p.dataset.type === type) {
                p.classList.add('active');
                
                setTimeout(() => {
                    p.classList.remove('active');
                }, 5000);
            }
        });
        
        if (type === 'double') {
            multiplier = 2;
            setTimeout(() => multiplier = 1, 5000);
        } else if (type === 'time') {
            timeLeft += 5;
            if (timeDisplay) timeDisplay.textContent = timeLeft;
        } else if (type === 'multi') {
            for (let i = 0; i < 5; i++) {
                setTimeout(spawnHeart, i * 200);
            }
        }
    }
    
    function endGame() {
        isPlaying = false;
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        
        // Update high score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('valentineHighScore', highScore);
            if (highDisplay) highDisplay.textContent = highScore;
        }
        
        // Show end screen
        if (finalScoreDisplay) finalScoreDisplay.textContent = score;
        
        const message = messages.find(m => score >= m.min && score <= m.max);
        if (endMessage) endMessage.textContent = message ? message.text : messages[0].text;
        
        if (gameEnd) gameEnd.classList.remove('hidden');
    }
    
    startBtn.addEventListener('click', startGame);
    if (restartBtn) restartBtn.addEventListener('click', startGame);
    
    // Add popup animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popupFloat {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-30px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// TIME SECTION
// ============================================
function initTimeSection() {
    const daysEl = document.getElementById('timeDays');
    const hoursEl = document.getElementById('timeHours');
    const minutesEl = document.getElementById('timeMinutes');
    const secondsEl = document.getElementById('timeSeconds');
    const loveMeter = document.getElementById('loveMeter');
    
    // Set your start date here
    const startDate = new Date(2024, 1, 14); // February 14, 2024
    
    function updateTime() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTime();
    setInterval(updateTime, 1000);
    
    // Animate love meter when section is visible
    const timeSection = document.querySelector('.time-section');
    if (timeSection && loveMeter) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        loveMeter.style.width = '100%';
                    }, 500);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(timeSection);
    }
}

// ============================================
// QUESTION SECTION
// ============================================
function initQuestionSection() {
    const questionContent = document.getElementById('questionContent');
    const questionResponse = document.getElementById('questionResponse');
    const questionButtons = document.getElementById('questionButtons');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const responseAnimation = document.getElementById('responseAnimation');
    
    if (!btnYes || !btnNo) return;
    
    let noCount = 0;
    const noTexts = [
        'No',
        'Are you sure?',
        'Really sure?',
        'Think again!',
        'Last chance!',
        'Surely not?',
        "You might regret this!",
        'Give it another thought!',
        'Are you absolutely sure?',
        'This could be a mistake!',
        'Have a heart!',
        "Don't be so cold!",
        'Change of heart?',
        "Wouldn't you reconsider?",
        'Is that your final answer?',
        "You're breaking my heart ;("
    ];
    
    btnYes.addEventListener('click', () => {
        if (questionContent) questionContent.classList.add('hidden');
        if (questionResponse) questionResponse.classList.remove('hidden');
        
        // Create celebration animation
        createCelebration();
        
        // Trigger confetti hearts in background
        triggerCelebrationHearts();
    });
    
    btnNo.addEventListener('click', () => {
        noCount++;
        
        if (noCount < noTexts.length) {
            const btnText = btnNo.querySelector('span');
            if (btnText) btnText.textContent = noTexts[noCount];
        }
        
        // Make Yes button bigger and more attractive
        const currentPadding = parseInt(getComputedStyle(btnYes).paddingTop);
        const currentFontSize = parseFloat(getComputedStyle(btnYes).fontSize);
        
        btnYes.style.padding = `${currentPadding + 3}px ${currentPadding + 10}px`;
        btnYes.style.fontSize = `${currentFontSize * 1.05}px`;
        
        // Make No button smaller and move away
        if (noCount >= 3) {
            btnNo.style.fontSize = `${Math.max(0.7, 1 - noCount * 0.05)}rem`;
            btnNo.style.opacity = Math.max(0.3, 1 - noCount * 0.08);
        }
        
        // Random position for No button after several clicks
        if (noCount >= 5 && questionButtons) {
            const containerRect = questionButtons.getBoundingClientRect();
            
            btnNo.style.position = 'absolute';
            btnNo.style.left = Math.random() * (containerRect.width - 100) + 'px';
            btnNo.style.top = Math.random() * 50 - 25 + 'px';
        }
        
        // Hide No button eventually
        if (noCount >= noTexts.length - 1) {
            btnNo.style.display = 'none';
        }
    });
    
    function createCelebration() {
        if (!responseAnimation) return;
        
        // Create burst of hearts
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'response-heart';
            heart.textContent = '♡';
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 80;
            
            heart.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                font-size: 1.5rem;
                color: #FF758F;
            `;
            
            responseAnimation.appendChild(heart);
            
            heart.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0)', 
                    opacity: 0 
                },
                { 
                    transform: `translate(
                        calc(-50% + ${Math.cos(angle) * distance}px), 
                        calc(-50% + ${Math.sin(angle) * distance}px)
                    ) scale(1)`, 
                    opacity: 1,
                    offset: 0.5 
                },
                { 
                    transform: `translate(
                        calc(-50% + ${Math.cos(angle) * distance * 1.5}px), 
                        calc(-50% + ${Math.sin(angle) * distance * 1.5}px)
                    ) scale(0.5)`, 
                    opacity: 0 
                }
            ], {
                duration: 1500,
                delay: i * 50,
                easing: 'ease-out',
                fill: 'forwards'
            });
        }
    }
    
    function triggerCelebrationHearts() {
        const heartsContainer = document.getElementById('bgHearts');
        if (!heartsContainer) return;
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'bg-heart';
                heart.textContent = ['♡', '♥', '💕', '💖'][Math.floor(Math.random() * 4)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = '5s';
                heart.style.fontSize = (15 + Math.random() * 20) + 'px';
                heart.style.opacity = '0.6';
                
                heartsContainer.appendChild(heart);
                setTimeout(() => heart.remove(), 5000);
            }, i * 100);
        }
    }
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Section fade in
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });
    
    // Make hero visible immediately
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Rainbow mode!
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show message
    const msg = document.createElement('div');
    msg.textContent = '🎮 LOVE MODE ACTIVATED! 💕';
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Press Start 2P', cursive;
        font-size: 1.5rem;
        color: white;
        background: linear-gradient(135deg, #FF758F, #FF4D6D);
        padding: 30px 50px;
        border-radius: 20px;
        z-index: 10000;
        box-shadow: 0 0 50px rgba(255, 117, 143, 0.5);
        animation: bounce 0.5s ease infinite;
    `;
    
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
        document.body.style.animation = '';
    }, 3000);
}

// Console message
console.log('%c💕 Happy Valentine\'s Day! 💕', 
    'color: #FF758F; font-size: 24px; font-weight: bold; text-shadow: 2px 2px #FFB3C1;');
console.log('%cMade with love for someone special', 
    'color: #FF4D6D; font-size: 14px;');