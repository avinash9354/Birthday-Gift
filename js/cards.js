/**
 * 🎂 Aradhana Birthday Website - 20 Locked Wish Cards & Wishes/Quotes Tab Switcher
 * Ensures only one card opens at a time with rich custom animations and sound effects
 */

const TWENTY_WISHES_DATA = [
    { title: "Wish #1: Eternal Laughter", text: "May your heart always bubble with the same infectious, joyful laughter that brightens every corner of our family and home." },
    { title: "Wish #2: Radiant Health", text: "May infinite vitality, energy, and radiant wellness bless every single step of your glorious journey." },
    { title: "Wish #3: Boundless Success", text: "May every dream you hold close to your heart blossom into grand, extraordinary triumphs and accomplishments." },
    { title: "Wish #4: Unshakable Peace", text: "May profound inner tranquility and calm serenity surround your soul through every season of life." },
    { title: "Wish #5: Infinite Affection", text: "May you always feel deeply and unconditionally cherished by your family and friends every single day." },
    { title: "Wish #6: Golden Adventures", text: "May the upcoming year bring thrilling travels, breathtaking sunsets, and unforgettable memories across the globe." },
    { title: "Wish #7: Unfading Beauty", text: "May your natural elegance and pure kindness continue to inspire awe and wonder in everyone you meet." },
    { title: "Wish #8: Sweet Surprises", text: "May the universe constantly delight you with happy coincidences, sweet miracles, and magical encounters." },
    { title: "Wish #9: Courage & Wings", text: "May you always possess the fearlessness to soar toward your highest aspirations with grace and power." },
    { title: "Wish #10: Endless Blessings", text: "May divine grace shower upon you and your family, keeping you safe, prosperous, and blissful forever." },
    { title: "Wish #11: Starlight Dreams", text: "May every night bring gentle, peaceful sleep filled with sweet dreams and wonderful rest." },
    { title: "Wish #12: True Friendship", text: "May you always be surrounded by genuine, loyal souls who celebrate your brilliance and lift you higher." },
    { title: "Wish #13: Purest Joy", text: "May sorrow never find your door, and may every tear shed be one of overwhelming happiness and pride." },
    { title: "Wish #14: Creative Magic", text: "May your brilliant mind continue sparking innovative ideas and magnificent creative masterpieces." },
    { title: "Wish #15: Sunshine Mornings", text: "May every morning greet you with golden sunshine, fresh coffee, and sweet morning cheer from those around you." },
    { title: "Wish #16: Serene Sunsets", text: "May your evenings be tranquil, comfortable, and wrapped in the cozy warmth of loving family and friends." },
    { title: "Wish #17: Prosperity & Abundance", text: "May financial abundance and grand prosperity flow effortlessly into all your endeavors and projects." },
    { title: "Wish #18: Unstoppable Confidence", text: "May you stand proud knowing you are an extraordinary queen capable of conquering any challenge with grace." },
    { title: "Wish #19: Magic in the Mundane", text: "May you always find joy in simple moments—rainy days, favorite songs, warm tea, and quiet peaceful moments." },
    { title: "Wish #20: Forever Together", text: "And above all, may you always be surrounded by happiness, celebrating a hundred more wonderful birthdays!" }
];

class LockedWishCardsManager {
    constructor() {
        this.gridEl = document.getElementById('wishes-grid');
        this.modalEl = document.getElementById('card-modal');
        this.modalTitleEl = document.getElementById('card-modal-title');
        this.modalMessageEl = document.getElementById('card-modal-message');
        this.closeModalBtn = document.getElementById('close-card-modal-btn');
        this.openedCards = new Set();

        this.init();
    }

    init() {
        if (!this.gridEl) return;

        this.renderTwentyCards();

        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                this.modalEl.classList.add('hidden');
            });
        }

        // Tab switcher logic
        this.setupTabSwitcher();
    }

    renderTwentyCards() {
        this.gridEl.innerHTML = '';

        TWENTY_WISHES_DATA.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'wish-card-mini magnetic-btn';
            card.setAttribute('data-index', index);

            card.innerHTML = `
                <div class="mini-icon card-lock-icon">🔒</div>
                <span style="font-weight:600; font-size:0.9rem;">Wish #${index + 1}</span>
                <span style="font-size:0.75rem; color:var(--color-rose-gold-light);">Click to Unlock</span>
            `;

            card.addEventListener('click', () => this.handleCardClick(index, card));
            this.gridEl.appendChild(card);
        });
    }

    handleCardClick(index, cardEl) {
        if (window.audioEngine) window.audioEngine.playCardSound();

        const data = TWENTY_WISHES_DATA[index];
        this.openedCards.add(index);

        // Update card visual to unlocked
        cardEl.classList.add('opened');
        const lockIcon = cardEl.querySelector('.card-lock-icon');
        if (lockIcon) lockIcon.textContent = '🔓';

        this.showModal(data.title, `"${data.text}"`);

        // Spawn mini sparkle at card position
        if (window.fireworksSystem) {
            const rect = cardEl.getBoundingClientRect();
            window.fireworksSystem.triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
    }

    showModal(title, text, iconType = null) {
        if (!this.modalEl || !this.modalTitleEl || !this.modalMessageEl) return;

        this.modalTitleEl.textContent = title;
        this.modalMessageEl.textContent = text;

        const iconEl = document.querySelector('.card-modal-icon');
        if (iconEl) {
            const icons = { message: '💌', card: '👑', chocolate: '🍫', teddy: '🧸', flowers: '🌹' };
            iconEl.textContent = icons[iconType] || '🎁';
        }

        this.modalEl.classList.remove('hidden');
        const content = this.modalEl.querySelector('.card-modal-content');
        if (content) {
            content.classList.remove('bounce-in');
            void content.offsetWidth; // Trigger reflow
            content.classList.add('bounce-in');
        }
    }

    setupTabSwitcher() {
        const tabBtns = document.querySelectorAll('.wish-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetPaneId = btn.getAttribute('data-wishtab');
                document.querySelectorAll('.wish-tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                const activePane = document.getElementById(targetPaneId);
                if (activePane) activePane.classList.add('active');
            });
        });
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.cardsController = new LockedWishCardsManager();
});
