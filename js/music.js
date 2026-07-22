 * 🎂 Aradhana Birthday Website - Web Audio API & MP3 Birthday Symphony Generator & Audio Visualizer
 * Synthesizes multi-layered piano/synth ambient music + high-fidelity sound effects
 */

class RomanticAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.volume = 0.75;
        this.analyser = null;
        this.visualizerCanvas = document.getElementById('music-visualizer-canvas');
        this.visualizerCtx = this.visualizerCanvas ? this.visualizerCanvas.getContext('2d') : null;
        
        const audioPath = 'assets/music/Happy%20Birthday%20To%20You%20Ji%20-%20Funny%20Hindi%20Birthday%20Song%20(Part%201)%20-%20Funzoa%20Mimi%20Teddy,%20Krsna%20Solo%20-%20Funzoa%20(128k).mp3';
        this.bgMusic = new Audio(audioPath);
        this.bgMusic.loop = true;
        this.bgMusic.volume = this.volume;
        this.mediaSource = null;

        this.initEventListeners();
    }

    initEventListeners() {
        const toggleBtn = document.getElementById('music-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleMusic());
        }

        const volSlider = document.getElementById('volume-slider');
        if (volSlider) {
            volSlider.addEventListener('input', (e) => {
                this.volume = parseFloat(e.target.value);
                if (this.masterGain && this.ctx) {
                    this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
                }
                if (this.bgMusic && !this.mediaSource) {
                    this.bgMusic.volume = Math.min(1, Math.max(0, this.volume));
                }
            });
        }
    }

    initAudioContext() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = this.volume;
            
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 64;
            
            this.masterGain.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);

            if (this.bgMusic && !this.mediaSource) {
                try {
                    this.mediaSource = this.ctx.createMediaElementSource(this.bgMusic);
                    this.mediaSource.connect(this.masterGain);
                    this.bgMusic.volume = 1.0;
                } catch (e) {
                    console.log('MediaElementSource connection error (falling back to direct audio):', e);
                    this.bgMusic.volume = Math.min(1, Math.max(0, this.volume));
                }
            }

            this.startVisualizer();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMusic() {
        this.initAudioContext();
        if (this.isPlaying) {
            this.stopSymphony();
        } else {
            this.startSymphony();
        }
    }

    startSymphony() {
        this.isPlaying = true;
        this.initAudioContext();
        const toggleBtn = document.getElementById('music-toggle-btn');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="music-icon">⏸️</span>';
            toggleBtn.setAttribute('title', 'Pause Birthday Song');
        }

        if (this.bgMusic) {
            this.bgMusic.play().catch(err => {
                console.log('Playback prevented or waiting for interaction:', err);
            });
        }
    }

    stopSymphony() {
        this.isPlaying = false;
        if (this.bgMusic) {
            this.bgMusic.pause();
        }
        const toggleBtn = document.getElementById('music-toggle-btn');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="music-icon">🎵</span>';
            toggleBtn.setAttribute('title', 'Play Birthday Song');
        }
    }

    playSynthNote(freq, duration, type = 'sine') {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25 * duration, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration * 1.5);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration * 1.6);
    }

    // ==========================================
    // SOUND EFFECTS (Gift, Buttons, Fireworks)
    // ==========================================
    playBtnSound() {
        this.initAudioContext();
        this.playSynthNote(659.25, 0.15, 'sine'); // Gentle E5 crystal chime
    }

    playGiftSound() {
        this.initAudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // Royal C major flourish
        notes.forEach((note, index) => {
            setTimeout(() => this.playSynthNote(note, 0.4, 'triangle'), index * 120);
        });
    }

    playCardSound() {
        this.initAudioContext();
        const notes = [440.00, 554.37, 659.25, 880.00]; // Golden harp glissando
        notes.forEach((note, index) => {
            setTimeout(() => this.playSynthNote(note, 0.3, 'sine'), index * 90);
        });
    }

    playFireworkSound() {
        this.initAudioContext();
        if (!this.ctx) return;
        
        // Deep boom noise
        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 180;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        setTimeout(() => this.playSynthNote(1200 + Math.random() * 400, 0.2, 'sine'), 100);
    }

    playConfettiSound() {
        this.initAudioContext();
        this.playSynthNote(880.00, 0.2, 'sine');
        setTimeout(() => this.playSynthNote(1046.50, 0.25, 'triangle'), 80);
    }

    playCakeSound() {
        this.initAudioContext();
        const notes = [392.00, 493.88, 587.33, 783.99, 987.77];
        notes.forEach((note, i) => {
            setTimeout(() => this.playSynthNote(note, 0.35, 'triangle'), i * 110);
        });
    }

    playSparkleSound() {
        this.initAudioContext();
        this.playSynthNote(1318.51, 0.2, 'sine'); // E6 high twinkle
    }

    // ==========================================
    // AUDIO VISUALIZER (60 FPS Canvas)
    // ==========================================
    startVisualizer() {
        if (!this.visualizerCtx || !this.analyser) return;
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestAnimationFrame(draw);
            this.analyser.getByteFrequencyData(dataArray);

            this.visualizerCtx.clearRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);

            const barWidth = (this.visualizerCanvas.width / bufferLength) * 2;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * this.visualizerCanvas.height;

                // Color gradient based on bar height
                this.visualizerCtx.fillStyle = `rgb(${255}, ${Math.max(56, 255 - barHeight * 6)}, ${Math.max(129, 255 - barHeight * 3)})`;
                this.visualizerCtx.fillRect(x, this.visualizerCanvas.height - barHeight, barWidth - 1, barHeight);

                x += barWidth;
            }
        };

        draw();
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.audioEngine = new RomanticAudioEngine();
});
