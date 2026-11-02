import React, { isValidElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react';
import {
  ChevronDown,
  X,
  FileText,
  Mail,
  Plus,
  Sparkles,
  Check,
  Cpu,
  Terminal
} from 'lucide-react';
import './PromptBar.css';

const ARROW_UP = [12, 4.5, 18.5, 11, 14.25, 11, 14.25, 19.5, 9.75, 19.5, 9.75, 11, 5.5, 11];
const SQUARE = [12, 6, 18, 6, 18, 12, 18, 18, 6, 18, 6, 12, 6, 6];
const EASE_IN_OUT = [0.77, 0, 0.175, 1];
const LINE = 22;

export const DEFAULT_SECTION_SOURCES = [
  {
    key: 'all',
    name: 'All Sections',
    description: 'General portfolio query',
    icon: Sparkles,
    section: 'all'
  },
  {
    key: 'overview',
    name: 'About & Background',
    description: 'DTU CS, Outlier AI, RLHF',
    icon: FileText,
    section: 'overview'
  },
  {
    key: 'arsenal',
    name: 'Technical Skills',
    description: 'Languages, DSA, C++, LeetCode',
    icon: Cpu,
    section: 'arsenal'
  },
  {
    key: 'systems',
    name: 'Projects & Systems',
    description: 'SpecuRAG, decmas on PyPI',
    icon: Terminal,
    section: 'systems'
  },
  {
    key: 'connect',
    name: 'Connect & Links',
    description: 'Email, GitHub, LinkedIn',
    icon: Mail,
    section: 'connect'
  }
];

const DEFAULT_MODELS = [
  { key: 'deepseek-v3', name: 'DeepSeek V3', tag: 'Fast' },
  { key: 'kimi-k1.5', name: 'Kimi k1.5', tag: 'Long Context' },
  { key: 'claude-fable', name: 'Claude Fable 5.1', tag: '' }
];

const mix = (a, b, t) => a + (b - a) * t;
const pathAt = (a, b, t) => {
  let d = '';
  for (let i = 0; i < a.length; i += 2) {
    d += `${i ? 'L' : 'M'}${mix(a[i], b[i], t).toFixed(2)} ${mix(a[i + 1], b[i + 1], t).toFixed(2)}`;
  }
  return `${d}Z`;
};

const parseToken = draft => {
  const m = /(^|\s)([@/])([\w-]*)$/.exec(draft);
  if (!m) return null;
  return { kind: m[2] === '@' ? 'at' : 'slash', query: m[3].toLowerCase(), start: m.index + m[1].length };
};

const renderIcon = (IconComponent, size = 15) => {
  if (isValidElement(IconComponent)) return IconComponent;
  if (typeof IconComponent === 'function') {
    return <IconComponent size={size} strokeWidth={1.8} />;
  }
  return null;
};

function SendGlyph({ busy, morphDuration, squash, tilt }) {
  const reduce = useReducedMotion();
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dir = useRef(busy ? 1 : -1);
  const t = useMotionValue(busy ? 1 : 0);

  useEffect(() => {
    const target = busy ? 1 : 0;
    dir.current = busy ? 1 : -1;
    if (t.get() === target) return undefined;
    const controls = animate(
      t,
      target,
      reduce ? { duration: 0 } : { duration: morphDuration / 1000, ease: EASE_IN_OUT }
    );
    return () => controls.stop();
  }, [busy, morphDuration, reduce, t]);

  useMotionValueEvent(t, 'change', v => {
    pathRef.current?.setAttribute('d', pathAt(ARROW_UP, SQUARE, v));
    const goo = reduce ? 0 : Math.sin(v * Math.PI);
    const sx = 1 - squash * goo;
    if (svgRef.current) {
      svgRef.current.style.transform = goo ? `rotate(${dir.current * tilt * goo}deg) scale(${sx}, ${1 / sx})` : '';
    }
  });

  return (
    <svg
      ref={svgRef}
      className="prompt-bar__glyph"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path ref={pathRef} d={pathAt(ARROW_UP, SQUARE, t.get())} />
    </svg>
  );
}

export default function PromptBar({
  placeholder = 'Ask a question...',
  sources = DEFAULT_SECTION_SOURCES,
  models = DEFAULT_MODELS,
  defaultModel = 'deepseek-v3',
  busy = false,
  onSend,
  onStop,
  onClaudeSelect,
  selectedSection = 'all',
  onSectionSelect,
  width = 400,
  maxRows = 4,
  morphDuration = 220,
  squash = 0.12,
  tilt = 8,
  pressScale = 0.96,
  className = ''
}) {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const rowRefs = useRef([]);
  const latest = useRef({});
  latest.current = { onSend, onStop, onClaudeSelect, onSectionSelect };

  const [draft, setDraft] = useState('');
  const [modelKey, setModelKey] = useState(defaultModel);
  const [plusOpen, setPlusOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pressed, setPressed] = useState(false);

  const model = models.find(m => m.key === modelKey) ?? models[0];
  const token = parseToken(draft);
  const open = plusOpen ? 'at' : (modelOpen ? 'model' : null);
  const list = useMemo(() => {
    if (open === 'at') return sources;
    if (open === 'model') return models;
    return [];
  }, [open, sources, models]);

  const cursor = Math.min(active, Math.max(0, list.length - 1));
  const canSend = draft.trim().length > 0;
  const armed = busy || canSend;

  const closeMenus = useCallback(() => {
    setPlusOpen(false);
    setModelOpen(false);
  }, []);

  useEffect(() => {
    if (!plusOpen && !modelOpen) return undefined;
    const onDown = e => {
      if (!rootRef.current?.contains(e.target)) closeMenus();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [plusOpen, modelOpen, closeMenus]);

  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = '0px';
    const max = LINE * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  }, [draft, maxRows]);

  const pick = row => {
    if (open === 'model') {
      if (row.key === 'claude-fable' || row.key === 'claude-3.5') {
        setModelOpen(false);
        latest.current.onClaudeSelect?.();
        return;
      }
      setModelKey(row.key);
      setModelOpen(false);
      return;
    }
    if (row.section) {
      latest.current.onSectionSelect?.(row.section);
      setPlusOpen(false);
      return;
    }
    setPlusOpen(false);
  };

  const send = () => {
    if (!canSend || busy) return;
    latest.current.onSend?.(draft.trim(), {
      model,
      section: selectedSection
    });
    setDraft('');
    closeMenus();
  };

  const onKeyDown = e => {
    if (open && list.length) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((cursor + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length);
        return;
      }
      if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Tab') {
        e.preventDefault();
        pick(list[cursor]);
        return;
      }
    }
    if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        closeMenus();
      }
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  const down = e => {
    if (e.button !== 0 || !armed) return;
    setPressed(true);
  };
  const up = () => setPressed(false);

  const activeSectionObj = sources.find(s => s.section === selectedSection) || sources[0];

  return (
    <div
      ref={rootRef}
      className={`prompt-bar${className ? ` ${className}` : ''}`}
      data-busy={busy ? '' : undefined}
      style={{
        '--pb-press': pressScale
      }}
    >
      {/* Dropdown Menu for Section Filter or Model Selection */}
      {open ? (
        <div
          className="prompt-bar__menu"
          role="listbox"
          data-kind={open}
        >
          {list.map((row, i) => (
            <button
              key={row.key}
              ref={el => {
                rowRefs.current[i] = el;
              }}
              type="button"
              role="option"
              aria-selected={i === cursor}
              className={`prompt-bar__row ${i === cursor ? 'is-highlighted' : ''}`}
              onMouseDown={e => e.preventDefault()}
              onPointerEnter={() => setActive(i)}
              onClick={() => pick(row)}
            >
              {open === 'at' ? <span className="prompt-bar__row-icon">{renderIcon(row.icon, 14)}</span> : null}
              <span className="prompt-bar__row-name">{row.name}</span>
              {row.description ? <span className="prompt-bar__row-desc">{row.description}</span> : null}
              {open === 'model' ? (
                <>
                  {row.tag ? <span className="prompt-bar__row-tag">{row.tag}</span> : null}
                  <span className="prompt-bar__row-check" data-on={row.key === model?.key ? '' : undefined}>
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                </>
              ) : null}
              {open === 'at' && row.section ? (
                <span className="prompt-bar__row-check" data-on={row.section === selectedSection ? '' : undefined}>
                  <Check size={12} strokeWidth={2.5} />
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}

      <div
        className="prompt-bar__field"
        role="presentation"
        onPointerDown={e => {
          if (e.target === e.currentTarget) closeMenus();
        }}
      >
        {/* Selected Section Scope Badge */}
        {selectedSection !== 'all' && (
          <div className="prompt-bar__chips">
            <span className="prompt-bar__chip">
              <span className="prompt-bar__chip-name">{activeSectionObj.name}</span>
              <button
                type="button"
                className="prompt-bar__chip-x"
                aria-label="Clear section filter"
                onClick={(e) => {
                  e.stopPropagation();
                  onSectionSelect?.('all');
                }}
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            </span>
          </div>
        )}

        <textarea
          ref={inputRef}
          className="prompt-bar__input"
          rows={1}
          value={draft}
          placeholder={placeholder}
          aria-label="Prompt"
          onChange={e => {
            setDraft(e.target.value);
            closeMenus();
          }}
          onKeyDown={onKeyDown}
        />

        <div className="prompt-bar__bar">
          <button
            type="button"
            className="prompt-bar__tool"
            aria-label="Filter section"
            aria-expanded={plusOpen}
            data-on={plusOpen || selectedSection !== 'all' ? '' : undefined}
            title="Focus scope on specific section"
            onMouseDown={e => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              setModelOpen(false);
              setActive(0);
              setPlusOpen(v => !v);
            }}
          >
            <Plus size={15} strokeWidth={2} />
          </button>

          {models.length > 0 ? (
            <button
              type="button"
              className="prompt-bar__pick"
              aria-label="Choose model"
              aria-expanded={modelOpen}
              data-on={modelOpen ? '' : undefined}
              onMouseDown={e => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                setPlusOpen(false);
                setActive(Math.max(0, models.indexOf(model)));
                setModelOpen(v => !v);
              }}
            >
              <span>{model.name}</span>
              <ChevronDown size={11} strokeWidth={2.4} />
            </button>
          ) : null}

          <span className="prompt-bar__spacer" />

          <button
            type="button"
            className="prompt-bar__send"
            disabled={!armed}
            aria-label={busy ? 'Stop' : 'Send'}
            data-armed={armed ? '' : undefined}
            data-pressed={pressed ? '' : undefined}
            onMouseDown={e => e.preventDefault()}
            onPointerDown={down}
            onPointerUp={up}
            onPointerCancel={up}
            onPointerLeave={up}
            onClick={() => {
              if (busy) latest.current.onStop?.();
              else send();
            }}
          >
            <SendGlyph busy={busy} morphDuration={morphDuration} squash={squash} tilt={tilt} />
          </button>
        </div>
      </div>
    </div>
  );
}
