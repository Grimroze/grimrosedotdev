import React from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ theme = 'dark', onToggle, ready = true }) {
  const isLight = theme === 'light';

  return (
    <div className={`theme-toggle-wrap ${ready ? 'is-ready' : 'is-pending'}`}>
      <div className={`liquid-switch-wrapper ${isLight ? 'is-light' : 'is-dark'}`}>
        <input
          type="checkbox"
          role="switch"
          className="liquid-3"
          checked={isLight}
          onChange={onToggle}
          aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
          title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
        />
      </div>
    </div>
  );
}
