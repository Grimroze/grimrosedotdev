import React, { useState, useEffect, useRef, useCallback } from 'react';
import RefineFrame from './RefineFrame';
import './SitePreloader.css';

const STAGE_META = {
  queued: {
    badge: '01 / 04',
    step: 'ALLOCATING_LATENT_WEIGHTS',
    loss: '1.428'
  },
  generating: {
    badge: '02 / 04',
    step: 'CNN_CONV_SUPER_RESOLUTION',
    loss: '0.642'
  },
  refining: {
    badge: '03 / 04',
    step: 'LATENT_SPACE_DE_NOISING',
    loss: '0.089'
  },
  complete: {
    badge: '04 / 04',
    step: 'INFERENCE_PIPELINE_RESOLVED',
    loss: '0.000'
  }
};

export default function SitePreloader({ onFinish, onFading }) {
  const [status, setStatus] = useState('queued');
  const [fading, setFading] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  
  const barRef = useRef(null);
  const lossRef = useRef(null);
  const stepRef = useRef(null);
  const badgeRef = useRef(null);
  const overlayRef = useRef(null);

  // Prevent background scroll events while preloader is active
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('wheel', preventScroll, { passive: false });
    el.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      el.removeEventListener('wheel', preventScroll);
      el.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const exitPreloader = useCallback(() => {
    setFading(true);
    if (onFading) onFading();
    setTimeout(() => {
      onFinish();
    }, 750);
  }, [onFinish, onFading]);

  // Stage progression timer
  useEffect(() => {
    // 0 - 350ms: queued
    const t1 = setTimeout(() => {
      setStatus('generating');
    }, 350);

    // 350 - 1200ms: generating (levels 48 -> 32 -> 20 -> 12)
    const t2 = setTimeout(() => {
      setStatus('refining');
    }, 1200);

    // 1200 - 2000ms: refining -> complete (levels 12 -> 8 -> 5 -> 3 -> 2 -> 1)
    const t3 = setTimeout(() => {
      setStatus('complete');
    }, 2000);

    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        exitPreloader();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('keydown', handleKey);
    };
  }, [exitPreloader]);

  // When image hits 100% resolution (s.p >= 1.0)
  const handleResolved = useCallback(() => {
    setIsResolved(true);
    if (barRef.current) barRef.current.style.width = '100%';
    if (lossRef.current) lossRef.current.textContent = 'LOSS: 0.000';
    if (stepRef.current) stepRef.current.textContent = 'INFERENCE_PIPELINE_RESOLVED';
    if (badgeRef.current) badgeRef.current.textContent = '04 / 04';

    // Linger for 1.3 seconds so user sees the clean resolved photo, then auto-dissolve
    const lingerTimer = setTimeout(() => {
      exitPreloader();
    }, 1300);

    return () => clearTimeout(lingerTimer);
  }, [exitPreloader]);

  // Live 60fps/120fps progress tracking from RefineFrame canvas tick
  const handleProgress = useCallback((p) => {
    const pct = Math.min(100, Math.max(0, Math.round(p * 100)));
    if (barRef.current) {
      barRef.current.style.width = `${pct}%`;
    }
    if (lossRef.current) {
      const liveLoss = (1.42 * (1 - p * 0.98)).toFixed(3);
      lossRef.current.textContent = `LOSS: ${liveLoss}`;
    }
    if (stepRef.current && !isResolved) {
      if (p < 0.25) {
        stepRef.current.textContent = 'ALLOCATING_LATENT_WEIGHTS';
        if (badgeRef.current) badgeRef.current.textContent = '01 / 04';
      } else if (p < 0.6) {
        stepRef.current.textContent = 'CNN_CONV_SUPER_RESOLUTION';
        if (badgeRef.current) badgeRef.current.textContent = '02 / 04';
      } else if (p < 0.92) {
        stepRef.current.textContent = 'LATENT_SPACE_DE_NOISING';
        if (badgeRef.current) badgeRef.current.textContent = '03 / 04';
      } else {
        stepRef.current.textContent = 'INFERENCE_PIPELINE_RESOLVED';
        if (badgeRef.current) badgeRef.current.textContent = '04 / 04';
      }
    }
  }, [isResolved]);

  const meta = STAGE_META[status] || STAGE_META.queued;

  return (
    <aside
      ref={overlayRef}
      className={`site-preloader-overlay ${fading ? 'is-fading' : ''}`}
      aria-label="Site preloader loading sequence"
      onClick={exitPreloader}
      data-lenis-prevent="true"
    >
      <div className="site-preloader-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Monospace Header */}
        <div className="site-preloader-header">
          <span className="site-preloader-tag">
            <span className="site-preloader-dot" />
            GS // RECONSTRUCT
          </span>
          <span ref={badgeRef}>{meta.badge}</span>
        </div>

        {/* RefineFrame Container */}
        <div className="site-preloader-frame">
          <RefineFrame
            status={status}
            aspectRatio="4 / 3"
            width={380}
            radius={14}
            background="#0d0d11"
            color="#f4f4f6"
            stageDuration={200}
            sweep={true}
            showStatus={true}
            onProgress={handleProgress}
            onResolved={handleResolved}
            labels={{
              queued: 'ALLOCATING',
              generating: 'CNN_CONV_PASS',
              refining: 'DE_NOISING',
              complete: 'READY',
              error: 'FAILED'
            }}
          >
            <img
              src="/preloader-photo.jpg"
              alt="Neural Super-Resolution Latent"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(100%) contrast(1.12)'
              }}
            />
          </RefineFrame>
        </div>

        {/* Bottom Technical Telemetry Card */}
        <div className="site-preloader-telemetry">
          {/* Progress track */}
          <div className="site-preloader-track">
            <div
              ref={barRef}
              className="site-preloader-bar"
              style={{ width: '5%' }}
            />
          </div>

          <div className="site-preloader-status-row">
            <span ref={stepRef} className="site-preloader-step">{meta.step}</span>
            <span ref={lossRef}>LOSS: {meta.loss}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
