'use client';

import React, { Children, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const SCRUB_SPAN = 0.5;
const GAUSSIAN_EDGE = Math.exp(-2.2);

const clamp01 = value => Math.min(Math.max(value, 0), 1);
const smooth = value => value * value * (3 - 2 * value);
const glowAt = t => (t <= 0 || t >= 1 ? 0 : t < 0.35 ? smooth(t / 0.35) : 1 - smooth((t - 0.35) / 0.65));

const strengthAt = (distance, radius) => {
  if (distance >= radius) return 0;
  return (Math.exp(-2.2 * (distance / radius) ** 2) - GAUSSIAN_EDGE) / (1 - GAUSSIAN_EDGE);
};

// 7 Distinct Font Personalities for "AI"
const FONT_ROULETTE = [
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", style: 'normal', weight: 700, scale: 1 },
  { name: 'Instrument Serif', family: "'Instrument Serif', Georgia, serif", style: 'italic', weight: 400, scale: 1.15 },
  { name: 'Space Mono', family: "'Space Mono', monospace", style: 'normal', weight: 700, scale: 0.94 },
  { name: 'Syne', family: "'Syne', sans-serif", style: 'normal', weight: 800, scale: 1 },
  { name: 'Cinzel', family: "'Cinzel', serif", style: 'normal', weight: 700, scale: 0.98 },
  { name: 'Silkscreen', family: "'Silkscreen', monospace", style: 'normal', weight: 700, scale: 0.88 },
  { name: 'Playfair Display', family: "'Playfair Display', serif", style: 'italic', weight: 700, scale: 1.05 }
];

// Completely Isolated Sub-Component for AI Font Spinner (Zero parent re-renders)
const AiFontSpinner = ({
  word = 'AI',
  charStartIndex = 0,
  letterRefs,
  triggerRef
}) => {
  const [fontIndex, setFontIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [justSettled, setJustSettled] = useState(false);
  const timerRef = useRef(null);

  const spin = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsSpinning(true);
    setJustSettled(false);

    let currentStep = 0;
    const totalSteps = 13 + Math.floor(Math.random() * 5); // 13-17 steps
    let delay = 45;

    const step = () => {
      currentStep++;
      setFontIndex(prev => (prev + 1) % FONT_ROULETTE.length);

      if (currentStep < totalSteps) {
        const progress = currentStep / totalSteps;
        // Smooth exponential deceleration curve
        delay = 45 + Math.pow(progress, 2.4) * 260;
        timerRef.current = setTimeout(step, delay);
      } else {
        setIsSpinning(false);
        setJustSettled(true);
        setTimeout(() => setJustSettled(false), 500);
      }
    };

    timerRef.current = setTimeout(step, delay);
  }, []);

  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = spin;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggerRef, spin]);

  const currentFont = FONT_ROULETTE[fontIndex];

  return (
    <span
      className={`scroll-reveal-word highlight-underline font-spinner-word ${isSpinning ? 'is-spinning' : ''} ${justSettled ? 'is-settled' : ''}`.trim()}
      onMouseEnter={spin}
      onClick={spin}
      style={{
        fontFamily: currentFont.family,
        fontStyle: currentFont.style,
        fontWeight: currentFont.weight,
        transform: `scale(${currentFont.scale || 1})`,
        transformOrigin: 'center bottom',
        display: 'inline-block',
        cursor: 'pointer'
      }}
      title={`Font: ${currentFont.name} (Click or hover to re-spin!)`}
    >
      {word.split('').map((char, charIdx) => {
        const letterIdx = charStartIndex + charIdx;
        return (
          <span
            key={charIdx}
            ref={el => {
              if (letterRefs.current) letterRefs.current[letterIdx] = el;
            }}
            className="proximity-letter"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

const ScrollReveal = ({
  children,
  highlights = [],
  enableBlur = true,
  baseOpacity = 0.12,
  blurStrength = 6,
  stagger = 0.05,
  highlightColor = '#faedf1',
  containerClassName = '',
  textClassName = '',
  // Proximity Bloat Props
  enableProximity = true,
  proximityRadius = 88,
  proximityScale = 1.25,
  proximityLift = 4,
  proximitySmoothing = 0.2
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const letterRefs = useRef([]);
  const aiSpinRef = useRef(null);
  const hasAutoSpun = useRef(false);

  const proximityState = useRef({
    pointer: { x: -9999, y: -9999, active: false },
    levels: [],
    targets: []
  });

  const rawText = useMemo(() => {
    const parts = Children.toArray(children);
    return parts.every(part => typeof part === 'string' || typeof part === 'number') ? parts.join('') : '';
  }, [children]);

  // Tokenize text into words while mapping highlighted phrases
  const tokens = useMemo(() => {
    const list = [];
    const regex = /\S+/g;
    const lowerRaw = rawText.toLowerCase();
    let match;

    const normalizedHighlights = Array.isArray(highlights)
      ? highlights.map(item => (typeof item === 'string' ? { phrase: item, style: 'underline' } : item))
      : [];

    while ((match = regex.exec(rawText)) !== null) {
      const wordText = match[0];
      const startIndex = match.index;

      let matchedStyle = null;

      for (const h of normalizedHighlights) {
        if (!h.phrase) continue;
        const lowerPhrase = h.phrase.toLowerCase();
        let pIdx = lowerRaw.indexOf(lowerPhrase);
        while (pIdx !== -1) {
          const pEnd = pIdx + lowerPhrase.length;
          if (startIndex >= pIdx && startIndex < pEnd) {
            matchedStyle = h.style || 'underline';
            break;
          }
          pIdx = lowerRaw.indexOf(lowerPhrase, pIdx + 1);
        }
        if (matchedStyle) break;
      }

      list.push({
        text: wordText,
        highlight: matchedStyle
      });
    }
    return list;
  }, [rawText, highlights]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 1. GSAP ScrollTrigger: Word-by-Word Scroll Reveal
  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    const wordElements = Array.from(el.querySelectorAll('.scroll-reveal-word'));
    if (!wordElements.length) return;

    const span = SCRUB_SPAN;
    const gap = Math.max(0, stagger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const state = { p: 0 };
      const count = wordElements.length;
      const total = span + Math.max(0, count - 1) * gap;

      const render = () => {
        const at = state.p * total;
        wordElements.forEach((wordEl, index) => {
          const t = clamp01((at - index * gap) / span);
          const fadeIn = t;
          const settle = clamp01(t);

          wordEl.style.opacity = t >= 1 ? '1' : (baseOpacity + (1 - baseOpacity) * fadeIn).toFixed(3);
          wordEl.style.filter = enableBlur && settle < 1 ? `blur(${(blurStrength * (1 - settle)).toFixed(2)}px)` : '';
          
          if (highlightColor) {
            const glow = glowAt(t);
            wordEl.style.color =
              glow > 0.002 ? `color-mix(in srgb, ${highlightColor} ${(glow * 100).toFixed(1)}%, currentColor)` : '';
          }
        });
      };

      wordElements.forEach(wordEl => {
        wordEl.style.willChange = 'opacity, filter';
        wordEl.style.opacity = baseOpacity.toString();
        if (enableBlur) wordEl.style.filter = `blur(${blurStrength}px)`;
      });

      render();

      gsap.to(state, {
        p: 1,
        ease: 'none',
        onUpdate: render,
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true,
          onEnter: () => {
            if (!hasAutoSpun.current) {
              hasAutoSpun.current = true;
              aiSpinRef.current?.();
            }
          },
          onLeaveBack: () => {
            hasAutoSpun.current = false;
          }
        }
      });

      return () => {
        wordElements.forEach(wordEl => {
          wordEl.style.opacity = '';
          wordEl.style.filter = '';
          wordEl.style.color = '';
          wordEl.style.willChange = '';
        });
      };
    });

    return () => mm.revert();
  }, [mounted, rawText, enableBlur, baseOpacity, blurStrength, stagger, highlightColor]);

  // 2. Variable Proximity: Hover Bloat & Lift Engine
  useEffect(() => {
    if (!enableProximity) return;

    const letters = letterRefs.current.filter(Boolean);
    if (!letters.length) return;

    const { pointer, levels, targets } = proximityState.current;
    targets.length = letters.length;
    targets.fill(0);
    levels.length = letters.length;
    levels.fill(0);

    const growth = proximityScale - 1;
    const rise = proximityLift;
    let frame = 0;
    let lastTime = 0;
    let dirty = true;
    let nearAny = false;

    const measure = () => {
      targets.fill(0);
      nearAny = false;
      if (!pointer.active) return;

      const containerBox = containerRef.current?.getBoundingClientRect();
      if (containerBox) {
        // Quick boundary cull
        const outsideX = Math.max(containerBox.left - pointer.x, 0, pointer.x - containerBox.right);
        const outsideY = Math.max(containerBox.top - pointer.y, 0, pointer.y - containerBox.bottom);
        if (outsideX * outsideX + outsideY * outsideY >= proximityRadius * proximityRadius * 2) {
          return;
        }
      }

      letters.forEach((letter, index) => {
        const rect = letter.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(pointer.x - letterCenterX, pointer.y - letterCenterY);

        const strength = strengthAt(distance, proximityRadius);
        targets[index] = strength;
        if (strength > 0) nearAny = true;
      });
    };

    const tick = now => {
      frame = 0;
      const delta = lastTime ? Math.min(now - lastTime, 64) : 16;
      lastTime = now;

      if (dirty) {
        measure();
        dirty = false;
      }

      const ease = proximitySmoothing > 0 ? 1 - Math.exp(-delta / (proximitySmoothing * 360)) : 1;
      let settling = false;

      letters.forEach((letter, index) => {
        const target = targets[index] ?? 0;
        const current = levels[index] ?? 0;
        let next = current + (target - current) * ease;

        if (Math.abs(target - next) < 0.002) {
          next = target;
        } else {
          settling = true;
        }
        levels[index] = next;

        if (next > 0.001) {
          const shift = `translateY(${(-rise * next).toFixed(2)}px) scale(${(1 + growth * next).toFixed(3)})`;
          letter.style.transform = shift;
        } else if (letter.style.transform) {
          letter.style.transform = '';
        }
      });

      if (settling || nearAny) {
        frame = requestAnimationFrame(tick);
      } else {
        lastTime = 0;
      }
    };

    const schedule = () => {
      dirty = true;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handlePointerMove = e => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      schedule();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      schedule();
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', schedule);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      letters.forEach(letter => {
        letter.style.transform = '';
      });
    };
  }, [enableProximity, proximityRadius, proximityScale, proximityLift, proximitySmoothing, rawText]);

  let globalCharIndex = 0;

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`} aria-label={rawText}>
      <span ref={textRef} className={`scroll-reveal-text ${textClassName}`}>
        {tokens.map((token, tokenIndex) => {
          const isAiSpinner = token.highlight === 'spinner' || token.text.toLowerCase() === 'ai';
          const charStart = globalCharIndex;
          globalCharIndex += token.text.length;

          if (isAiSpinner) {
            return (
              <span key={tokenIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                <AiFontSpinner
                  word={token.text}
                  charStartIndex={charStart}
                  letterRefs={letterRefs}
                  triggerRef={aiSpinRef}
                />
                {tokenIndex < tokens.length - 1 && <span className="proximity-space">&nbsp;</span>}
              </span>
            );
          }

          let highlightClass = '';
          if (token.highlight === 'underline') highlightClass = 'highlight-underline';
          else if (token.highlight === 'gradient') highlightClass = 'highlight-gradient';
          else if (token.highlight === 'accent') highlightClass = 'highlight-accent';

          return (
            <span key={tokenIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              <span className={`scroll-reveal-word ${highlightClass}`.trim()}>
                {token.text.split('').map((char, charIndex) => {
                  const letterIdx = charStart + charIndex;
                  return (
                    <span
                      key={charIndex}
                      ref={el => {
                        if (letterRefs.current) letterRefs.current[letterIdx] = el;
                      }}
                      className="proximity-letter"
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
              {tokenIndex < tokens.length - 1 && <span className="proximity-space">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </h2>
  );
};

export default ScrollReveal;
