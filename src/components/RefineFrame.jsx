import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Check, AlertCircle, RotateCcw } from 'lucide-react';
import './RefineFrame.css';

const STAGES = {
  queued: { blur: 4, sat: 0.6, scale: 1.04, opacity: 0.55 },
  generating: { blur: 1.5, sat: 0.8, scale: 1.02, opacity: 0.85 },
  refining: { blur: 0.5, sat: 0.95, scale: 1.005, opacity: 1 },
  complete: { blur: 0, sat: 1, scale: 1, opacity: 1 },
  error: { blur: 2, sat: 0.5, scale: 1, opacity: 0.28 }
};

const TARGET = { queued: 0.05, generating: 0.55, refining: 0.88, complete: 1 };
const LEVELS = [48, 32, 20, 12, 8, 5, 3, 2, 1];
const EDGE = 28;
const STRIPS = 14;

const DEFAULT_LABELS = {
  queued: 'Queued',
  generating: 'Generating',
  refining: 'Refining',
  complete: 'Ready',
  error: 'Failed'
};

const ACTIVE = new Set(['queued', 'generating', 'refining']);

const build = (s, canvas, img, dpr) => {
  const rect = canvas.getBoundingClientRect();
  const W = Math.max(1, Math.round((rect.width || 380) * dpr));
  const H = Math.max(1, Math.round((rect.height || 285) * dpr));
  const key = `${img.currentSrc || img.src}|${W}x${H}`;
  if (s.key === key && s.levels && s.levels.length > 0) return;
  s.key = key;
  s.w = W;
  s.h = H;
  canvas.width = W;
  canvas.height = H;
  const iw = img.naturalWidth || 736;
  const ih = img.naturalHeight || 548;
  const cover = Math.max(W / iw, H / ih);
  const sw = W / cover;
  const sh = H / cover;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  
  const glint = canvas.getContext('2d')?.createLinearGradient(0, 0, W, 0) ?? null;
  if (glint) {
    for (const [at, a] of [
      [0, 0],
      [0.08, 0.1],
      [0.2, 0.7],
      [0.32, 1],
      [0.68, 1],
      [0.8, 0.7],
      [0.92, 0.1],
      [1, 0]
    ]) {
      glint.addColorStop(at, `rgba(255, 255, 255, ${a})`);
    }
  }
  s.glint = glint;
  
  s.levels = LEVELS.map(block => {
    const b = block === 1 ? 1 : Math.max(2, Math.round(block * dpr));
    const full = document.createElement('canvas');
    full.width = W;
    full.height = H;
    const fc = full.getContext('2d');
    if (!fc) return full;
    if (b === 1) {
      fc.imageSmoothingEnabled = true;
      fc.imageSmoothingQuality = 'high';
      fc.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      return full;
    }
    const small = document.createElement('canvas');
    small.width = Math.max(1, Math.round(W / b));
    small.height = Math.max(1, Math.round(H / b));
    const sc = small.getContext('2d');
    if (sc) {
      sc.imageSmoothingEnabled = true;
      sc.imageSmoothingQuality = 'high';
      sc.drawImage(img, sx, sy, sw, sh, 0, 0, small.width, small.height);
    }
    fc.imageSmoothingEnabled = false;
    fc.drawImage(small, 0, 0, W, H);
    return full;
  });

  // Immediately draw level 0 (the 48px chunky mosaic) so canvas is NEVER blank or flashing!
  const ctx = canvas.getContext('2d');
  if (ctx && s.levels[0]) {
    ctx.drawImage(s.levels[0], 0, 0);
  }
};

export default function RefineFrame({
  status = 'generating',
  children,
  aspectRatio = '4 / 3',
  width = 380,
  radius = 14,
  background = '#111115',
  color = '#f5f5f5',
  stageDuration = 220,
  sweep = true,
  showStatus = true,
  labels = DEFAULT_LABELS,
  retryLabel = 'Retry',
  onRetry,
  onResolved,
  onProgress,
  className = ''
}) {
  const stage = STAGES[status] ?? STAGES.generating;
  const active = ACTIVE.has(status);
  const text = { ...DEFAULT_LABELS, ...labels };
  const printRef = useRef(null);
  const canvasRef = useRef(null);
  const sim = useRef({ p: 0, raf: 0, last: 0, key: '', w: 0, h: 0, levels: [], glint: null, sent: false });
  const live = useRef({});
  live.current = { status, stageDuration, sweep, reduce: false };
  const [resolved, setResolved] = useState(false);

  const tick = now => {
    const s = sim.current;
    const c = live.current;
    const canvas = canvasRef.current;
    const img = printRef.current?.querySelector('img');
    if (!canvas || !img || !img.naturalWidth) {
      s.raf = 0;
      return;
    }
    const dt = Math.min(0.05, s.last ? (now - s.last) / 1000 : 0.016);
    s.last = now;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    build(s, canvas, img, dpr);
    
    if (!s.levels || s.levels.length === 0) {
      s.raf = 0;
      return;
    }
    
    const n = s.levels.length - 1;
    const target = TARGET[c.status] ?? s.p;
    const rate = c.reduce ? 1e9 : 1 / (n * (c.stageDuration / 1000));
    const step = rate * dt;
    if (target < s.p) s.p = target;
    else if (target - s.p <= step) s.p = target;
    else s.p += step;
    
    if (onProgress) {
      onProgress(s.p);
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const L = s.p * n;
      const i = Math.min(n, Math.floor(L + 1e-6));
      const frac = L - i;
      ctx.globalAlpha = 1;
      if (s.levels[i]) {
        ctx.drawImage(s.levels[i], 0, 0);
      }
      if (i < n && frac > 0 && s.levels[i + 1]) {
        const edge = EDGE * dpr;
        const front = frac * (s.h + edge) - edge / 2;
        const top = Math.max(0, Math.floor(front - edge / 2));
        if (top > 0) ctx.drawImage(s.levels[i + 1], 0, 0, s.w, top, 0, 0, s.w, top);
        const sh = edge / STRIPS;
        for (let k = 0; k < STRIPS; k += 1) {
          const y = front - edge / 2 + k * sh;
          if (y + sh <= 0 || y >= s.h) continue;
          const t = 1 - (k + 0.5) / STRIPS;
          ctx.globalAlpha = t * t * (3 - 2 * t);
          const y0 = Math.max(0, y);
          const h0 = Math.min(s.h, y + sh) - y0;
          if (h0 > 0) ctx.drawImage(s.levels[i + 1], 0, y0, s.w, h0, 0, y0, s.w, h0);
        }
        ctx.globalAlpha = 1;
        if (c.sweep && !c.reduce && s.glint && front > 0 && front < s.h) {
          ctx.fillStyle = s.glint;
          ctx.globalAlpha = 0.14;
          ctx.fillRect(0, front - 2 * dpr, s.w, 4 * dpr);
          ctx.globalAlpha = 0.32;
          ctx.fillRect(0, front - dpr, s.w, 2 * dpr);
          ctx.globalAlpha = 1;
        }
      }
    }
    
    const done = s.p >= 1;
    if (done !== s.sent) {
      s.sent = done;
      setResolved(done);
      if (done && onResolved) {
        onResolved();
      }
    }
    
    const keep = (!c.reduce && ACTIVE.has(c.status)) || Math.abs(target - s.p) > 0.0005;
    s.raf = keep ? requestAnimationFrame(tick) : 0;
    if (!keep) s.last = 0;
  };

  const wake = () => {
    const s = sim.current;
    if (!s.raf) s.raf = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      live.current.reduce = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const img = printRef.current?.querySelector('img');
    if (!img) return;
    
    let gone = false;
    const start = () => {
      if (gone) return;
      wake();
    };
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, { once: true });
    return () => {
      gone = true;
      img.removeEventListener('load', start);
    };
  }, [children, status]);

  useEffect(() => {
    wake();
  }, [status, width, aspectRatio]);

  useEffect(() => {
    const s = sim.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  return (
    <div
      className={`refine-frame${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={text[status] ?? status}
      aria-busy={active || undefined}
      data-status={status}
      data-active={active ? '' : undefined}
      data-sweep={sweep && active ? '' : undefined}
      data-resolved={resolved ? '' : undefined}
      style={{
        '--rf-w': `${width}px`,
        '--rf-aspect': aspectRatio,
        '--rf-radius': `${radius}px`,
        '--rf-bg': background,
        '--rf-ink': color,
        '--rf-stage': `${stageDuration}ms`,
        '--rf-blur': `${resolved ? 0 : stage.blur}px`,
        '--rf-sat': stage.sat,
        '--rf-scale': resolved ? 1 : stage.scale,
        '--rf-opacity': stage.opacity
      }}
    >
      <div className="refine-frame__media" aria-hidden="true">
        {/* The clear image is inside print, hidden by default via CSS until data-resolved */}
        <div ref={printRef} className="refine-frame__print">
          {children}
        </div>
        {/* The mosaic canvas starts fully visible, rendering the downscaled passes */}
        <canvas ref={canvasRef} className="refine-frame__mosaic" />
      </div>
      <div className="refine-frame__sweep" aria-hidden="true" />
      
      {showStatus ? (
        <div className="refine-frame__chip" aria-hidden="true">
          <span className="refine-frame__mark" data-kind={active ? 'spin' : status}>
            {status === 'complete' ? (
              <Check size={13} strokeWidth={2.5} />
            ) : status === 'error' ? (
              <AlertCircle size={13} strokeWidth={2.2} />
            ) : (
              <Loader2 size={13} strokeWidth={2.2} />
            )}
          </span>
          <span key={status} className="refine-frame__label">
            {text[status] ?? status}
          </span>
        </div>
      ) : null}

      {status === 'error' && onRetry ? (
        <button type="button" className="refine-frame__retry" onClick={onRetry}>
          <RotateCcw size={14} strokeWidth={2.2} />
          <span>{retryLabel}</span>
        </button>
      ) : null}

      <span className="refine-frame__sr" role="status">
        {text[status] ?? status}
      </span>
    </div>
  );
}
