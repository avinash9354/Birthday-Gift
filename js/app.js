/**
 * 🎂 Aradhana Birthday Website - Master App Controller & Page Navigation Engine
 * Orchestrates loading screen progress, 7-page cinematic navigation, day/night aurora themes, and floating elements
 */

class BirthdayAppController {
    constructor() {
        this.loadingOverlay = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('loading-progress-bar');
        this.progressPercentage = document.getElementById('loading-percentage');
        this.loadingText = document.getElementById('loading-text');

        this.navPills = document.querySelectorAll('.nav-pill');
        this.pageSections = document.querySelectorAll('.page-section');
        this.beginJourneyBtn = document.getElementById('begin-journey-btn');
        this.themeToggleBtn = document.getElementById('theme-toggle-btn');

        this.currentPageId = 'page-welcome';
        this.isDayTheme = false;

        this.init();
    }

    init() {
        // Start simulated loading screen progression
        this.runLoadingScreen();

        // Setup navigation bar pill clicks
        this.navPills.forEach(pill => {
            pill.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                const targetId = pill.getAttribute('data-target');
                if (!window.isMidnightUnlocked && targetId !== 'page-welcome') {
                    if (window.countdownManager) window.countdownManager.showLockModal();
                    return;
                }
                this.navigateToPage(targetId);
            });
        });

        // Setup "Begin Magical Journey" button on Welcome page
        if (this.beginJourneyBtn) {
            this.beginJourneyBtn.addEventListener('click', () => {
                if (!window.isMidnightUnlocked) {
                    if (window.audioEngine) window.audioEngine.playBtnSound();
                    if (window.countdownManager) window.countdownManager.showLockModal();
                    return;
                }
                if (window.audioEngine) {
                    window.audioEngine.playGiftSound();
                    window.audioEngine.startSymphony();
                }
                this.navigateToPage('page-letter');
            });
        }

        // Day/Night Theme switcher
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleDayNightTheme());
        }

        // Start continuous background floating elements generator
        this.startFloatingElementsGenerator();
    }

    runLoadingScreen() {
        if (!this.loadingOverlay) return;

        const loadingPhrases = [
            "Weaving aurora starlight & love spells...",
            "Gathering 50 romantic quotes & 25 Hindi shayaris...",
            "Lighting candles on Aradhana's royal cake...",
            "Tuning celestial piano harmonies...",
            "Opening the gates of our magical love journey..."
        ];

        let progress = 0;
        let phraseIdx = 0;

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 14) + 6;
            if (progress >= 100) progress = 100;

            if (this.progressBar) this.progressBar.style.width = `${progress}%`;
            if (this.progressPercentage) this.progressPercentage.textContent = `${progress}%`;

            if (progress % 25 === 0 && phraseIdx < loadingPhrases.length) {
                if (this.loadingText) this.loadingText.textContent = loadingPhrases[phraseIdx];
                phraseIdx++;
            }

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.loadingOverlay.classList.add('fade-out');
                    if (window.audioEngine) window.audioEngine.playSparkleSound();
                }, 600);
            }
        }, 120);
    }

    navigateToPage(targetId) {
        if (!window.isMidnightUnlocked && targetId !== 'page-welcome') {
            if (window.countdownManager) window.countdownManager.showLockModal();
            return;
        }
        if (this.currentPageId === targetId) return;
        this.currentPageId = targetId;

        // Update nav pills
        this.navPills.forEach(pill => {
            if (pill.getAttribute('data-target') === targetId) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        // Update sections with smooth transition
        this.pageSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active-page');
            } else {
                section.classList.remove('active-page');
            }
        });

        // Scroll page to top smoothly
        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            activeSection.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // If navigating to Celebration page, trigger celebratory burst
        if (targetId === 'page-celebration' && window.fireworksSystem) {
            window.fireworksSystem.triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.3);
        }
    }

    toggleDayNightTheme() {
        if (window.audioEngine) window.audioEngine.playSparkleSound();
        this.isDayTheme = !this.isDayTheme;

        const htmlEl = document.documentElement;
        if (this.isDayTheme) {
            htmlEl.setAttribute('data-theme', 'day-romantic');
            this.themeToggleBtn.innerHTML = '<span class="theme-icon">☀️</span>';
            this.themeToggleBtn.setAttribute('title', 'Switch to Midnight Velvet Galaxy Mode');
        } else {
            htmlEl.setAttribute('data-theme', 'luxury-pink');
            this.themeToggleBtn.innerHTML = '<span class="theme-icon">🌙</span>';
            this.themeToggleBtn.setAttribute('title', 'Switch to Dreamy Rose Gold Aurora Mode');
        }
    }

    startFloatingElementsGenerator() {
        const container = document.getElementById('floating-elements-container');
        if (!container) return;

        const symbols = ['❤️', '💕', '💖', '💗', '✨', '🌹', '🌸', '⭐', '🦋'];

        const createFloatingSymbol = () => {
            const el = document.createElement('div');
            el.className = 'floating-symbol';
            el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            // Random positioning and duration
            const startX = Math.random() * 95;
            const size = Math.random() * 1.5 + 1;
            const duration = Math.random() * 12 + 10;
            const delay = Math.random() * 3;

            el.style.position = 'absolute';
            el.style.left = `${startX}%`;
            el.style.fontSize = `${size}rem`;
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            el.style.animation = `floatUp ${duration}s ${delay}s infinite linear`;

            container.appendChild(el);

            // Cleanup if too many DOM nodes
            if (container.children.length > 35) {
                container.removeChild(container.firstChild);
            }
        };

        // Spawn initial batch
        for (let i = 0; i < 18; i++) {
            createFloatingSymbol();
        }

        // Spawn new symbol every 2.5 seconds
        setInterval(createFloatingSymbol, 2500);
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.appController = new BirthdayAppController();
});
