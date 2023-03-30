import React, { useRef, useEffect } from 'react';
import butterchurn from 'butterchurn';
import butterchurnPresets from 'butterchurn-presets';

const MilkdropVisualizer = ({ audioElement }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!audioElement) return;

    const canvas = canvasRef.current;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const butterchurnInstance = butterchurn.createVisualizer(audioContext, canvas);

    // Replace createDelay with createDelayNode
    butterchurnInstance.audioProcessor.audible = audioContext.createDelayNode();

    butterchurnInstance.connectAudio(audioElement);
    butterchurnInstance.loadPreset(butterchurnPresets.getPresets()[0], 0);

    const animate = () => {
      butterchurnInstance.render();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      butterchurnInstance.disconnectAudio();
    };
  }, [audioElement]);

  return <canvas ref={canvasRef} />;
};

export default MilkdropVisualizer;

