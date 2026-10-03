/**
 * Subtle procedural Web Audio café soundscape generator
 * Synthesizes vinyl hiss, soft rain filter, and gentle warm harmonic tone
 */

class CafeSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private vinylNode: AudioBufferSourceNode | null = null;
  private rainNode: AudioBufferSourceNode | null = null;
  private chordOscs: OscillatorNode[] = [];

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  private start() {
    if (!this.ctx) return;
    this.isRunning = true;

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // 1. Vinyl noise generator (pink noise filtered)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      // Soft crackle pops occasionally
      const pop = Math.random() > 0.9994 ? (Math.random() - 0.5) * 0.8 : 0;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04 + pop;
      b6 = white * 0.115926;
    }

    this.vinylNode = this.ctx.createBufferSource();
    this.vinylNode.buffer = noiseBuffer;
    this.vinylNode.loop = true;

    const vinylFilter = this.ctx.createBiquadFilter();
    vinylFilter.type = 'lowpass';
    vinylFilter.frequency.setValueAtTime(950, this.ctx.currentTime);

    const vinylGain = this.ctx.createGain();
    vinylGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    this.vinylNode.connect(vinylFilter);
    vinylFilter.connect(vinylGain);
    vinylGain.connect(this.masterGain);
    this.vinylNode.start();

    // 2. Soft rain texture (high-cut white noise with gentle LFO drift)
    const rainBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const rainData = rainBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      rainData[i] = (Math.random() * 2 - 1) * 0.08;
    }

    this.rainNode = this.ctx.createBufferSource();
    this.rainNode.buffer = rainBuffer;
    this.rainNode.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    rainFilter.Q.setValueAtTime(0.6, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    this.rainNode.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(this.masterGain);
    this.rainNode.start();

    // 3. Gentle warm Rhodes/electric piano ambient drone (Cmaj9 frequencies: 130.81Hz, 196Hz, 246.94Hz, 293.66Hz)
    const freqs = [130.81, 196.00, 246.94, 293.66];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for lush analog feel
      osc.detune.setValueAtTime((idx - 1.5) * 3, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.012, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start();
      this.chordOscs.push(osc);
    });
  }

  private stop() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
    setTimeout(() => {
      try {
        if (this.vinylNode) {
          this.vinylNode.stop();
          this.vinylNode.disconnect();
          this.vinylNode = null;
        }
        if (this.rainNode) {
          this.rainNode.stop();
          this.rainNode.disconnect();
          this.rainNode = null;
        }
        this.chordOscs.forEach((osc) => {
          osc.stop();
          osc.disconnect();
        });
        this.chordOscs = [];
        this.isRunning = false;
      } catch {
        this.isRunning = false;
      }
    }, 700);
  }
}

export const cafeAudio = new CafeSoundEngine();
