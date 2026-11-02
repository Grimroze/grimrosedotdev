import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import './DocumentReader.css';

/**
 * DocumentReader - High-fidelity individual physical paper dossier sheet
 * - Clean, distraction-free document presentation without tab/footer clutter
 * - Fixed centering, crystal-clear dark scrim, smooth physical slide-in
 * - data-lenis-prevent and stopPropagation on wheel for reliable smooth scrolling
 */
export default function DocumentReader({
  doc,
  docIndex,
  onClose
}) {
  const scrollRef = useRef(null);
  const backdropRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 220);
  };

  // Prevent background scroll events when scrolling on backdrop or paper margins
  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    const onWheel = (e) => {
      const body = scrollRef.current;
      if (!body || !body.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onTouchMove = (e) => {
      const body = scrollRef.current;
      if (!body || !body.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    backdrop.addEventListener('wheel', onWheel, { passive: false });
    backdrop.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      backdrop.removeEventListener('wheel', onWheel);
      backdrop.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isClosing]);

  if (!doc) return null;

  return (
    <div
      ref={backdropRef}
      className={`doc-reader-backdrop ${isClosing ? 'is-closing' : ''}`}
      onClick={handleClose}
      data-lenis-prevent="true"
    >
      <div
        className={`doc-reader-paper ${isClosing ? 'is-closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Paper Header */}
        <div className="doc-reader-header">
          <div className="doc-reader-header-meta">
            <span className="doc-reader-badge">{doc.badge || `0${docIndex + 1} / DOCUMENT`}</span>
            {doc.tag && <span className="doc-reader-tag">{doc.tag}</span>}
          </div>

          <button
            type="button"
            className="doc-reader-close-btn"
            onClick={handleClose}
            aria-label="Close document"
            title="Close document (Esc)"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Document Body */}
        <div
          ref={scrollRef}
          className="doc-reader-body"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {doc.title && <h2 className="doc-reader-title">{doc.title}</h2>}
          {doc.subtitle && <p className="doc-reader-subtitle">{doc.subtitle}</p>}
          {doc.description && <p className="doc-reader-desc">{doc.description}</p>}

          {/* Sections */}
          {Array.isArray(doc.sections) &&
            doc.sections.map((sec, sIdx) => (
              <div key={sIdx} className="doc-reader-section">
                {sec.heading && <h4 className="doc-reader-sec-heading">{sec.heading}</h4>}
                {sec.text && <p className="doc-reader-sec-text">{sec.text}</p>}

                {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                  <ul className="doc-reader-bullets">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}

                {Array.isArray(sec.chips) && sec.chips.length > 0 && (
                  <div className="doc-reader-chips">
                    {sec.chips.map((chip, cIdx) => (
                      <span key={cIdx} className="doc-reader-chip">{chip}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/* Top-level tags/items */}
          {Array.isArray(doc.items) && doc.items.length > 0 && (
            <div className="doc-reader-items-wrap">
              <span className="doc-reader-items-label">HIGHLIGHTS & SPECIALIZATIONS</span>
              <div className="doc-reader-chips">
                {doc.items.map((item, idx) => (
                  <span key={idx} className="doc-reader-chip highlight">{item}</span>
                ))}
              </div>
            </div>
          )}

          {/* Direct Resume Download Link if provided in document */}
          {doc.link && (
            <div className="doc-reader-link-box">
              <a
                href={doc.link.href || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-reader-text-link"
              >
                <span>{doc.link.label || 'View Full Resume (PDF)'}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
