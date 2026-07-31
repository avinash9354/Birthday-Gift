/**
 * 🎂 Roshu Birthday Website - Luxury 3D Gift Box & Ring Proposal Manager
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
                title: "💌 Surprise Birthday Message",
                body: '"Roshu, every single day spent with you is a blessing to everyone around you. You bring harmony, positive energy, and happiness to all your family and friends. Thank you for being you."'
            },
            card: {
                title: "👑 Royal Birthday Card",
                body: '"To Roshu: May all your grandest dreams come true, may your heart forever overflow with serenity, and may your smile remain bright always."'
            },
            chocolate: {
                title: "🍫 Sweetest Swiss Chocolates",
                body: '"Handpicked Swiss chocolates wrapped in pure gold—just to celebrate the wonderful birthday of such a special person."'
            },
            teddy: {
                title: "🧸 Enchanted Birthday Teddy",
                body: '"A cute birthday bear to bring smiles and warm wishes whenever you need a boost of cheer and happiness!"'
            },
            flowers: {
                title: "🌹 Eternal Bouquet of Flowers",
                body: '"Vibrant lilies for joy, pink tulips for admiration, and cherry blossoms to celebrate your wonderful birthday."'
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
        const ringButtons = document.querySelector('.ring-buttons') || document.querySelector('.ring-actions');

        if (ringQuestion) {
            ringQuestion.innerHTML = `🎉 Thank you! ("${answer}") ✨<br><span style="font-size:1.1rem; color:#ffd700;">Here's to an incredible year ahead filled with happiness, success, and celebrations, Roshu!</span>`;
        }
        if (ringButtons) {
            ringButtons.innerHTML = `<button class="btn-primary glow-effect" onclick="document.getElementById('ring-modal').classList.add('hidden')">Celebrate Birthday! 🎆</button>`;
        }
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.giftController = new LuxuryGiftBoxController();
});
