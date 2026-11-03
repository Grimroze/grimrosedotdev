import React, { useState, useRef, useEffect } from 'react';
import PromptBar from './PromptBar';
import ThoughtLine from './ThoughtLine';
import ProjectSvgDiagram from './ProjectSvgDiagram';
import { querySemanticCache } from '../services/aiCacheEngine';
import { checkSecurity } from '../services/sarcasticSentry';
import { RotateCcw, X, ArrowUpRight } from 'lucide-react';
import './AiChatDrawer.css';

const STARTER_PROMPTS = [
  { label: 'SpecuRAG Architecture', query: 'Explain SpecuRAG architecture and decoupled drafting' },
  { label: 'AegisGateway & Caching', query: 'How does AegisGateway sliding window rate limiting and semantic caching work?' },
  { label: 'decmas on PyPI', query: 'What is pip install decmas and Stanford DeLM topology?' },
  { label: 'AutoData Adversarial QA', query: 'Explain AutoData weak-strong evaluation loop and CRAG' },
  { label: 'LeetCode Knight Stats', query: 'What is your LeetCode rating and solved problems?' }
];

const WITTY_THOUGHTS = [
  "Wondering how RAG works… hmm",
  "Searching vector embeddings…",
  "Decoupling draft from verification…",
  "Consulting the LeetCode oracle…",
  "Quantizing thoughts to FP8…",
  "Checking if decmas is on PyPI…",
  "Scanning Redis ZSET timestamps…",
  "Verifying BGE lexical polarity…",
  "Evaluating Weak-Strong benchmark gap…",
  "Recalibrating semantic registers…",
  "Simulating 1,200+ edge cases…",
  "Hallucinating… wait, no, grounding…",
  "Compressing prompt by 85%…",
  "Applying RLHF human alignment…",
  "Navigating DTU neural manifolds…",
  "Speculating the next 5 tokens…",
  "Running speculative verification pass…",
  "Synthesizing dossier intelligence…"
];

const getReasoningSteps = (text) => {
  const security = checkSecurity(text);
  if (security && security.blocked) {
    return [
      "Inspecting payload in Sarcastic Sentry (0.3ms)",
      "Adversarial / Threat signature intercepted",
      "Zero LLM tokens burned (₹0.00 infra cost)",
      "Deploying razor-sharp developer retaliation"
    ];
  }

  const t = text.toLowerCase();
  if (t.includes('aegis') || t.includes('polarity') || t.includes('gateway') || t.includes('redis') || t.includes('rate limit')) {
    return [
      "Extracting query lexical polarity & negation tokens",
      "Scanning BGE-small 384-dim normalized vector index",
      "Validating Redis ZSET sliding-window rate limit (~1ms)",
      "Checking distributed Circuit Breaker failover state",
      "Grounded gateway telemetry assembled"
    ];
  }
  if (t.includes('autodata') || t.includes('dataset') || t.includes('weak') || t.includes('challenger') || t.includes('crag')) {
    return [
      "Evaluating Corrective RAG (CRAG) retrieval depth",
      "Formulating multi-hop question & weighted rubric in Challenger",
      "Executing Weak Solver (8B) vs Strong Solver (31B)",
      "Enforcing 20+ point benchmark accuracy gap in Judge",
      "Adversarial synthetic dataset record verified"
    ];
  }
  if (t.includes('specu') || t.includes('rag')) {
    return [
      "Querying dual-channel retrieval index (BM25 + ChromaDB)",
      "Fusing candidates via Reciprocal Rank Fusion (k=60)",
      "Drafting speculative rationale with Llama-3.2-3B",
      "Running context-free verification with Llama-3.1-8B",
      "Grounded architecture brief assembled"
    ];
  }
  if (t.includes('decmas') || t.includes('pypi') || t.includes('agent') || t.includes('delm')) {
    return [
      "Querying PyPI package registry for decmas v0.1.1",
      "Traversing Stanford DeLM decentralized P2P topology",
      "Evaluating task dependency DAG under mutex lock",
      "Running LLM-as-a-Verifier admission gate",
      "Package architecture compiled"
    ];
  }
  if (t.includes('leetcode') || t.includes('knight') || t.includes('stats') || t.includes('rating') || t.includes('dsa') || t.includes('c++')) {
    return [
      "Accessing algorithmic telemetry & contest history",
      "Verifying Knight badge: 1900+ (Top 3% globally)",
      "Parsing 1,200+ solved problems across LeetCode, CSES & GFG",
      "Validating asymptotic time & space bounds in C++",
      "Complexity profile validated"
    ];
  }
  return [
    "Scanning Sarcastic Sentry for prompt injection payloads",
    "Encoding prompt embedding with nomic-embed-text",
    "Searching Goldi's engineering dossier registers",
    "Synthesizing direct technical response"
  ];
};

export default function AiChatDrawer({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenDoc
}) {
  const [messages, setMessages] = useState([]);
  const [selectedSection, setSelectedSection] = useState('all');
  const [isBusy, setIsBusy] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentThought, setCurrentThought] = useState("Thinking…");
  const [currentSteps, setCurrentSteps] = useState([]);
  
  const scrollAreaRef = useRef(null);
  const timeoutRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const thoughtStartTimeRef = useRef(0);
  const userScrolledUpRef = useRef(false);

  // Auto-scroll to bottom as tokens stream in unless user scrolled up
  useEffect(() => {
    if (scrollAreaRef.current && !userScrolledUpRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isBusy, isStreaming]);

  const handleScrollFeed = () => {
    if (!scrollAreaRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    // If user is more than 50px away from bottom, pause auto-scroll lock
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    userScrolledUpRef.current = !isAtBottom;
  };

  const handleSend = (text) => {
    if (!text.trim() || isBusy || isStreaming) return;

    userScrolledUpRef.current = false;
    const trimmed = text.trim();
    const match = querySemanticCache(trimmed, selectedSection);
    const isSecurityBlock = Boolean(match && match.blocked);

    // Pick random sarcastic/clever AI developer thought (or sentry alert for security blocks)
    const randomThought = isSecurityBlock
      ? "Intercepted by Sarcastic Sentry (0.3ms)…"
      : WITTY_THOUGHTS[Math.floor(Math.random() * WITTY_THOUGHTS.length)];
    const steps = getReasoningSteps(trimmed);

    // Latency: fast 650-900ms for security blocks, 2.2-2.8s for deep technical answers
    const latency = isSecurityBlock
      ? Math.floor(650 + Math.random() * 250)
      : Math.floor(2200 + Math.random() * 600);

    const newMessages = [
      ...messages,
      {
        id: 'user-' + Date.now(),
        sender: 'user',
        text: trimmed
      }
    ];
    setMessages(newMessages);
    setIsBusy(true);
    setCurrentThought(randomThought);
    setCurrentSteps(steps);

    thoughtStartTimeRef.current = performance.now();

    // After thinking latency, transition smoothly into real-time token streaming
    timeoutRef.current = setTimeout(() => {
      const elapsedSeconds = ((performance.now() - thoughtStartTimeRef.current) / 1000).toFixed(1);
      setIsBusy(false);
      timeoutRef.current = null;

      const botMessageId = 'bot-' + Date.now();
      const fullText = match.response;
      // Split into tokens preserving words, whitespace, and newlines
      const tokens = fullText.split(/(\s+)/);

      // Mount message with settled thought record and start empty stream
      setMessages(prev => [
        ...prev,
        {
          id: botMessageId,
          sender: 'assistant',
          text: '',
          action: null,
          thoughtDuration: elapsedSeconds,
          thoughtLabel: randomThought,
          thoughtSteps: steps,
          isStreaming: true
        }
      ]);

      setIsStreaming(true);

      let tokenIdx = 0;
      let currentAccumulated = '';

      // Stream 2 tokens (~word + space) every 24ms for authentic lightning-fast streaming
      streamIntervalRef.current = setInterval(() => {
        if (tokenIdx >= tokens.length) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
          setIsStreaming(false);

          // Finished streaming: reveal action button
          setMessages(prev =>
            prev.map(m =>
              m.id === botMessageId
                ? { ...m, isStreaming: false, text: fullText, action: match.action }
                : m
            )
          );
          return;
        }

        const chunk = tokens.slice(tokenIdx, tokenIdx + 2).join('');
        tokenIdx += 2;
        currentAccumulated += chunk;

        setMessages(prev =>
          prev.map(m =>
            m.id === botMessageId
              ? { ...m, text: currentAccumulated }
              : m
          )
        );
      }, 24);

    }, latency);
  };

  // Terminate execution when user clicks stop button (during thinking OR streaming)
  const handleStop = () => {
    // 1. If thinking is active
    if (isBusy) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      const elapsedSeconds = ((performance.now() - thoughtStartTimeRef.current) / 1000).toFixed(1);
      setIsBusy(false);

      setMessages(prev => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'assistant',
          text: 'Oops! Tokens wasted T_T',
          isTerminated: true,
          thoughtDuration: elapsedSeconds,
          thoughtLabel: currentThought,
          thoughtSteps: currentSteps.slice(0, 1)
        }
      ]);
      return;
    }

    // 2. If token streaming is active
    if (isStreaming) {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }
      setIsStreaming(false);

      setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.sender === 'assistant') {
          return prev.slice(0, -1).concat({
            ...lastMsg,
            isStreaming: false,
            isTerminated: true,
            text: lastMsg.text + '\n\n*Oops! Tokens wasted T_T*'
          });
        }
        return prev;
      });
    }
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (action.docIndex !== undefined && onOpenDoc) {
      onOpenDoc(action.docIndex);
      return;
    }
    if (action.section && onNavigateSection) {
      onNavigateSection(action.section);
    }
  };

  const handleReset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setIsBusy(false);
    setIsStreaming(false);
    setMessages([]);
  };

  const handleClaudeWish = () => {
    setMessages(prev => [
      ...prev,
      {
        id: 'wish-' + Date.now(),
        sender: 'assistant',
        text: 'you wish !! 😂',
        action: null,
        thoughtDuration: '0.2',
        thoughtLabel: 'Querying Claude Fable 5.1…',
        thoughtSteps: [
          'Zero tokens allocated',
          'Defaulted to DeepSeek V3'
        ]
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="ai-chat-drawer-backdrop"
      onClick={onClose}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="ai-chat-drawer-card"
        onClick={e => e.stopPropagation()}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        
        {/* Minimal Claude-Style Header with name "eigen" */}
        <div className="ai-drawer-header">
          <div className="ai-drawer-brand">
            <span className="ai-drawer-title">eigen</span>
          </div>

          <div className="ai-drawer-header-actions">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="ai-drawer-icon-btn"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ai-drawer-icon-btn"
              title="Close"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div
          ref={scrollAreaRef}
          className="ai-drawer-messages-flow"
          data-lenis-prevent="true"
          onScroll={handleScrollFeed}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.length === 0 && (
            <div className="ai-drawer-empty-state">
              <p className="ai-empty-prompt">Ask anything about Goldi's systems, LeetCode rigor, or research.</p>
              <div className="ai-starters-list">
                {STARTER_PROMPTS.map((starter, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(starter.query)}
                    className="ai-starter-line"
                  >
                    <span>{starter.label}</span>
                    <ArrowUpRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`ai-drawer-message-row ${msg.sender === 'user' ? 'from-user' : 'from-assistant'} ${msg.isTerminated ? 'is-terminated' : ''}`}
            >
              {/* Claude-style collapsible thought record above assistant response */}
              {msg.sender === 'assistant' && msg.thoughtDuration && (
                <div className="ai-message-thought-header">
                  <ThoughtLine
                    glyph="dot"
                    working={false}
                    elapsed={parseFloat(msg.thoughtDuration)}
                    doneLabel={msg.isTerminated && !msg.text.includes('\n\n*') ? `Aborted after ${msg.thoughtDuration}s` : `Thought for ${msg.thoughtDuration}s`}
                    steps={msg.thoughtSteps || []}
                    fontSize={12}
                    showTimer={false}
                    collapsible={true}
                    collapseOnSettle={true}
                    color="rgba(255, 255, 255, 0.45)"
                    glyphColor={msg.isTerminated && !msg.text.includes('\n\n*') ? "#f87171" : "rgba(255, 255, 255, 0.7)"}
                  />
                </div>
              )}

              <div className="ai-message-bubble">
                <div className="ai-message-content">
                  {renderFormattedText(msg.text, msg.isTerminated && !msg.text.includes('\n\n*'))}
                  {msg.isStreaming && <span className="ai-streaming-cursor" aria-hidden="true" />}
                </div>

                {msg.action && (
                  <div className="ai-message-action-wrap">
                    <button
                      type="button"
                      onClick={() => handleActionClick(msg.action)}
                      className="ai-message-action-btn"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowUpRight size={12} strokeWidth={2} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* UNBOXED Thinking Stream with breathing dot & progressive 1-by-1 step checks */}
          {isBusy && (
            <div className="ai-drawer-thought-stream">
              <ThoughtLine
                glyph="dot"
                label={currentThought}
                working={true}
                steps={currentSteps}
                stepInterval={740}
                fontSize={13}
                showTimer={true}
                color="rgba(255, 255, 255, 0.85)"
                glyphColor="#ffffff"
                collapsible={true}
              />
            </div>
          )}
        </div>

        {/* Input Dock with onStop and onClaudeSelect handlers wired */}
        <div className="ai-drawer-input-dock">
          <PromptBar
            placeholder="Ask a question..."
            busy={isBusy || isStreaming}
            onSend={handleSend}
            onStop={handleStop}
            onClaudeSelect={handleClaudeWish}
            selectedSection={selectedSection}
            onSectionSelect={setSelectedSection}
          />
        </div>

      </div>
    </div>
  );
}

function renderFormattedText(rawText, isPureTerminated = false) {
  if (!rawText) return null;

  if (isPureTerminated) {
    return (
      <p className="ai-para-line ai-terminated-text">
        {rawText}
      </p>
    );
  }

  // Split text by code/diagram blocks ```...```
  const codeBlockRegex = /```(?:diagram|ascii)?\s*([\s\S]*?)```/g;
  const sections = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(rawText)) !== null) {
    if (match.index > lastIndex) {
      sections.push({ type: 'text', content: rawText.slice(lastIndex, match.index) });
    }
    sections.push({ type: 'diagram', content: match[1].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < rawText.length) {
    sections.push({ type: 'text', content: rawText.slice(lastIndex) });
  }

  return sections.map((sec, sIdx) => {
    if (sec.type === 'diagram') {
      return (
        <ProjectSvgDiagram
          key={`diag-${sIdx}`}
          type={sec.content}
        />
      );
    }

    const lines = sec.content.split('\n');

    return lines.map((line, lIdx) => {
      const trimmed = line.trim();

      if (trimmed === '---') {
        return <hr key={`hr-${sIdx}-${lIdx}`} className="ai-message-divider" />;
      }

      const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
      const content = isBullet ? trimmed.replace(/^[•\-]\s*/, '') : line;

      // Tokenize formatting: bold, italic, code, link
      const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={pIdx}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={pIdx} className="ai-inline-code">{part.slice(1, -1)}</code>;
        }
        const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (linkMatch) {
          return (
            <a
              key={pIdx}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-chat-link"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={`b-${sIdx}-${lIdx}`} className="ai-bullet-line">
            <span className="bullet-glyph">•</span>
            <span className="bullet-text">{renderedLine}</span>
          </div>
        );
      }

      if (!trimmed) {
        return <div key={`sp-${sIdx}-${lIdx}`} className="ai-spacer-line" />;
      }

      return (
        <p key={`p-${sIdx}-${lIdx}`} className="ai-para-line">
          {renderedLine}
        </p>
      );
    });
  });
}
