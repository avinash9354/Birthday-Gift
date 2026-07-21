/**
 * 🎂 Aradhana Birthday Website - Web Audio API Romantic Symphony Generator & Audio Visualizer
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
        this.sequenceInterval = null;
        this.noteIndex = 0;
        
        // Romantic chord progression frequencies (C Major / A Minor celestial ambient)
        this.chords = [
            [261.63, 329.63, 392.00, 523.25], // C Major
            [220.00, 261.63, 329.63, 440.00], // A Minor
            [174.61, 220.00, 261.63, 349.23], // F Major
            [196.00, 246.94, 293.66, 392.00]  // G Major
        ];

        this.melodyNotes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];

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
                if (this.masterGain) {
                    this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
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

            this.startVisualizer();
        }
        if (this.ctx.state === 'suspended') {
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
        const toggleBtn = document.getElementById('music-toggle-btn');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="music-icon">⏸️</span>';
            toggleBtn.setAttribute('title', 'Pause Romantic Melody');
        }

        this.playBackgroundPad();

        // Sequence arpeggiated piano melody every 600ms
        this.sequenceInterval = setInterval(() => {
            if (!this.isPlaying) return;
            
            const currentChord = this.chords[Math.floor(this.noteIndex / 4) % this.chords.length];
            const note = currentChord[this.noteIndex % currentChord.length];
            
            this.playSynthNote(note, 0.4, 'triangle');
            
            // Add gentle celestial high melody note occasionally
            if (Math.random() > 0.4) {
                const highNote = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
                setTimeout(() => {
                    if (this.isPlaying) this.playSynthNote(highNote, 0.18, 'sine');
                }, 300);
            }

            this.noteIndex++;
        }, 600);
    }

    stopSymphony() {
        this.isPlaying = false;
        clearInterval(this.sequenceInterval);
        const toggleBtn = document.getElementById('music-toggle-btn');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="music-icon">🎵</span>';
            toggleBtn.setAttribute('title', 'Play Romantic Melody');
        }
    }

    playBackgroundPad() {
        if (!this.isPlaying || !this.ctx) return;
        const padOsc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();
        
        padOsc.type = 'sine';
        padOsc.frequency.value = 130.81; // Deep warm C3 pad
        
        padGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        padGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);
        
        padOsc.connect(padGain);
        padGain.connect(this.masterGain);
        padOsc.start();

        // Stop pad if music pauses
        const checkPad = setInterval(() => {
            if (!this.isPlaying) {
                padGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1);
                setTimeout(() => padOsc.stop(), 1000);
                clearInterval(checkPad);
            }
        }, 500);
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
