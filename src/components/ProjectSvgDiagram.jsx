import React, { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

/**
 * ProjectSvgDiagram.jsx - Minimal, High-Precision Vector Architecture Diagrams
 * Handcrafted vector flowcharts for Goldi Soni's flagship systems:
 * 1. SpecuRAG (ICLR 2025 Speculative RAG: Dual-Channel -> RRF -> Silhouette K-Means -> 3B Drafters -> 8B Verifier)
 * 2. AegisGateway (Resilient Distributed LLM Gateway: FastAPI -> Redis ZSET Limiter -> Semantic Cache -> Polarity Guard -> Circuit Breaker)
 * 3. AutoData (Autonomous Synthetic QA Engine - Meta FAIR: ChromaDB -> CRAG -> Challenger -> Weak 8B vs Strong 31B Gap >= 20% -> Rubric Judge)
 * 4. decmas (Distributed Multi-Agent Consensus - Stanford DeLM: Orchestrator -> DAG Planner -> Mutex TaskQueue -> Worker OS Threads -> Verifier Gate)
 */

export function SpecuRagSvg() {
  return (
    <svg
      viewBox="0 0 540 330"
      className="project-arch-svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="specuGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="drafterGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="verifierGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.06" />
        </linearGradient>
        <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
        </marker>
        <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#c084fc" />
        </marker>
        <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
        </marker>
      </defs>

      {/* Grid texture for blueprint feel */}
      <pattern id="specuGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#specuGrid)" />

      {/* 1. Inbound Query */}
      <rect x="20" y="22" width="130" height="44" rx="7" fill="url(#specuGlow)" stroke="#38bdf8" strokeWidth="1.1" strokeOpacity="0.7" />
      <text x="85" y="41" fill="#e0f2fe" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">User Query Q</text>
      <text x="85" y="56" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">High-Entropy Context</text>

      {/* Arrows from Query to Dual Channel */}
      <path d="M 150 44 L 180 44 L 180 32 L 205 32" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrowCyan)" fill="none" />
      <path d="M 150 44 L 180 44 L 180 58 L 205 58" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrowCyan)" fill="none" />

      {/* 2. Dual-Channel Retrieval */}
      {/* Channel A: BM25 */}
      <rect x="210" y="16" width="150" height="30" rx="5" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1" />
      <text x="285" y="31" fill="#bae6fd" fontSize="11" fontWeight="500" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">BM25 Sparse (Lexical)</text>
      <text x="285" y="41" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="'Space Mono', monospace">Exact keyword recall</text>

      {/* Channel B: nomic-embed */}
      <rect x="210" y="50" width="150" height="30" rx="5" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1" />
      <text x="285" y="65" fill="#bae6fd" fontSize="11" fontWeight="500" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">ChromaDB nomic-embed</text>
      <text x="285" y="75" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="'Space Mono', monospace">Dense 768-d semantic</text>

      {/* Flow into RRF Fusion */}
      <path d="M 360 31 L 382 31 L 382 42 L 395 42" stroke="#38bdf8" strokeWidth="1.3" markerEnd="url(#arrowCyan)" fill="none" />
      <path d="M 360 65 L 382 65 L 382 48 L 395 48" stroke="#38bdf8" strokeWidth="1.3" markerEnd="url(#arrowCyan)" fill="none" />

      {/* 3. Reciprocal Rank Fusion (RRF) */}
      <rect x="400" y="22" width="125" height="44" rx="7" fill="rgba(56, 189, 248, 0.14)" stroke="#38bdf8" strokeWidth="1.1" strokeOpacity="0.8" />
      <text x="462" y="41" fill="#ffffff" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">RRF Fusion (k=60)</text>
      <text x="462" y="56" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Rank-sum consolidation</text>

      {/* Arrow down to Clustering & Snake Allocation */}
      <path d="M 462 66 L 462 105 L 435 105" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrowCyan)" fill="none" />

      {/* 4. Silhouette K-Means & Snake Allocation */}
      <rect x="175" y="86" width="255" height="38" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="rgba(168, 85, 247, 0.55)" strokeWidth="1" />
      <text x="302" y="103" fill="#e9d5ff" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Dynamic Silhouette K-Means (k=3..8)</text>
      <text x="302" y="117" fill="#c084fc" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Inverted Snake Allocation (Entropy Balancing)</text>

      {/* Branching to Parallel Drafters */}
      <path d="M 302 124 L 302 148" stroke="#c084fc" strokeWidth="1.3" fill="none" />
      <path d="M 120 148 L 490 148" stroke="#c084fc" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 120 148 L 120 166" stroke="#c084fc" strokeWidth="1.3" markerEnd="url(#arrowPurple)" fill="none" />
      <path d="M 302 148 L 302 166" stroke="#c084fc" strokeWidth="1.3" markerEnd="url(#arrowPurple)" fill="none" />
      <path d="M 490 148 L 490 166" stroke="#c084fc" strokeWidth="1.3" markerEnd="url(#arrowPurple)" fill="none" />

      {/* 5. Parallel Speculative Drafters (3x Llama 3.2 3B) */}
      <rect x="50" y="170" width="140" height="44" rx="6" fill="url(#drafterGlow)" stroke="#a855f7" strokeWidth="1.1" strokeOpacity="0.8" />
      <text x="120" y="188" fill="#f3e8ff" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Drafter A (3B)</text>
      <text x="120" y="203" fill="#d8b4fe" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Speculative Stream 1</text>

      <rect x="232" y="170" width="140" height="44" rx="6" fill="url(#drafterGlow)" stroke="#a855f7" strokeWidth="1.1" strokeOpacity="0.8" />
      <text x="302" y="188" fill="#f3e8ff" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Drafter B (3B)</text>
      <text x="302" y="203" fill="#d8b4fe" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Speculative Stream 2</text>

      <rect x="415" y="170" width="115" height="44" rx="6" fill="url(#drafterGlow)" stroke="#a855f7" strokeWidth="1.1" strokeOpacity="0.8" />
      <text x="472" y="188" fill="#f3e8ff" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Drafter C (3B)</text>
      <text x="472" y="203" fill="#d8b4fe" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Stream 3</text>

      {/* Drafter paths converging into Context-Free Verifier */}
      <path d="M 120 214 L 120 238 L 220 238" stroke="#a855f7" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 302 214 L 302 238 L 270 238" stroke="#a855f7" strokeWidth="1.3" fill="none" />
      <path d="M 472 214 L 472 238 L 320 238" stroke="#a855f7" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 270 238 L 270 252" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen)" fill="none" />

      {/* 6. Context-Free Verifier Judge (Llama-3.1-8B) */}
      <rect x="145" y="254" width="250" height="44" rx="7" fill="url(#verifierGlow)" stroke="#10b981" strokeWidth="1.2" />
      <text x="270" y="272" fill="#ecfdf5" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Context-Free Verifier (Llama-3.1-8B)</text>
      <text x="270" y="287" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Token Conflict Resolution • 0.42 Hallucination</text>

      {/* Metric Badge Pills */}
      <rect x="20" y="268" width="115" height="24" rx="12" fill="rgba(16, 185, 129, 0.14)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="0.9" />
      <text x="77" y="283" fill="#34d399" fontSize="9.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Mono', monospace">⚡ 7.34x SPEEDUP</text>

      <rect x="405" y="268" width="120" height="24" rx="12" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.9" />
      <text x="465" y="283" fill="#38bdf8" fontSize="9.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Mono', monospace">ICLR 2025 VERIFIED</text>
    </svg>
  );
}

export function AegisGatewaySvg() {
  return (
    <svg
      viewBox="0 0 540 330"
      className="project-arch-svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="aegisGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="cacheGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0.04" />
        </linearGradient>
        <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#fbbf24" />
        </marker>
        <marker id="arrowGreen2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
        </marker>
        <marker id="arrowRose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#fb7185" />
        </marker>
      </defs>

      {/* Grid */}
      <pattern id="aegisGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#aegisGrid)" />

      {/* 1. Client Inbound */}
      <rect x="20" y="22" width="125" height="44" rx="7" fill="rgba(245, 158, 11, 0.14)" stroke="#fbbf24" strokeWidth="1.1" strokeOpacity="0.8" />
      <text x="82" y="41" fill="#fef3c7" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Client Inbound</text>
      <text x="82" y="55" fill="#fde68a" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">POST /v1/chat/completions</text>

      {/* Arrow to Gateway */}
      <path d="M 145 44 L 175 44" stroke="#fbbf24" strokeWidth="1.4" markerEnd="url(#arrowAmber)" fill="none" />

      {/* 2. FastAPI Reverse Proxy */}
      <rect x="180" y="22" width="155" height="44" rx="7" fill="url(#aegisGlow)" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="257" y="41" fill="#fffbeb" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">FastAPI Proxy Engine</text>
      <text x="257" y="55" fill="#fcd34d" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Async streaming + Auth</text>

      {/* Arrow to Rate Limiter */}
      <path d="M 335 44 L 375 44" stroke="#fbbf24" strokeWidth="1.4" markerEnd="url(#arrowAmber)" fill="none" />

      {/* 3. Redis Sliding-Window Rate Limiter */}
      <rect x="380" y="22" width="145" height="44" rx="7" fill="rgba(30, 41, 59, 0.9)" stroke="#38bdf8" strokeWidth="1.1" />
      <text x="452" y="41" fill="#e0f2fe" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Redis ZSET Limiter</text>
      <text x="452" y="55" fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">&lt;1ms sliding window Lua</text>

      {/* Path Down to Semantic Cache */}
      <path d="M 452 66 L 452 98 L 395 98" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrowAmber)" fill="none" />

      {/* 4. Two-Stage Semantic Cache */}
      <rect x="105" y="84" width="285" height="54" rx="8" fill="rgba(15, 23, 42, 0.92)" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.85" />
      <text x="247" y="103" fill="#ecfdf5" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Two-Stage Semantic Cache Engine</text>
      <text x="247" y="118" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Stage 1: SHA-256 Exact O(1)  •  Stage 2: BGE-small Cosine ≥ 0.92</text>
      <text x="247" y="130" fill="#a7f3d0" fontSize="8.5" textAnchor="middle" fontFamily="'Space Mono', monospace">Polarity Negation Guard (O(1) lexical conflict filter)</text>

      {/* Cache Branch: HIT vs MISS */}
      <path d="M 175 138 L 175 178" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen2)" fill="none" />
      <text x="140" y="160" fill="#34d399" fontSize="9.5" fontWeight="600" fontFamily="'Space Mono', monospace">CACHE HIT</text>

      <path d="M 320 138 L 320 178" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowRose)" fill="none" />
      <text x="350" y="160" fill="#fb7185" fontSize="9.5" fontWeight="600" fontFamily="'Space Mono', monospace">CACHE MISS</text>

      {/* 5A. Instant Return Node (14ms) */}
      <rect x="95" y="180" width="165" height="44" rx="7" fill="url(#cacheGlow)" stroke="#10b981" strokeWidth="1.1" />
      <text x="177" y="199" fill="#ecfdf5" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Instant Cached Return</text>
      <text x="177" y="214" fill="#34d399" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="'Space Mono', monospace">⚡ 14ms Response • ₹0.00</text>

      {/* 5B. Dynamic Circuit Breaker */}
      <rect x="280" y="180" width="200" height="44" rx="7" fill="url(#circuitGlow)" stroke="#f43f5e" strokeWidth="1.1" />
      <text x="380" y="199" fill="#ffe4e6" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Circuit Breaker (3-State)</text>
      <text x="380" y="214" fill="#fda4af" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Closed • Half-Open • Open Failover</text>

      {/* Arrow from Circuit Breaker to Upstream LLM Pool */}
      <path d="M 380 224 L 380 248" stroke="#fb7185" strokeWidth="1.3" markerEnd="url(#arrowRose)" fill="none" />

      {/* 6. Upstream LLM Pool */}
      <rect x="255" y="250" width="245" height="42" rx="7" fill="rgba(30, 41, 59, 0.85)" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
      <text x="377" y="268" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Upstream LLMs (vLLM / Anthropic)</text>
      <text x="377" y="282" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="'Space Mono', monospace">Exponential Backoff & Jitter Fallback</text>

      {/* Telemetry pill */}
      <rect x="20" y="266" width="130" height="24" rx="12" fill="rgba(245, 158, 11, 0.14)" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.9" />
      <text x="85" y="281" fill="#fbbf24" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="'Space Mono', monospace">68% COST REDUCTION</text>
    </svg>
  );
}

export function AutoDataSvg() {
  return (
    <svg
      viewBox="0 0 540 330"
      className="project-arch-svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="dataGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="judgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
        </linearGradient>
        <marker id="arrowPurp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#c084fc" />
        </marker>
        <marker id="arrowSky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
        </marker>
        <marker id="arrowEmerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
        </marker>
      </defs>

      {/* Grid */}
      <pattern id="dataGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dataGrid)" />

      {/* 1. Raw Corpus Input */}
      <rect x="20" y="22" width="130" height="44" rx="7" fill="rgba(168, 85, 247, 0.14)" stroke="#c084fc" strokeWidth="1.1" strokeOpacity="0.8" />
      <text x="85" y="41" fill="#faf5ff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Raw Corpus Docs</text>
      <text x="85" y="55" fill="#d8b4fe" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Unstructured Text / Code</text>

      {/* Arrow to ChromaDB Topic Extractor */}
      <path d="M 150 44 L 180 44" stroke="#c084fc" strokeWidth="1.3" markerEnd="url(#arrowPurp)" fill="none" />

      {/* 2. ChromaDB FastEmbed + CRAG Evaluator */}
      <rect x="185" y="19" width="185" height="50" rx="7" fill="url(#dataGlow)" stroke="#a855f7" strokeWidth="1.2" />
      <text x="277" y="38" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">CRAG Evaluator & Rewrite</text>
      <text x="277" y="51" fill="#e9d5ff" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">ChromaDB FastEmbed Vectors</text>
      <text x="277" y="62" fill="#c084fc" fontSize="8" textAnchor="middle" fontFamily="'Space Mono', monospace">Retrieval Sufficiency Score</text>

      {/* Arrow to Challenger Node */}
      <path d="M 370 44 L 400 44" stroke="#c084fc" strokeWidth="1.3" markerEnd="url(#arrowPurp)" fill="none" />

      {/* 3. Challenger Node (Meta-Prompting) */}
      <rect x="405" y="20" width="120" height="48" rx="7" fill="rgba(244, 63, 94, 0.14)" stroke="#fb7185" strokeWidth="1.1" />
      <text x="465" y="40" fill="#fff1f2" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Challenger Node</text>
      <text x="465" y="54" fill="#fda4af" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Adversarial QA + Rubric</text>

      {/* Branching down to Dual Solvers */}
      <path d="M 465 68 L 465 95 L 360 95" stroke="#fb7185" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 360 95 L 360 115" stroke="#38bdf8" strokeWidth="1.3" fill="none" />

      {/* Dual Solvers (Weak vs Strong) */}
      {/* Weak Solver 8B */}
      <rect x="55" y="118" width="185" height="44" rx="7" fill="rgba(239, 68, 68, 0.14)" stroke="rgba(239, 68, 68, 0.65)" strokeWidth="1.1" />
      <text x="147" y="136" fill="#fef2f2" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Weak Solver (Llama-3-8B)</text>
      <text x="147" y="151" fill="#fca5a5" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Target: High Error Rate (&lt;30%)</text>

      {/* Strong Solver 31B */}
      <rect x="295" y="118" width="185" height="44" rx="7" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.65)" strokeWidth="1.1" />
      <text x="387" y="136" fill="#f0f9ff" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Strong Solver (Qwen-32B)</text>
      <text x="387" y="151" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Target: High Accuracy (&gt;80%)</text>

      {/* Flow into Rubric Judge */}
      <path d="M 147 162 L 147 188 L 230 188" stroke="#fca5a5" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 387 162 L 387 188 L 310 188" stroke="#7dd3fc" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 270 188 L 270 205" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#arrowEmerald)" fill="none" />

      {/* 4. Rubric Judge (Enforcing Difficulty Gap) */}
      <rect x="150" y="206" width="240" height="48" rx="7" fill="url(#judgeGlow)" stroke="#10b981" strokeWidth="1.2" />
      <text x="270" y="225" fill="#ecfdf5" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Rubric Judge & Benchmark Gate</text>
      <text x="270" y="240" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Enforces Δ ≥ 20% Accuracy Gap</text>

      {/* Feedback Refinement Loop back to Challenger */}
      <path d="M 390 230 L 510 230 L 510 68" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
      <text x="468" y="218" fill="#fbbf24" fontSize="8" fontFamily="'Space Mono', monospace">Refinement Loop ≤5</text>

      {/* 5. Gold Benchmark QA Dataset Output */}
      <path d="M 270 254 L 270 278" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#arrowEmerald)" fill="none" />
      <rect x="165" y="280" width="210" height="34" rx="6" fill="rgba(16, 185, 129, 0.16)" stroke="#10b981" strokeWidth="1.1" />
      <text x="270" y="297" fill="#ffffff" fontSize="10.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Gold Benchmark QA Dataset (.jsonl)</text>
      <text x="270" y="308" fill="#a7f3d0" fontSize="8" textAnchor="middle" fontFamily="'Space Mono', monospace">Adversarial Hard Subsets Guaranteed</text>

      {/* Tag */}
      <rect x="20" y="282" width="135" height="24" rx="12" fill="rgba(168, 85, 247, 0.14)" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="0.9" />
      <text x="87" y="297" fill="#c084fc" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="'Space Mono', monospace">META FAIR RESEARCH</text>
    </svg>
  );
}

export function DecmasSvg() {
  return (
    <svg
      viewBox="0 0 540 330"
      className="project-arch-svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="delmGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.04" />
        </linearGradient>
        <marker id="arrowTeal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#2dd4bf" />
        </marker>
        <marker id="arrowEmerald2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
        </marker>
      </defs>

      {/* Grid */}
      <pattern id="delmGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#delmGrid)" />

      {/* 1. Macro Goal Input */}
      <rect x="20" y="22" width="125" height="44" rx="7" fill="rgba(45, 212, 191, 0.14)" stroke="#2dd4bf" strokeWidth="1.1" strokeOpacity="0.8" />
      <text x="82" y="41" fill="#ccfbf1" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">User Goal / Task</text>
      <text x="82" y="55" fill="#99f6e4" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">pip install decmas</text>

      {/* Arrow to DemasOrchestrator */}
      <path d="M 145 44 L 175 44" stroke="#2dd4bf" strokeWidth="1.3" markerEnd="url(#arrowTeal)" fill="none" />

      {/* 2. DemasOrchestrator & LLM Dynamic DAG Planner */}
      <rect x="180" y="19" width="180" height="50" rx="7" fill="url(#delmGlow)" stroke="#10b981" strokeWidth="1.2" />
      <text x="270" y="38" fill="#f0fdf4" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">DemasOrchestrator</text>
      <text x="270" y="51" fill="#86efac" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">LLM Dynamic DAG Planner</text>
      <text x="270" y="62" fill="#5eead4" fontSize="8" textAnchor="middle" fontFamily="'Space Mono', monospace">Topological Sub-Task Graph</text>

      {/* Arrow to TaskQueue */}
      <path d="M 360 44 L 390 44" stroke="#2dd4bf" strokeWidth="1.3" markerEnd="url(#arrowTeal)" fill="none" />

      {/* 3. Thread-Safe Priority TaskQueue */}
      <rect x="395" y="21" width="130" height="46" rx="7" fill="rgba(30, 41, 59, 0.9)" stroke="#38bdf8" strokeWidth="1.1" />
      <text x="460" y="40" fill="#e0f2fe" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">TaskQueue (Mutex)</text>
      <text x="460" y="54" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">threading.Lock Protected</text>

      {/* Arrow down to Autonomous Worker Pool */}
      <path d="M 460 67 L 460 95 L 380 95" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 380 95 L 380 115" stroke="#2dd4bf" strokeWidth="1.3" markerEnd="url(#arrowTeal)" fill="none" />

      {/* 4. Autonomous Worker Threads (OS Threads) */}
      <rect x="65" y="118" width="120" height="44" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(45, 212, 191, 0.55)" strokeWidth="1" />
      <text x="125" y="136" fill="#f0fdfa" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Worker Thread 1</text>
      <text x="125" y="150" fill="#5eead4" fontSize="8.5" textAnchor="middle" fontFamily="'Space Mono', monospace">Domain Subtask A</text>

      <rect x="205" y="118" width="120" height="44" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(45, 212, 191, 0.55)" strokeWidth="1" />
      <text x="265" y="136" fill="#f0fdfa" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Worker Thread 2</text>
      <text x="265" y="150" fill="#5eead4" fontSize="8.5" textAnchor="middle" fontFamily="'Space Mono', monospace">Domain Subtask B</text>

      <rect x="345" y="118" width="130" height="44" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(45, 212, 191, 0.55)" strokeWidth="1" />
      <text x="410" y="136" fill="#f0fdfa" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">Worker Thread N</text>
      <text x="410" y="150" fill="#5eead4" fontSize="8.5" textAnchor="middle" fontFamily="'Space Mono', monospace">Concurrent OS Threads</text>

      {/* Converge into Verifier Admission Gate */}
      <path d="M 125 162 L 125 185 L 210 185" stroke="#2dd4bf" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 265 162 L 265 185" stroke="#2dd4bf" strokeWidth="1.3" fill="none" />
      <path d="M 410 162 L 410 185 L 320 185" stroke="#2dd4bf" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
      <path d="M 265 185 L 265 205" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#arrowEmerald2)" fill="none" />

      {/* 5. LLM-as-a-Verifier Admission Gate */}
      <rect x="150" y="206" width="230" height="46" rx="7" fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" strokeWidth="1.2" />
      <text x="265" y="225" fill="#ecfdf5" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">LLM-as-a-Verifier Gate</text>
      <text x="265" y="239" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontFamily="'Space Mono', monospace">Strict Schema & Correctness Verification</text>

      {/* Verified State write */}
      <path d="M 265 252 L 265 274" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#arrowEmerald2)" fill="none" />

      {/* 6. VerifiedSharedContext (Read-Only Blackboard) */}
      <rect x="135" y="276" width="260" height="40" rx="6" fill="rgba(2, 132, 199, 0.18)" stroke="#38bdf8" strokeWidth="1.1" />
      <text x="265" y="293" fill="#ffffff" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">VerifiedSharedContext (Blackboard)</text>
      <text x="265" y="307" fill="#7dd3fc" fontSize="8.5" textAnchor="middle" fontFamily="'Space Mono', monospace">Decentralized P2P Consensus Memory</text>

      {/* Badges */}
      <rect x="20" y="280" width="105" height="24" rx="12" fill="rgba(16, 185, 129, 0.14)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="0.9" />
      <text x="72" y="295" fill="#34d399" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="'Space Mono', monospace">STANFORD DeLM</text>

      <rect x="410" y="280" width="110" height="24" rx="12" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.9" />
      <text x="465" y="295" fill="#38bdf8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="'Space Mono', monospace">PYPI v0.1.1 LIVE</text>
    </svg>
  );
}

/**
 * ProjectSvgDiagram - Universal Renderer for the 4 core architectures
 */
export default function ProjectSvgDiagram({ type }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const normalized = (type || '').toLowerCase();

  let title = 'System Architecture Flow';
  let badge = 'VERIFIED';
  let DiagramComponent = SpecuRagSvg;

  if (normalized.includes('specurag') || normalized.includes('speculative') || normalized.includes('rag')) {
    title = 'SpecuRAG Architecture';
    badge = 'ICLR 2025 • 7.34x';
    DiagramComponent = SpecuRagSvg;
  } else if (normalized.includes('aegis') || normalized.includes('gateway') || normalized.includes('cache')) {
    title = 'AegisGateway Architecture';
    badge = 'REDIS • 14ms HIT';
    DiagramComponent = AegisGatewaySvg;
  } else if (normalized.includes('autodata') || normalized.includes('dataset') || normalized.includes('crag') || normalized.includes('fair')) {
    title = 'AutoData Architecture';
    badge = 'META FAIR • Δ≥20%';
    DiagramComponent = AutoDataSvg;
  } else if (normalized.includes('decmas') || normalized.includes('delm') || normalized.includes('agent')) {
    title = 'decmas Architecture';
    badge = 'PYPI v0.1.1 • DeLM';
    DiagramComponent = DecmasSvg;
  }

  return (
    <div className={`ai-diagram-card ${isExpanded ? 'is-diagram-expanded' : ''}`}>
      <div className="ai-diagram-card-header">
        <div className="ai-diagram-title-row">
          <span className="ai-diagram-title">{title}</span>
        </div>
        <div className="ai-diagram-header-right">
          <span className="ai-diagram-badge">{badge}</span>
          <button
            type="button"
            className="ai-diagram-zoom-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse diagram' : 'Expand diagram'}
            aria-label={isExpanded ? 'Collapse diagram' : 'Expand diagram'}
          >
            {isExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
        </div>
      </div>
      <div className="ai-diagram-svg-container">
        <DiagramComponent />
      </div>
    </div>
  );
}
