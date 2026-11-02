import React from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

export default function ThemeToggle({ theme = 'dark', onToggle, ready = true }) {
  const isLight = theme === 'light';

  return (
    <div className={`theme-toggle-wrap ${ready ? 'is-ready' : 'is-pending'}`}>
      <button
        type="button"
        onClick={onToggle}
        className={`theme-toggle-btn ${isLight ? 'is-light' : 'is-dark'}`}
        aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
        title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      >
        <span className="theme-toggle-slider" />
        <span className={`theme-toggle-icon-wrap ${!isLight ? 'is-active' : ''}`}>
          <Moon size={13} strokeWidth={2.2} />
        </span>
        <span className={`theme-toggle-icon-wrap ${isLight ? 'is-active' : ''}`}>
          <Sun size={13.5} strokeWidth={2.2} />
        </span>
      </button>
    </div>
  );
}
