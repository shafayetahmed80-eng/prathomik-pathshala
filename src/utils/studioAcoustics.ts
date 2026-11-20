/**
 * Studio Acoustics & Echo DSP Engine (Zero-Latency Web Audio API)
 * Provides real-time tape delay, sweet condenser microphone warmth,
 * and concert hall reverberation directly in the browser with zero audio lag.
 */

export type AcousticPreset = "off" | "studio" | "hall";

class StudioAcousticsEngine {
  private ctx: AudioContext | null = null;
  private connectedElements = new WeakMap<HTMLAudioElement, MediaElementAudioSourceNode>();
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private lowpassFilter: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private feedbackGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private currentPreset: AcousticPreset = "off";

  private initContext() {
    if (typeof window === "undefined") return;
    if (this.ctx) return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();

      // 1. Warm condenser microphone low-pass filter (4.5 kHz) to tame harsh high frequencies
      this.lowpassFilter = this.ctx.createBiquadFilter();
      this.lowpassFilter.type = "lowpass";
      this.lowpassFilter.frequency.setValueAtTime(4500, this.ctx.currentTime);
      this.lowpassFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      // 2. Tape slapback delay node
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.115, this.ctx.currentTime); // 115ms sweet studio echo

      // 3. Feedback loop gain
      this.feedbackGain = this.ctx.createGain();
      this.feedbackGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

      // 4. Dry & Wet mix controls
      this.dryGain = this.ctx.createGain();
      this.dryGain.gain.setValueAtTime(1.0, this.ctx.currentTime);

      this.wetGain = this.ctx.createGain();
      // Default OFF as requested by user
      this.wetGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

      // 5. Studio limiter/compressor to eliminate any clipping
      this.masterCompressor = this.ctx.createDynamicsCompressor();
      this.masterCompressor.threshold.setValueAtTime(-6, this.ctx.currentTime);
      this.masterCompressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.masterCompressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.masterCompressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.masterCompressor.release.setValueAtTime(0.15, this.ctx.currentTime);

      // Internal routing:
      // Dry path: Lowpass -> DryGain -> Compressor -> Destination
      this.lowpassFilter.connect(this.dryGain);
      this.dryGain.connect(this.masterCompressor);

      // Wet/Echo path: Lowpass -> DelayNode -> Feedback -> DelayNode & WetGain -> Compressor
      this.lowpassFilter.connect(this.delayNode);
      this.delayNode.connect(this.feedbackGain);
      this.feedbackGain.connect(this.delayNode);
      this.delayNode.connect(this.wetGain);
      this.wetGain.connect(this.masterCompressor);

      // Master output
      this.masterCompressor.connect(this.ctx.destination);
    } catch {
      // Graceful fallback if Web Audio API initialization fails
    }
  }

  public async resumeContext(): Promise<void> {
    if (this.ctx && this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {}
    }
  }

  /**
   * Attaches an HTMLAudioElement to the Web Audio DSP graph.
   * Uses WeakMap to ensure createMediaElementSource is called strictly once per element.
   */
  public attachAudio(audioElement: HTMLAudioElement): void {
    if (typeof window === "undefined" || !audioElement) return;

    this.initContext();
    if (!this.ctx || !this.lowpassFilter) return;

    this.resumeContext();

    try {
      let source = this.connectedElements.get(audioElement);
      if (!source) {
        source = this.ctx.createMediaElementSource(audioElement);
        this.connectedElements.set(audioElement, source);
        source.connect(this.lowpassFilter);
      }
      this.sourceNode = source;
    } catch {
      // In case element was already attached or restricted
    }
  }

  /**
   * Sets the acoustic preset mode
   */
  public setPreset(mode: AcousticPreset): void {
    this.currentPreset = mode;
    this.initContext();
    if (!this.ctx || !this.wetGain || !this.delayNode || !this.feedbackGain) return;

    const now = this.ctx.currentTime;

    if (mode === "off") {
      this.wetGain.gain.setTargetAtTime(0.0, now, 0.05);
    } else if (mode === "studio") {
      // Sweet acoustic studio ambiance (115ms delay, 26% feedback, 32% wet)
      this.delayNode.delayTime.setTargetAtTime(0.115, now, 0.05);
      this.feedbackGain.gain.setTargetAtTime(0.26, now, 0.05);
      this.wetGain.gain.setTargetAtTime(0.32, now, 0.05);
    } else if (mode === "hall") {
      // Grand auditorium echo (220ms delay, 40% feedback, 48% wet)
      this.delayNode.delayTime.setTargetAtTime(0.22, now, 0.05);
      this.feedbackGain.gain.setTargetAtTime(0.40, now, 0.05);
      this.wetGain.gain.setTargetAtTime(0.48, now, 0.05);
    }
  }

  public toggleEcho(): AcousticPreset {
    const nextPreset: AcousticPreset = this.currentPreset === "off" ? "studio" : this.currentPreset === "studio" ? "hall" : "off";
    this.setPreset(nextPreset);
    return nextPreset;
  }

  public getPreset(): AcousticPreset {
    return this.currentPreset;
  }

  public isEchoEnabled(): boolean {
    return this.currentPreset !== "off";
  }
}

export const studioAcoustics = new StudioAcousticsEngine();
