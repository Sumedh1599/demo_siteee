import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Loading.css';

function Loading() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const invertedURef = useRef(null);
  const letterURef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const invertedU = invertedURef.current;
    const letterU = letterURef.current;

    if (!container || !invertedU || !letterU) return;

    // Set equal durations for both rotations to finish together
    // Start stage 3 immediately after stage 2
    const timeout = setTimeout(() => {
      // Remove stage 2 animations and set final positions
      invertedU.classList.remove('auto-rotate-clockwise');
      letterU.classList.remove('auto-rotate-anticlockwise225');

      // Set final stage 2 positions
      invertedU.style.transform = 'rotate(90deg)';
      letterU.style.transform = 'rotate(-270deg)';

      // Start stage 3 - variable speed spinning
      container.classList.add('auto-spin-together');
    }, isDark ? 1000 : 800); // Match rotation duration - dark: 1s, light: 0.8s

    return () => clearTimeout(timeout);
  }, [isDark]);

  return (
    <div className={`loading-page ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <div className="loader-wrapper">
        <div className="loader-container" ref={containerRef}>
          <div className="number-zero auto-zero-disappear" id="zero"></div>
          <div className="letter-u-inverted auto-rotate-clockwise" ref={invertedURef} id="invertedU"></div>
          <div className="letter-u auto-rotate-anticlockwise225" ref={letterURef} id="letterU"></div>
        </div>
        <div className="loading-text">Loading..</div>
      </div>
    </div>
  );
}

export default Loading;

