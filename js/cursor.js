/**
 * 🎂 Aradhana Birthday Website - Custom Heart Cursor, Sparkle Trails & Magnetic Ripple
 * 60 FPS Canvas Particle System & Magnetic Button Interaction
 */

class MagicCursorSystem {
    constructor() {
        this.cursorEl = document.getElementById('heart-cursor');
        this.canvas = document.getElementById('cursor-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
        this.isMobile = window.innerWidth <= 768;

        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
            this.resizeCanvas();
        });

        if (this.isMobile) {
            // Touch interaction for Mobile Phones (`Phone Ke Liye Best Touch Burst & Sparkle`)
            window.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    const touch = e.touches[0];
                    this.createClickBurst(touch.clientX, touch.clientY);
                    this.addSparkle(touch.clientX, touch.clientY);
                }
            }, { passive: true });

            window.addEventListener('touchmove', (e) => {
                if (e.touches && e.touches[0] && Math.random() > 0.45) {
                    const touch = e.touches[0];
                    this.addSparkle(touch.clientX, touch.clientY);
                }
            }, { passive: true });
        } else {
            // Track mouse coordinates for Desktop/Tablet
            window.addEventListener('mousemove', (e) => {
                this.mouse.targetX = e.clientX;
                this.mouse.targetY = e.clientY;
                
                // Spawn sparkle trail
                if (Math.random() > 0.35) {
                    this.addSparkle(e.clientX, e.clientY);
                }
            });

            // Click burst of floating hearts and emojis
            window.addEventListener('click', (e) => {
                this.createClickBurst(e.clientX, e.clientY);
            });

            // Initialize magnetic button effect
            this.setupMagneticButtons();
        }

        // Start 60 FPS loop for all devices
        this.render();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addSparkle(x, y) {
        const colors = ['#ff3881', '#ffd700', '#a855f7', '#38b6ff', '#00f2fe', '#ffffff'];
        const emojis = ['✨', '💖', '⭐', '🌸', '🩵', '💫'];
        const isEmoji = Math.random() > 0.65;

        this.particles.push({
            x: x + (Math.random() - 0.5) * 16,
            y: y + (Math.random() - 0.5) * 16,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 1,
            size: isEmoji ? Math.random() * 12 + 10 : Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            life: Math.random() * 0.03 + 0.02,
            isEmoji: isEmoji,
            emoji: isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : null,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.1
        });
    }

    createClickBurst(x, y) {
        const burstEmojis = ['❤️', '💕', '💖', '💗', '✨', '🌹', '👑', '🎂', '🩵', '🦋'];
        for (let i = 0; i < 16; i++) {
            const angle = (Math.PI * 2 / 16) * i + (Math.random() - 0.5) * 0.5;
            const speed = Math.random() * 6 + 3;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: Math.random() * 18 + 14,
                alpha: 1,
                life: 0.018,
                isEmoji: true,
                emoji: burstEmojis[Math.floor(Math.random() * burstEmojis.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.15
            });
        }
    }

    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.magnetic-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = (e.clientX - centerX) * 0.25;
                const distY = (e.clientY - centerY) * 0.25;
                btn.style.transform = `translate(${distX}px, ${distY}px) scale(1.03)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px) scale(1)`;
            });
        });
    }

    render() {
        // Smooth cursor lerp
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.2;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.2;
        
        if (this.cursorEl) {
            this.cursorEl.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04; // Gentle gravity
            p.alpha -= p.life;
            p.rotation += p.rotSpeed;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);

            if (p.isEmoji) {
                this.ctx.font = `${p.size}px serif`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(p.emoji, 0, 0);
            } else {
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = p.color;
            }

            this.ctx.restore();
        }

        requestAnimationFrame(() => this.render());
    }
}

// Global initialization when DOM loads
window.addEventListener('DOMContentLoaded', () => {
    window.magicCursor = new MagicCursorSystem();
});
