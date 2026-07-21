/**
 * 🎂 Aradhana Birthday Website - Luxury 3D Gift Box & Ring Proposal Manager
 * Handles ribbon opening animations, surprise reveals, and interactive ring proposal flow
 */

class LuxuryGiftBoxController {
    constructor() {
        this.giftBox = document.getElementById('luxury-gift-box');
        this.surprisesContainer = document.getElementById('gift-surprises');
        this.isOpened = false;

        // Ring Modal elements
        this.openRingBtn = document.getElementById('open-ring-modal-btn');
        this.ringModal = document.getElementById('ring-modal');
        this.closeRingBtn = document.getElementById('close-ring-modal-btn');
        this.ringYesBtn = document.getElementById('ring-yes-btn');
        this.ringAlwaysBtn = document.getElementById('ring-always-btn');

        this.init();
    }

    init() {
        if (this.giftBox) {
            this.giftBox.addEventListener('click', () => this.openGiftBox());
        }

        // Surprise items click triggers
        const items = document.querySelectorAll('.surprise-item[data-gift]');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const giftType = item.getAttribute('data-gift');
                this.handleSurpriseItemClick(giftType);
            });
        });

        // Ring Proposal flow
        if (this.openRingBtn) {
            this.openRingBtn.addEventListener('click', () => this.openRingModal());
        }
        if (this.closeRingBtn) {
            this.closeRingBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                this.ringModal.classList.add('hidden');
            });
        }
        if (this.ringYesBtn) {
            this.ringYesBtn.addEventListener('click', () => this.handleRingAcceptance("Forever & Always"));
        }
        if (this.ringAlwaysBtn) {
            this.ringAlwaysBtn.addEventListener('click', () => this.handleRingAcceptance("Absolutely YES"));
        }
    }

    openGiftBox() {
        if (this.isOpened) return;
        this.isOpened = true;

        if (window.audioEngine) window.audioEngine.playGiftSound();

        // Add opening class for CSS 3D lid lift animation
        this.giftBox.classList.add('opening');

        // Trigger confetti explosion at gift box center
        if (window.fireworksSystem) {
            const rect = this.giftBox.getBoundingClientRect();
            window.fireworksSystem.triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        // Hide instruction
        const instruction = document.querySelector('.gift-instruction');
        if (instruction) instruction.style.opacity = '0';

        // Reveal surprises after lid pops
        setTimeout(() => {
            if (this.surprisesContainer) {
                this.surprisesContainer.classList.remove('hidden');
                this.surprisesContainer.classList.add('bounce-in');
            }
            if (window.audioEngine) window.audioEngine.playConfettiSound();
        }, 600);
    }

    handleSurpriseItemClick(type) {
        if (window.audioEngine) window.audioEngine.playCardSound();

        const messages = {
            message: {
                title: "💌 Surprise Love Message",
                body: '"Aradhana, every single day spent with you is a priceless gift. You bring profound harmony, pure unconditional love, and infinite warmth into my world. Thank you for being you."'
            },
            card: {
                title: "👑 Royal Love Card",
                body: '"To Her Majesty Aradhana: May all your grandest dreams come true, may your heart forever overflow with serenity, and may your smile remain eternal."'
            },
            chocolate: {
                title: "🍫 Sweetest Swiss Chocolates",
                body: '"Handpicked Belgian and Swiss chocolates wrapped in pure gold—just to celebrate the sweetest soul in the entire universe."'
            },
            teddy: {
                title: "🧸 Enchanted Fluffy Teddy",
                body: '"Your personal cuddle bear! Whenever we are apart, give this little teddy a tight squeeze and remember how deeply I adore you."'
            },
            flowers: {
                title: "🌹 Eternal Bouquet of Roses",
                body: '"Red roses for deep passion, pink tulips for eternal admiration, and cherry blossoms to celebrate your breathtaking natural beauty."'
            }
        };

        const data = messages[type];
        if (data && window.cardsController) {
            window.cardsController.showModal(data.title, data.body, type);
        }
    }

    openRingModal() {
        if (window.audioEngine) window.audioEngine.playSparkleSound();
        if (this.ringModal) {
            this.ringModal.classList.remove('hidden');
        }
    }

    handleRingAcceptance(answer) {
        if (window.audioEngine) {
            window.audioEngine.playGiftSound();
            setTimeout(() => window.audioEngine.playConfettiSound(), 300);
        }

        if (window.fireworksSystem) {
            window.fireworksSystem.launchGrandExplosion();
        }

        const ringQuestion = document.querySelector('.ring-question');
        const ringButtons = document.querySelector('.ring-buttons');

        if (ringQuestion) {
            ringQuestion.innerHTML = `🎉 She said YES! ("${answer}") ❤️<br><span style="font-size:1.1rem; color:#ffd700;">Our souls are bound in eternal love for all lifetimes to come, Aradhana!</span>`;
        }
        if (ringButtons) {
            ringButtons.innerHTML = `<button class="btn-primary glow-effect" onclick="document.getElementById('ring-modal').classList.add('hidden')">Celebrate Our Love! 🎆</button>`;
        }
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.giftController = new LuxuryGiftBoxController();
});
