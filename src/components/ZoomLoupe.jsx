import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ZoomLoupe.css';

/**
 * High-fidelity Document Card View inside the Optical Loupe
 * Uses clean, explicit typography so it is 100% immune to external CSS variable missing issues
 */
function LoupeDocumentCard({ doc }) {
  if (!doc) return null;
  return (
    <div className="loupe-doc-card">
      {/* Header Tag & Badge */}
      <div className="loupe-doc-header">
        <span className="loupe-doc-tag">{doc.tag || 'SYSTEM DOCUMENT'}</span>
        {doc.badge && <span className="loupe-doc-badge">{doc.badge}</span>}
      </div>

      {/* Title & Subtitle */}
      {doc.title && <h3 className="loupe-doc-title">{doc.title}</h3>}
      {doc.subtitle && <div className="loupe-doc-subtitle">{doc.subtitle}</div>}
      {doc.description && <p className="loupe-doc-description">{doc.description}</p>}

      {/* Structured Sections */}
      {Array.isArray(doc.sections) &&
        doc.sections.map((sec, sIdx) => (
          <div key={sIdx} className="loupe-doc-section">
            {sec.heading && <div className="loupe-doc-sec-heading">{sec.heading}</div>}
            {sec.text && <div className="loupe-doc-sec-text">{sec.text}</div>}
            {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
              <ul className="loupe-doc-bullets">
                {sec.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}
            {Array.isArray(sec.chips) && sec.chips.length > 0 && (
              <div className="loupe-doc-chips">
                {sec.chips.map((chip, cIdx) => (
                  <span key={cIdx} className="loupe-doc-chip">{chip}</span>
                ))}
              </div>
            )}
          </div>
        ))}

      {/* Tags / Items */}
      {Array.isArray(doc.items) && doc.items.length > 0 && (
        <div className="loupe-doc-chips" style={{ marginTop: '12px' }}>
          {doc.items.map((item, idx) => (
            <span key={idx} className="loupe-doc-chip">{item}</span>
          ))}
        </div>
      )}

      {/* Link */}
      {doc.link && (
        <div className="loupe-doc-link-wrap">
          <div className="loupe-doc-link">
            <span>{doc.link.label || 'View Document'}</span>
            <span style={{ fontSize: '1.2em', lineHeight: 1 }}>↗</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ZoomLoupe - Precision Optical Loupe with Mathematically Aligned Magnification
 * - Always tracks cursor accurately via global window listener
 * - 1:1 normalized percentage mapping prevents text cut-off
 * - Click-to-morph shapes (Lens, Pill, Frame)
 * - Transparent pointer-events on lens body so folder and docs remain 100% clickable
 */
export default function ZoomLoupe({
  containerRef,
  docs = [],
  focusedIndex = -1,
  shape = 'lens',
  onShapeChange,
  zoom = 2.0,
  size = 230
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [internalShape, setInternalShape] = useState(shape);
  const shapes = ['lens', 'pill', 'frame'];
  const currentShape = internalShape || shape || 'lens';

  const posRef = useRef({ x: 500, y: 350, targetX: 500, targetY: 350, clientX: 500, clientY: 350 });
  const loupeRef = useRef(null);
  const scalerRef = useRef(null);
  const mirrorCardRef = useRef(null);
  const rafRef = useRef(null);

  const [activeDocIdx, setActiveDocIdx] = useState(0);

  // Synchronize external shape prop if provided
  useEffect(() => {
    if (shape && shapes.includes(shape)) {
      setInternalShape(shape);
    }
  }, [shape]);

  // Cycle shapes on click
  const handleMorphClick = (e) => {
    e.stopPropagation();
    const curIdx = shapes.indexOf(currentShape);
    const next = shapes[(curIdx + 1) % shapes.length];
    setInternalShape(next);
    onShapeChange?.(next);
  };

  // Robust window-level pointer tracking
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef?.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Inside container boundary
      if (x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40) {
        setIsVisible(true);
        posRef.current.targetX = Math.max(0, Math.min(rect.width, x));
        posRef.current.targetY = Math.max(0, Math.min(rect.height, y));
        posRef.current.clientX = e.clientX;
        posRef.current.clientY = e.clientY;

        // Auto-detect which document or folder is under the cursor
        if (focusedIndex >= 0) {
          setActiveDocIdx(focusedIndex);
        } else {
          const itemEls = containerRef.current.querySelectorAll('.folder-item');
          let matched = -1;
          let minDistance = Infinity;

          itemEls.forEach((el, idx) => {
            const itemRect = el.getBoundingClientRect();
            // Check direct hit
            if (
              e.clientX >= itemRect.left &&
              e.clientX <= itemRect.right &&
              e.clientY >= itemRect.top &&
              e.clientY <= itemRect.bottom
            ) {
              matched = idx;
            } else {
              // Calculate center distance for closest document fallback
              const cx = itemRect.left + itemRect.width / 2;
              const cy = itemRect.top + itemRect.height / 2;
              const d = Math.hypot(e.clientX - cx, e.clientY - cy);
              if (d < minDistance) {
                minDistance = d;
                if (matched === -1) matched = idx;
              }
            }
          });

          if (matched >= 0 && matched < docs.length) {
            setActiveDocIdx(matched);
          }
        }
      } else {
        setIsVisible(false);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [containerRef, focusedIndex, docs.length]);

  // Smooth lerp loop with mathematical 1:1 focal alignment
  useEffect(() => {
    let running = true;
    const LERP = 0.24;

    const W_MIRROR = 540;
    const H_MIRROR = 760;

    const loop = () => {
      if (!running) return;
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * LERP;
      pos.y += (pos.targetY - pos.y) * LERP;

      if (loupeRef.current && containerRef?.current) {
        const loupe = loupeRef.current;
        const curW = loupe.offsetWidth || size;
        const curH = loupe.offsetHeight || size;

        // Center loupe directly at cursor
        loupe.style.transform = `translate3d(${pos.x - curW / 2}px, ${pos.y - curH / 2}px, 0)`;

        // Find currently hovered document element on screen
        const targetCardEl = containerRef.current.querySelector(
          focusedIndex >= 0
            ? `[data-folder-item="${focusedIndex}"]`
            : `[data-folder-item="${activeDocIdx}"]`
        ) || containerRef.current.querySelector('.folder-root');

        if (targetCardEl && scalerRef.current) {
          const cardRect = targetCardEl.getBoundingClientRect();

          // Calculate normalized percentage (0.0 to 1.0) of cursor within target card
          let u = 0.5;
          let v = 0.5;
          if (cardRect.width > 0 && cardRect.height > 0) {
            u = (pos.clientX - cardRect.left) / cardRect.width;
            v = (pos.clientY - cardRect.top) / cardRect.height;
            u = Math.max(0.02, Math.min(0.98, u));
            v = Math.max(0.02, Math.min(0.98, v));
          }

          // Exact focal point on mirror card
          const focalX = u * W_MIRROR;
          const focalY = v * H_MIRROR;

          // Shift so that the focal point is placed exactly at the center of the loupe aperture
          const shiftX = curW / 2 - focalX * zoom;
          const shiftY = curH / 2 - focalY * zoom;

          scalerRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scale(${zoom})`;
          scalerRef.current.style.transformOrigin = '0 0';
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size, zoom, containerRef, focusedIndex, activeDocIdx]);

  const currentDoc = docs[focusedIndex >= 0 ? focusedIndex : activeDocIdx] || docs[0];

  return (
    <div
      ref={loupeRef}
      className={`zoom-loupe ${currentShape} ${isVisible ? 'active' : ''}`}
      style={{
        width: currentShape === 'pill' ? `${size * 1.3}px` : `${size}px`,
        height: currentShape === 'pill' ? `${size * 0.74}px` : `${size}px`
      }}
      aria-label="Optical Magnifier"
    >
      {/* Optical Viewing Chamber */}
      <div className="zoom-loupe-chamber">
        <div ref={scalerRef} className="zoom-loupe-scaler">
          <div ref={mirrorCardRef} className="zoom-loupe-card-mirror">
            <LoupeDocumentCard doc={currentDoc} />
          </div>
        </div>
      </div>

      {/* Optical Glass Reflections & Refraction Effects */}
      <div className="zoom-loupe-glare" />
      <div className="zoom-loupe-chromatic" />
      <div className="zoom-loupe-rim">
        <span className="zoom-loupe-rim-highlight" />
      </div>

      {/* Interactive Morph Shape Badge at Bottom of Lens */}
      <div
        className="zoom-loupe-morph-tag"
        onClick={handleMorphClick}
        title="Click to morph shape (Lens / Pill / Frame)"
      >
        <span className="loupe-tag-dot" />
        <span className="loupe-tag-text">{currentShape.toUpperCase()} • {zoom.toFixed(1)}x</span>
      </div>
    </div>
  );
}
