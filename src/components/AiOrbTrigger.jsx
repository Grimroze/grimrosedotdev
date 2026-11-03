import React, { useState, useEffect, useRef } from 'react';
import Strands from './Strands';
import './AiOrbTrigger.css';

/**
 * AiOrbTrigger - Pure minimal floating 3D Glass AI Orb
 * - Smoothly blooms in after CNN Preloader finishes
 * - Automatically fades out smoothly when scrolling anywhere (up or down)
 * - Glides and fades back in smoothly when scrolling stops
 */
export default function AiOrbTrigger({ isOpen, onToggle, theme = 'dark' }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 260);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const isLight = theme === 'light';

  return (
    <div className={`ai-orb-launcher ${isScrolling ? 'is-scrolling' : 'is-idle'} ${isLight ? 'is-light' : 'is-dark'}`} data-theme={theme}>
      <button
        type="button"
        className={`ai-orb-btn ${isOpen ? 'is-active' : ''}`}
        onClick={onToggle}
        aria-label="Toggle AI Assistant"
      >
        <div className="ai-orb-canvas-wrap">
          <Strands
            glass={true}
            interactive={true}
            clickPulse={true}
            lightMode={isLight}
          />
        </div>
      </button>
    </div>
  );
}
