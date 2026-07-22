/**
 * 🎂 Aradhana Birthday Website - 60 FPS Canvas Fireworks, Confetti, Mic Candle Blow & Cake Cutter
 * Features microphone blow detection, cake slice animations, and downloadable memory postcard generator
 */

class FireworksAndCakeSystem {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.fireworks = [];
        this.confetti = [];
        this.balloons = [];
        
        // Cake & Candle elements
        this.candles = document.querySelectorAll('.flame');
        this.blowBtn = document.getElementById('blow-candle-btn');
        this.micBlowBtn = document.getElementById('mic-blow-btn');
        this.cutCakeBtn = document.getElementById('cut-cake-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.replayBtn = document.getElementById('replay-btn');
        this.shareBtn = document.getElementById('share-btn');

        this.candlesBlown = false;
        this.cakeCut = false;

        this.init();
    }

    init() {
        if (this.canvas) {
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
            this.renderLoop();
        }

        // Blow candles via Click button
        if (this.blowBtn) {
            this.blowBtn.addEventListener('click', () => this.blowOutCandles());
        }

        // Blow candles via Microphone API
        if (this.micBlowBtn) {
            this.micBlowBtn.addEventListener('click', () => this.startMicrophoneBlowDetection());
        }

        // Cut cake button
        if (this.cutCakeBtn) {
            this.cutCakeBtn.addEventListener('click', () => this.cutBirthdayCake());
        }

        // Replay & Share & Download buttons
        if (this.replayBtn) {
            this.replayBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                if (window.appController) window.appController.navigateToPage('page-welcome');
            });
        }
        if (this.shareBtn) {
            this.shareBtn.addEventListener('click', () => this.shareCelebration());
        }
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.downloadMemoryPostcard());
        }
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // ==========================================
    // CANDLE BLOWING & CAKE CUTTING
    // ==========================================
    blowOutCandles() {
        if (this.candlesBlown) return;
        this.candlesBlown = true;

        if (window.audioEngine) {
            window.audioEngine.playConfettiSound();
            window.audioEngine.playSparkleSound();
        }

        // Add blown-out class to flames to trigger smoke rise
        this.candles.forEach(flame => {
            flame.classList.add('blown-out');
        });

        if (this.blowBtn) this.blowBtn.style.display = 'none';
        if (this.micBlowBtn) this.micBlowBtn.style.display = 'none';

        // Reveal Cut Cake Button
        setTimeout(() => {
            if (this.cutCakeBtn) {
                this.cutCakeBtn.classList.remove('hidden');
                this.cutCakeBtn.classList.add('bounce-in');
            }
            this.triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45);
        }, 800);
    }

    async startMicrophoneBlowDetection() {
        if (this.candlesBlown) return;
        if (window.audioEngine) window.audioEngine.playBtnSound();

        try {
            this.micBlowBtn.innerHTML = '<span>🎙️ Blow into mic now... 💨</span>';
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContextClass();
            const analyser = audioCtx.createAnalyser();
            const microphone = audioCtx.createMediaStreamSource(stream);
            
            analyser.smoothingTimeConstant = 0.4;
            analyser.fftSize = 256;
            microphone.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const checkVolume = () => {
                if (this.candlesBlown) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }

                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                const average = sum / dataArray.length;

                // Threshold for detecting wind / blow directly into microphone
                if (average > 45) {
                    stream.getTracks().forEach(track => track.stop());
                    this.blowOutCandles();
                } else {
                    requestAnimationFrame(checkVolume);
                }
            };

            checkVolume();
        } catch (err) {
            console.warn("Microphone access denied or unsupported, using click button.", err);
            this.micBlowBtn.innerHTML = '<span>❌ Mic access required. Click Blow Candles!</span>';
        }
    }

    cutBirthdayCake() {
        if (this.cakeCut) return;
        this.cakeCut = true;

        if (window.audioEngine) {
            window.audioEngine.playCakeSound();
            setTimeout(() => window.audioEngine.playFireworkSound(), 300);
        }

        if (this.cutCakeBtn) this.cutCakeBtn.style.display = 'none';

        // Animate cake slice separation
        const topTier = document.querySelector('.tier-top');
        const midTier = document.querySelector('.tier-middle');
        if (topTier) topTier.style.transform = 'translate(15px, -10px) rotate(4deg)';
        if (midTier) midTier.style.transform = 'translate(-10px, 0px) rotate(-2deg)';

        // Launch grand celebration fireworks & balloons
        this.launchGrandExplosion();
    }

    launchGrandExplosion() {
        // Launch 15 fireworks
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const x = Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1;
                const y = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.1;
                this.addFirework(x, y);
                if (window.audioEngine && Math.random() > 0.5) window.audioEngine.playFireworkSound();
            }, i * 350);
        }

        // Launch continuous confetti
        for (let i = 0; i < 120; i++) {
            this.addConfettiParticle(Math.random() * window.innerWidth, -20);
        }

        // Launch custom floating balloons with names
        const balloonNames = ["Aradhana ✨", "Happy Birthday! 🎂", "Joy & Happiness 🎉", "Best Wishes 🌸", "22 July 2026 ⭐"];
        balloonNames.forEach((text, i) => {
            setTimeout(() => {
                this.balloons.push({
                    x: Math.random() * (window.innerWidth * 0.7) + window.innerWidth * 0.15,
                    y: window.innerHeight + 100,
                    vy: -1.8 - Math.random() * 1.2,
                    text: text,
                    color: i % 2 === 0 ? '#ff3881' : '#a855f7',
                    size: 48
                });
            }, i * 600);
        });
    }

    triggerConfettiBurst(x, y) {
        const confettiColors = ['#ff3881', '#ffd700', '#a855f7', '#38b6ff', '#00f2fe', '#ffffff'];
        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 4;
            this.confetti.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: Math.random() * 8 + 6,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                alpha: 1
            });
        }
    }

    addFirework(x, y) {
        const colors = ['#ff3881', '#ffd700', '#a855f7', '#ff85b3', '#38b6ff', '#00f2fe'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 60; i++) {
            const angle = (Math.PI * 2 / 60) * i + Math.random() * 0.1;
            const speed = Math.random() * 6 + 2;
            this.fireworks.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3.5 + 1.5,
                color: chosenColor,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.015
            });
        }
    }

    addConfettiParticle(x, y) {
        const confettiColors = ['#ff3881', '#ffd700', '#a855f7', '#ff85b3', '#38b6ff', '#00f2fe', '#ffffff'];
        this.confetti.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 2,
            size: Math.random() * 10 + 6,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.15,
            alpha: 1
        });
    }

    // ==========================================
    // 60 FPS RENDER LOOP
    // ==========================================
    renderLoop() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update Fireworks
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const p = this.fireworks[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.06; // gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.fireworks.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
            this.ctx.restore();
        }

        // Update Confetti
        for (let i = this.confetti.length - 1; i >= 0; i--) {
            const c = this.confetti[i];
            c.x += c.vx;
            c.y += c.vy;
            c.rotation += c.rotSpeed;
            c.alpha -= 0.005;

            if (c.y > this.canvas.height || c.alpha <= 0) {
                this.confetti.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, c.alpha);
            this.ctx.translate(c.x, c.y);
            this.ctx.rotate(c.rotation);
            this.ctx.fillStyle = c.color;
            this.ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
            this.ctx.restore();
        }

        // Update Balloons
        for (let i = this.balloons.length - 1; i >= 0; i--) {
            const b = this.balloons[i];
            b.y += b.vy;

            if (b.y < -150) {
                this.balloons.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.translate(b.x, b.y);

            // Balloon string
            this.ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(0, b.size);
            this.ctx.lineTo(0, b.size + 60);
            this.ctx.stroke();

            // Balloon oval
            this.ctx.fillStyle = b.color;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = b.color;
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, b.size * 0.8, b.size, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Balloon Text
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 16px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowBlur = 4;
            this.ctx.shadowColor = '#000';
            this.ctx.fillText(b.text, 0, 0);

            this.ctx.restore();
        }

        requestAnimationFrame(() => this.renderLoop());
    }

    // ==========================================
    // SHARE & DOWNLOAD MEMORY POSTCARD
    // ==========================================
    shareCelebration() {
        if (window.audioEngine) window.audioEngine.playBtnSound();
        if (navigator.share) {
            navigator.share({
                title: "Happy Birthday Aradhana ✨",
                text: "Experience this grand birthday celebration dedicated to Aradhana!",
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("✨ Celebration link copied to clipboard! Share it with Aradhana & family! 🎉");
        }
    }

    downloadMemoryPostcard() {
        if (window.audioEngine) window.audioEngine.playGiftSound();

        const canvas = document.getElementById('postcard-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Draw luxury dark aurora background
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#0f0516');
        grad.addColorStop(0.5, '#2c0e4a');
        grad.addColorStop(1, '#ff3881');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw golden border frame
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 12;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        ctx.strokeStyle = '#ff85b3';
        ctx.lineWidth = 3;
        ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

        // Heading
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 54px serif';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        ctx.fillText("Happy Birthday Aradhana ✨", canvas.width / 2, 170);

        // Name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 90px serif';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff3881';
        ctx.fillText("Aradhana", canvas.width / 2, 310);

        // Date
        ctx.fillStyle = '#ff85b3';
        ctx.font = '36px sans-serif';
        ctx.fillText("22 July 2026 • Grand Celebration", canvas.width / 2, 390);

        // Quote
        ctx.fillStyle = '#fbe0dc';
        ctx.font = 'italic 34px serif';
        ctx.fillText('"May your special day be surrounded with happiness,', canvas.width / 2, 510);
        ctx.fillText('filled with laughter, and wrapped in warm blessings."', canvas.width / 2, 570);

        // Hearts & Signature
        ctx.font = '70px serif';
        ctx.fillText("✨ 🎉 🎂 🎉 ✨", canvas.width / 2, 680);

        // Download PNG link
        const link = document.createElement('a');
        link.download = 'Aradhana_Birthday_Memory_2026.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.fireworksSystem = new FireworksAndCakeSystem();
});
