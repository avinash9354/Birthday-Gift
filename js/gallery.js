/**
 * 🎂 Aradhana Birthday Website - 3D Polaroid Memory Gallery & Lightbox Controller
 * Synthesizes high-aesthetic celebration illustrations & supports instant photo drop-in
 */

const GALLERY_MOMENTS_DATA = [
    {
        title: "The Golden Sunset",
        caption: "Watching the peaceful evening sun paint the sky in breathtaking shades of rose gold and orange.",
        category: "special",
        gradient: ["#ff3881", "#38b6ff"],
        emoji: "🌅",
        tilt: "-3deg"
    },
    {
        title: "Your Breathtaking Smile",
        caption: "The moments when you laugh so hard that your eyes sparkle with joy and happiness.",
        category: "smiles",
        gradient: ["#38b6ff", "#ff85b3"],
        emoji: "😊",
        tilt: "4deg"
    },
    {
        title: "Starlight Wishes",
        caption: "Making wonderful wishes for the future under the canopy of a thousand twinkling stars.",
        category: "dreams",
        gradient: ["#2c0e4a", "#00f2fe"],
        emoji: "🌌",
        tilt: "-2deg"
    },
    {
        title: "Cozy Gatherings",
        caption: "Warm coffee gatherings and wonderful conversations with friends and family that fly by so fast.",
        category: "special",
        gradient: ["#e8a598", "#38b6ff"],
        emoji: "☕",
        tilt: "3deg"
    },
    {
        title: "Joyful Days",
        caption: "Enjoying the gentle summer breeze and rejoicing in the simple happiness of everyday life.",
        category: "smiles",
        gradient: ["#38b6ff", "#00f2fe"],
        emoji: "🎉",
        tilt: "-4deg"
    },
    {
        title: "Family & Friends Bond",
        caption: "A timeless promise from family and friends to support, celebrate, and care for you always.",
        category: "dreams",
        gradient: ["#00f2fe", "#ff3881"],
        emoji: "🎂",
        tilt: "2deg"
    }
];

class MemoryGalleryController {
    constructor() {
        this.gridEl = document.getElementById('gallery-grid');
        this.lightboxEl = document.getElementById('gallery-lightbox');
        this.lightboxImg = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxSubtext = document.getElementById('lightbox-subtext');
        this.closeBtn = document.getElementById('close-lightbox-btn');
        this.currentFilter = 'all';

        this.init();
    }

    init() {
        if (!this.gridEl) return;

        this.renderGallery(this.currentFilter);
        this.setupFilterButtons();

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                this.lightboxEl.classList.add('hidden');
            });
        }
    }

    // Generate high-aesthetic canvas data URI illustration so cards look stunning immediately
    generateIllustrationDataUri(gradientColors, emoji, title) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        // Draw background gradient
        const grad = ctx.createLinearGradient(0, 0, 600, 500);
        grad.addColorStop(0, gradientColors[0]);
        grad.addColorStop(1, gradientColors[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 600, 500);

        // Draw glowing circles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(450, 350, 140, 0, Math.PI * 2);
        ctx.fill();

        // Draw Emoji
        ctx.font = '120px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 300, 220);

        // Draw Title
        ctx.font = 'bold 36px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.fillText(title, 300, 410);

        return canvas.toDataURL('image/png');
    }

    renderGallery(filter) {
        this.gridEl.innerHTML = '';

        const filteredMoments = filter === 'all' 
            ? GALLERY_MOMENTS_DATA 
            : GALLERY_MOMENTS_DATA.filter(m => m.category === filter);

        filteredMoments.forEach((item, index) => {
            const dataUri = this.generateIllustrationDataUri(item.gradient, item.emoji, item.title);

            const polaroid = document.createElement('div');
            polaroid.className = 'polaroid-card magnetic-btn';
            polaroid.style.setProperty('--tilt-angle', item.tilt);

            polaroid.innerHTML = `
                <img src="${dataUri}" class="polaroid-img" alt="${item.title}" loading="lazy">
                <div class="polaroid-caption">${item.title} ❤️</div>
            `;

            polaroid.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playCardSound();
                this.openLightbox(dataUri, item.title, item.caption);
            });

            this.gridEl.appendChild(polaroid);
        });
    }

    setupFilterButtons() {
        const btns = document.querySelectorAll('.filter-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.currentFilter = btn.getAttribute('data-filter');
                this.renderGallery(this.currentFilter);
            });
        });
    }

    openLightbox(imgSrc, title, caption) {
        if (!this.lightboxEl || !this.lightboxImg) return;

        this.lightboxImg.src = imgSrc;
        if (this.lightboxCaption) this.lightboxCaption.textContent = `${title} ✨`;
        if (this.lightboxSubtext) this.lightboxSubtext.textContent = `"${caption}"`;

        this.lightboxEl.classList.remove('hidden');
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.galleryController = new MemoryGalleryController();
});
