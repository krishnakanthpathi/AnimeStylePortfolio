class AudioEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTick() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      // Short high click sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  }

  playConfirm() {
    try {
      this.init();
      if (!this.ctx) return;

      // Nier-style high-pitch chime (two fast notes)
      const now = this.ctx.currentTime;
      const playNote = (freq, start, duration) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.start(start);
        osc.stop(start + duration + 0.01);
      };

      playNote(987.77, now, 0.08); // B5
      playNote(1318.51, now + 0.06, 0.15); // E6
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  }

  playChime() {
    try {
      this.init();
      if (!this.ctx) return;

      // Soft ambient alert/chime
      const now = this.ctx.currentTime;
      const playNote = (freq, start, duration) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.03, start);
        gain.gain.linearRampToValueAtTime(0.02, start + duration * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.start(start);
        osc.stop(start + duration + 0.02);
      };

      playNote(880, now, 0.2); // A5
      playNote(1046.50, now + 0.1, 0.35); // C6
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  }

  playBuild() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const playNote = (freq, start, duration) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.015, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.start(start);
        osc.stop(start + duration + 0.01);
      };

      // Fast ascending arpeggio (C5 -> E5 -> G5 -> C6)
      playNote(523.25, now, 0.04);
      playNote(659.25, now + 0.03, 0.04);
      playNote(783.99, now + 0.06, 0.04);
      playNote(1046.50, now + 0.09, 0.12);
    } catch (e) {
      console.warn("Web Audio failed to play build:", e);
    }
  }

  playHologram() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      // Low frequency scanning hum
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.005, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Web Audio failed to play hum:", e);
    }
  }
}

// Export a singleton instance
export const audio = new AudioEngine();
