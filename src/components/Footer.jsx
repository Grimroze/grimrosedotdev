import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer({ theme = 'dark' }) {
  const [timeStr, setTimeStr] = useState('');

  // Live IST (New Delhi) Clock - Clean & Non-Creepy (NO coordinates!)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const ist = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setTimeStr(`${ist} IST`);
      } catch {
        setTimeStr('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <footer className="site-colophon-footer" data-theme={theme}>
      <div className="footer-inner-container">
        {/* Main Row */}
        <div className="footer-main-row">
          {/* Identity & Status */}
          <div className="footer-col footer-col-identity">
            <div className="footer-brand-title">Goldi Soni</div>
            <div className="footer-brand-sub">
              AI Systems & Model Evaluation Engineer
            </div>
            <div className="footer-status-pill">
              <span className="footer-status-dot" />
              <span className="footer-status-text">
                {timeStr ? `NEW DELHI, INDIA · ${timeStr}` : 'NEW DELHI, INDIA'}
              </span>
            </div>
          </div>

          {/* Editorial Philosophy */}
          <div className="footer-col footer-col-quote">
            <p className="footer-philosophy-quote">
              “Overfitting on first principles, underfitting on sleep.”
            </p>
          </div>

          {/* Direct Signals / Channels */}
          <div className="footer-col footer-col-links">
            <div className="footer-links-grid">
              <a
                href="https://github.com/Grimroze"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link"
              >
                <span>GitHub</span>
                <ArrowUpRight size={11} className="footer-link-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/goldi-soni/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={11} className="footer-link-icon" />
              </a>
              <a
                href="https://leetcode.com/u/grimrose/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link"
              >
                <span>LeetCode</span>
                <ArrowUpRight size={11} className="footer-link-icon" />
              </a>
              <a
                href="mailto:grimissher@gmail.com"
                className="footer-nav-link"
              >
                <span>Email</span>
                <ArrowUpRight size={11} className="footer-link-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Hairline Row (Clean, zero repetition) */}
        <div className="footer-bottom-bar">
          <div className="footer-legal">
            <span>© {new Date().getFullYear()} · All rights reserved</span>
            <span className="footer-legal-sep">·</span>
            <span>Built with React & GSAP</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-top-btn"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="footer-top-icon" />
          </button>
        </div>
      </div>
    </footer>
  );
}
