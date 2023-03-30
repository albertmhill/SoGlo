import AudioProcessor from 'butterchurn/lib/audioProcessor';

class CustomAudioProcessor extends AudioProcessor {
    constructor(context) {
    super(context);

    if (context) {
      this.audioContext = context;
      this.audible = context.createDelayNode();
      this.analyser = context.createAnalyser();
      this.analyser.smoothingTimeConstant = 0.0;
      this.analyser.fftSize = this.fftSize;
      this.audible.connect(this.analyser);

      // The rest of the constructor code remains the same
    }
  }
}

export default CustomAudioProcessor;
