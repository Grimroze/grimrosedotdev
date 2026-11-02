import React, { useRef, useState, useEffect } from 'react';
import CardSwap, { Card } from './CardSwap';
import {
  Github,
  Package,
  ExternalLink,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const PROJECTS = [
  {
    id: 'aegis-gateway',
    slug: 'aegis-gateway.sys',
    badge: 'SYSTEMS // REVERSE PROXY',
    title: 'AegisGateway',
    subtitle: 'Resilient Distributed LLM Gateway & Dynamic Rate Limiter',
    desc: 'High-throughput reverse proxy decoupling high-concurrency LLM routing. Fuses a 2-stage semantic cache (BGE-small + polarity guard) with automated circuit-breaker failover.',
    metrics: [
      { label: 'p95 Latency', val: '2140ms → 14ms (-99.3% drop)', highlight: true },
      { label: 'Rate Limiter', val: '~1ms sliding-window (Redis ZSET)' },
      { label: 'Resilience', val: 'Distributed Redis Circuit Breaker' }
    ],
    tech: ['FastAPI', 'Redis ZSET', 'Docker', 'LangChain', 'BGE-small'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Grimroze/nomnom',
        type: 'github'
      }
    ]
  },
  {
    id: 'specu-rag',
    slug: 'specu-rag.ai',
    badge: 'RESEARCH // ICLR 2025 ARCHITECTURE',
    title: 'SpecuRAG',
    subtitle: 'Speculative RAG Engine (ICLR 2025)',
    desc: 'ICLR 2025-inspired speculative decoding framework adapted for contextual RAG. Decouples drafting (Llama-3.2-3B) from verification (Llama-3.1-8B), fusing BM25 and dense retrieval.',
    metrics: [
      { label: 'Decoupled', val: 'Draft (3B) vs Verify (8B)' },
      { label: 'Hybrid Fusion', val: 'BM25 + Dense RRF (k=60)' },
      { label: 'Compression', val: '~85% prompt compression ratio', highlight: true }
    ],
    tech: ['Python', 'Ollama', 'ChromaDB', 'BM25', 'AsyncIO'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Grimroze/slippery-lime',
        type: 'github'
      }
    ]
  },
  {
    id: 'auto-data',
    slug: 'autodata.py',
    badge: 'DATA SYSTEMS // META FAIR MULTI-AGENT',
    title: 'AutoData',
    subtitle: 'Adversarial QA Dataset Generator',
    desc: 'Meta FAIR Autodata-inspired multi-agent pipeline generating complex multi-hop reasoning datasets. Employs a Weak-Strong evaluation loop (Llama 3.1 8B vs Gemma 2 27B) paired with CRAG.',
    metrics: [
      { label: 'Eval Loop', val: 'Weak-Strong (Llama 8B vs Gemma 27B)' },
      { label: 'Verification', val: 'Corrective RAG (CRAG) filtering' },
      { label: 'Observability', val: 'Distributed tracing in LangSmith', highlight: true }
    ],
    tech: ['LangGraph', 'DeepEval', 'Ollama', 'LangSmith', 'CRAG'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Grimroze/AutoData',
        type: 'github'
      }
    ]
  },
  {
    id: 'decmas',
    slug: 'decmas.pkg',
    badge: 'OPEN-SOURCE // PYPI PACKAGE',
    title: 'decmas',
    subtitle: 'Decentralized P2P Multi-Agent Framework',
    desc: 'Stanford DeLM-inspired decentralized peer-to-peer agent topology resolving central router bottlenecks with async task queues and LLM-as-a-verifier consensus. Active on PyPI.',
    metrics: [
      { label: 'Release', val: 'pip install decmas (Active on PyPI)', highlight: true },
      { label: 'Topology', val: 'Stanford DeLM P2P Mesh (No Bottlenecks)' },
      { label: 'Efficiency', val: '-50% redundant LLM API calls' }
    ],
    tech: ['Python', 'PyPI', 'LangChain', 'Pydantic', 'AsyncIO'],
    links: [
      {
        label: 'PyPI',
        href: 'https://pypi.org/project/decmas/',
        type: 'pypi'
      },
      {
        label: 'Source',
        href: 'https://github.com/Grimroze/decmas',
        type: 'github'
      }
    ]
  }
];

export default function ProjectDeck({ isInView = false }) {
  const deckRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasTriggeredInitialSwap = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggeredInitialSwap.current) {
      hasTriggeredInitialSwap.current = true;
      const timer = setTimeout(() => {
        deckRef.current?.next();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div className={`work-deck-layout ${isInView ? 'deck-revealed' : ''}`}>
      {/* Left Side: Minimalist Meta & GitHub Profile Link */}
      <div className="work-side-col">
        <div className="work-side-block">
          <span className="work-side-title">drag to explore</span>
          <span className="work-side-counter">0{activeIndex + 1} / 04</span>
        </div>

        <div className="work-side-github-block">
          <a
            href="https://github.com/Grimroze"
            target="_blank"
            rel="noopener noreferrer"
            className="work-side-github-link"
            title="View all repositories on GitHub"
          >
            <span>See more on GitHub</span>
            <ArrowUpRight size={14} />
          </a>
          <span className="work-side-github-sub">@Grimroze // 20+ public repositories</span>
        </div>
      </div>

      {/* Right / Center: 3D Stacked Swappable Deck */}
      <div className="work-cards-col">
        <div className="proj-deck-viewport">
          <CardSwap
            ref={deckRef}
            width={680}
            height={430}
            cardDistance={68}
            verticalDistance={44}
            depth={120}
            skewAmount={0}
            visibleCards={4}
            delay={4000}
            autoplay={true}
            pauseOnHover={true}
            draggable={true}
            speed={1}
            bounce={0.28}
            parallax={0.35}
            hoverSpread={0.12}
            dim={0.48}
            cardRadius={22}
            onChange={(newIndex) => setActiveIndex(newIndex)}
          >
            {PROJECTS.map((proj) => (
              <Card key={proj.id} className="proj-swap-card">
                <div className="proj-card-content">
                  {/* macOS Window Titlebar with 3 dots and minimal link logos */}
                  <div className="proj-mac-topbar">
                    <div className="proj-mac-left">
                      <div className="proj-mac-dots" aria-hidden="true">
                        <span className="mac-dot mac-dot-red" />
                        <span className="mac-dot mac-dot-yellow" />
                        <span className="mac-dot mac-dot-green" />
                      </div>
                      <div className="proj-mac-path-label">
                        <span className="proj-mac-prefix">~/systems/</span>
                        <span className="proj-mac-slug">{proj.slug}</span>
                      </div>
                    </div>

                    <div className="proj-mac-actions">
                      {proj.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-action-btn"
                          title={`Open ${proj.title} on ${link.label}`}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.type === 'github' ? (
                            <Github size={13} strokeWidth={2} />
                          ) : link.type === 'pypi' ? (
                            <Package size={13} strokeWidth={2} />
                          ) : (
                            <ExternalLink size={13} strokeWidth={2} />
                          )}
                          <span>{link.label}</span>
                          <ArrowUpRight size={11} className="proj-action-arrow" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Card Interior */}
                  <div className="proj-card-main">
                    {/* Heading & Category Badge */}
                    <div className="proj-card-heading-row">
                      <h4 className="proj-card-title">{proj.title}</h4>
                      <span className="proj-card-badge">{proj.badge}</span>
                    </div>

                    {/* Subtitle & Narrative */}
                    <div className="proj-card-subtitle">{proj.subtitle}</div>
                    <p className="proj-card-desc">{proj.desc}</p>

                    {/* Telemetry Console Box */}
                    <div className="proj-card-metrics">
                      <div className="proj-metrics-header">
                        <span className="proj-metrics-tag">VERIFIED TELEMETRY</span>
                        <span className="proj-metrics-status">STATUS: ONLINE</span>
                      </div>
                      <div className="proj-metrics-body">
                        {proj.metrics.map((m, idx) => (
                          <div key={idx} className="proj-metric-item">
                            <span className="proj-metric-dot" />
                            <span className="proj-metric-label">{m.label}:</span>
                            <span className={`proj-metric-value ${m.highlight ? 'is-highlight' : ''}`}>
                              {m.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer: Tech Stack Chips */}
                  <div className="proj-card-footer">
                    <div className="proj-tech-stack">
                      {proj.tech.map((t) => (
                        <span key={t} className="proj-tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  );
}
