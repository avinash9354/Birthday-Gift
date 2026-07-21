/**
 * 🎂 Aradhana Birthday Website - Live Countdown & 12:00 AM Gatekeeper Manager
 * Counts down precisely to 22 July 2026 12:00 AM Midnight (`Jab 12 Baje Tab Hi Open Ho`)
 * Enforces lock until midnight while providing a secret bypass for testing/development!
 */

class BirthdayCountdownManager {
    constructor() {
        // Target birthday: July 22, 2026 00:00:00 (Midnight exactly)
        this.targetDate = new Date('2026-07-22T00:00:00').getTime();
        
        // DOM Elements
        this.daysEl = document.getElementById('cd-days');
        this.hoursEl = document.getElementById('cd-hours');
        this.minutesEl = document.getElementById('cd-minutes');
        this.secondsEl = document.getElementById('cd-seconds');
        this.statusEl = document.getElementById('countdown-status');
        this.currentTimeEl = document.getElementById('current-time');
        this.beginBtn = document.getElementById('begin-journey-btn');
        
        // Modals
        this.lockModal = document.getElementById('midnight-lock-modal');
        this.celebrateModal = document.getElementById('midnight-celebrate-modal');
        
        this.hasCelebratedAuto = false;
        this.intervalId = null;
        this.secretTapCount = 0;

        // Global Gatekeeper flag (Locked by default unless midnight reached or bypassed)
        window.isMidnightUnlocked = false;

        this.init();
    }

    init() {
        // Check initial state
        this.checkInitialLockState();
        this.setupGatekeeperEvents();

        this.updateClockAndCountdown();
        this.intervalId = setInterval(() => this.updateClockAndCountdown(), 1000);
    }

    checkInitialLockState() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance > 0 && !window.isMidnightUnlocked) {
            document.body.classList.add('gate-locked');
            this.updateBeginButtonState(true);
        } else {
            this.unlockWonderland(false);
        }
    }

    updateBeginButtonState(isLocked) {
        if (!this.beginBtn) return;
        if (isLocked) {
            this.beginBtn.innerHTML = `<span>🔒 Unlocks at 12:00 AM Midnight</span><span class="btn-arrow">⏳</span>`;
        } else {
            this.beginBtn.innerHTML = `<span>Begin Magical Journey</span><span class="btn-arrow">✨</span>`;
        }
    }

    setupGatekeeperEvents() {
        // Close Lock Modal
        const closeLockBtns = ['close-midnight-modal-btn', 'close-lock-ack-btn'];
        closeLockBtns.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    if (this.lockModal) this.lockModal.classList.add('hidden');
                    if (window.audioEngine) window.audioEngine.playBtnSound();
                });
            }
        });

        // Secret Preview / Bypass Button inside lock modal (For Developer / User instant testing)
        const bypassBtn = document.getElementById('bypass-lock-btn');
        if (bypassBtn) {
            bypassBtn.addEventListener('click', () => {
                if (this.lockModal) this.lockModal.classList.add('hidden');
                if (window.audioEngine) window.audioEngine.playSparkleSound();
                this.unlockWonderland(false);
                alert('⚡ Gatekeeper Lock Bypassed for Testing/Preview! All 7 doors are now unlocked ❤️');
            });
        }

        // Close Celebrate Modal
        const closeCelebrateBtn = document.getElementById('close-celebrate-modal-btn');
        if (closeCelebrateBtn) {
            closeCelebrateBtn.addEventListener('click', () => {
                if (this.celebrateModal) this.celebrateModal.classList.add('hidden');
                if (window.audioEngine) window.audioEngine.playBtnSound();
            });
        }

        // Enter Wonderland from Celebrate Modal
        const enterBtn = document.getElementById('enter-wonderland-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                if (this.celebrateModal) this.celebrateModal.classList.add('hidden');
                if (window.audioEngine) {
                    window.audioEngine.playGiftSound();
                    window.audioEngine.startSymphony();
                }
                if (window.appController) window.appController.navigateToPage('page-letter');
            });
        }

        // Secret Triple-Tap on Hero Name or Mobile Brand Header to unlock anytime
        const titles = document.querySelectorAll('.hero-name, .mobile-brand-header');
        titles.forEach(title => {
            title.addEventListener('click', () => {
                this.secretTapCount++;
                if (this.secretTapCount >= 3) {
                    this.secretTapCount = 0;
                    if (!window.isMidnightUnlocked) {
                        if (window.audioEngine) window.audioEngine.playSparkleSound();
                        this.unlockWonderland(false);
                        alert('⚡ Secret Triple-Tap Unlocked Aradhana\'s Wonderland! You can now explore all sections ❤️');
                    }
                }
            });
        });
    }

    showLockModal() {
        if (!this.lockModal) return;
        
        // Update remaining time inside lock modal
        const now = new Date().getTime();
        const distance = Math.max(0, this.targetDate - now);
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const msgEl = document.getElementById('midnight-lock-msg');
        if (msgEl && distance > 0) {
            msgEl.innerHTML = `Aradhana's Birthday Wonderland opens precisely when the clock strikes <strong>12:00 AM Midnight on 22nd July 2026!</strong><br><br>⏳ Time Remaining: <strong>${hours} Hours, ${minutes} Minutes</strong><br><br>Please wait until the clock strikes 12:00 AM to unseal the surprise! ❤️`;
        }

        this.lockModal.classList.remove('hidden');
    }

    unlockWonderland(isAutoStrike = false) {
        window.isMidnightUnlocked = true;
        document.body.classList.remove('gate-locked');
        this.updateBeginButtonState(false);

        if (isAutoStrike && !this.hasCelebratedAuto) {
            this.hasCelebratedAuto = true;
            if (window.fireworksSystem) {
                window.fireworksSystem.launchGrandExplosion();
            }
            if (window.audioEngine) {
                window.audioEngine.playGiftSound();
                window.audioEngine.startSymphony();
            }
            if (this.celebrateModal) {
                this.celebrateModal.classList.remove('hidden');
            }
        }
    }

    updateClockAndCountdown() {
        const now = new Date();
        
        // Update Live Clock Display
        if (this.currentTimeEl) {
            const timeOptions = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            this.currentTimeEl.textContent = `Current Time: ${now.toLocaleDateString('en-US', timeOptions)}`;
        }

        const distance = this.targetDate - now.getTime();

        // If birthday has arrived or passed! (`Jab 12 Baje`)
        if (distance <= 0) {
            if (this.daysEl) this.daysEl.textContent = '00';
            if (this.hoursEl) this.hoursEl.textContent = '00';
            if (this.minutesEl) this.minutesEl.textContent = '00';
            if (this.secondsEl) this.secondsEl.textContent = '00';

            if (this.statusEl) {
                this.statusEl.innerHTML = '🎉 IT\'S 12:00 AM MIDNIGHT! HAPPY BIRTHDAY ARADHANA! 🎂✨';
                this.statusEl.classList.add('pulse-glow');
            }

            // Automatically unlock when 12 AM strikes!
            if (!window.isMidnightUnlocked || !this.hasCelebratedAuto) {
                this.unlockWonderland(true);
            }
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM with two digits formatting
        if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, '0');
        if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, '0');
        if (this.minutesEl) this.minutesEl.textContent = String(minutes).padStart(2, '0');
        if (this.secondsEl) this.secondsEl.textContent = String(seconds).padStart(2, '0');
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.countdownManager = new BirthdayCountdownManager();
});
