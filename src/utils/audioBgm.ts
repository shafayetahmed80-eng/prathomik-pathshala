/**
 * Ambient Classroom Poetry Acoustic Audio Synthesizer (Web Audio API)
 * Zero external audio downloads. Generates warm, organic, acoustic-modeled
 * folk instruments:
 * - Melody: Sweet Bamboo Flute (মিষ্টি বাঁশি) with authentic breath vibrato & overtones
 * - Beat: Folk Ektara Pluck & Acoustic Percussion (দোতারা ও খোল/তবলা ছন্দ)
 * - Drama: Expressive Bowed Strings / Esraj (ভাবগম্ভীর এস্রাজ)
 * Includes smooth dynamic auto-ducking for clear teacher/student voice playback.
 */

export type BgmMood = "melody" | "beat" | "drama";

class PoetryBgmEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isPlayingBgm = false;
  private loopTimer: NodeJS.Timeout | null = null;
  private currentMood: BgmMood = "melody";

  // Gentle Bengali folk-friendly pentatonic notes (Bhupali / Bilawal scale): C4, D4, E4, G4, A4, C5
  private readonly MELODY_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 293.66];
  private readonly BEAT_PLUCK_NOTES = [261.63, 329.63, 392.0, 523.25]; // Ektara/Dotara arpeggios
  private readonly DRAMA_CHORDS = [196.0, 246.94, 293.66, 392.0]; // G minor/modal suspense

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMood(mood: BgmMood) {
    this.currentMood = mood;
  }

  /**
   * Synthesize an authentic acoustic Bamboo Flute note (মিষ্টি বাঁশি)
   * Uses fundamental + 2nd harmonic overtone + natural breath vibrato LFO
   */
  private playAcousticFluteNote(ctx: AudioContext, dest: AudioNode, freq: number, now: number, duration: number) {
    // 1. Master note gain with smooth flute attack and gentle breath release
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.22, now + 0.08); // 80ms breath attack
    noteGain.gain.setValueAtTime(0.20, now + duration - 0.2);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // 2. Resonant warm bamboo body filter
    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = "bandpass";
    bodyFilter.frequency.setValueAtTime(freq * 1.5, now);
    bodyFilter.Q.setValueAtTime(1.8, now);

    // 3. Gentle breath vibrato LFO (4.8 Hz flute waver)
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(4.8, now);
    vibratoGain.gain.setValueAtTime(freq * 0.012, now); // ~1.2% pitch modulation
    vibrato.connect(vibratoGain);

    // 4. Fundamental tone (pure hollow core)
    const fundamental = ctx.createOscillator();
    fundamental.type = "sine";
    fundamental.frequency.setValueAtTime(freq, now);
    vibratoGain.connect(fundamental.frequency);

    // 5. 2nd Harmonic (warm wooden body overtone)
    const harmonic2 = ctx.createOscillator();
    const harmonic2Gain = ctx.createGain();
    harmonic2.type = "sine";
    harmonic2.frequency.setValueAtTime(freq * 2, now);
    harmonic2Gain.gain.setValueAtTime(0.18, now); // 18% overtone strength
    vibratoGain.connect(harmonic2.frequency);

    fundamental.connect(bodyFilter);
    harmonic2.connect(harmonic2Gain);
    harmonic2Gain.connect(bodyFilter);
    bodyFilter.connect(noteGain);
    noteGain.connect(dest);

    vibrato.start(now);
    fundamental.start(now);
    harmonic2.start(now);

    vibrato.stop(now + duration);
    fundamental.stop(now + duration);
    harmonic2.stop(now + duration);
  }

  /**
   * Synthesize acoustic Dotara/Ektara string pluck
   */
  private playAcousticPluckNote(ctx: AudioContext, dest: AudioNode, freq: number, now: number) {
    const pluckGain = ctx.createGain();
    pluckGain.gain.setValueAtTime(0.25, now);
    pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.35);

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    osc.connect(filter);
    filter.connect(pluckGain);
    pluckGain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  /**
   * Synthesize soft folk acoustic percussion (খোল/তবলা মৃদু থাপ)
   */
  private playAcousticPercussion(ctx: AudioContext, dest: AudioNode, now: number) {
    const percGain = ctx.createGain();
    percGain.gain.setValueAtTime(0.18, now);
    percGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.18); // Low duggi sweep

    osc.connect(percGain);
    percGain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  /**
   * Starts soothing ambient acoustic melody in the background
   */
  public startBgm() {
    const ctx = this.initContext();
    if (!ctx) return;

    if (this.isPlayingBgm) return;
    this.isPlayingBgm = true;

    if (!this.bgmGain) {
      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.11, ctx.currentTime);
      this.bgmGain.connect(ctx.destination);
    }

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.isPlayingBgm || !this.ctx || !this.bgmGain) return;

      const now = this.ctx.currentTime;

      if (this.currentMood === "beat") {
        // Folk Dotara Pluck + Soft Acoustic Duggi Beat
        const freq = this.BEAT_PLUCK_NOTES[noteIdx % this.BEAT_PLUCK_NOTES.length];
        this.playAcousticPluckNote(this.ctx, this.bgmGain, freq, now);

        if (noteIdx % 2 === 0) {
          this.playAcousticPercussion(this.ctx, this.bgmGain, now);
        }
        noteIdx++;

        this.loopTimer = setTimeout(playNextNote, 480);
      } else if (this.currentMood === "drama") {
        // Expressive Cinematic Esraj/Strings
        const freq = this.DRAMA_CHORDS[noteIdx % this.DRAMA_CHORDS.length];
        noteIdx++;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(420, now);

        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.linearRampToValueAtTime(0.18, now + 0.35);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.bgmGain);

        osc.start(now);
        osc.stop(now + 1.85);

        this.loopTimer = setTimeout(playNextNote, 1400);
      } else {
        // Authentic Sweet Bamboo Flute (মিষ্টি বাঁশির সুর)
        const freq = this.MELODY_NOTES[noteIdx % this.MELODY_NOTES.length];
        noteIdx++;
        const duration = 1.2;

        this.playAcousticFluteNote(this.ctx, this.bgmGain, freq, now, duration);
        this.loopTimer = setTimeout(playNextNote, 980);
      }
    };

    playNextNote();
  }

  /**
   * Stops the background ambient music
   */
  public stopBgm() {
    this.isPlayingBgm = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.25);
    }
  }

  /**
   * Adjust overall BGM volume level (0.0 to 1.0)
   */
  public setVolume(vol: number) {
    if (!this.bgmGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, vol));
    const targetVolume = clamped * 0.12;
    this.bgmGain.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.1);
  }

  /**
   * Auto-ducking: dynamically lower BGM volume when recitation voice is speaking
   */
  public duckBgm(duck: boolean) {
    if (!this.bgmGain || !this.ctx) return;
    const targetVolume = duck ? 0.025 : 0.11;
    this.bgmGain.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.2);
  }

  /**
   * Celebratory chime sound effect for kids completing a line or poem!
   */
  public playCelebrationChime() {
    const ctx = this.initContext();
    if (!ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.28, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }

  /**
   * Soft tick sound for countdown
   */
  public playTick() {
    const ctx = this.initContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }
}

export const bgmEngine = new PoetryBgmEngine();
