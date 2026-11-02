import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Waves from './components/Waves';
import GooeyNav from './components/GooeyNav';
import ScrollReveal from './components/ScrollReveal';
import VariableProximity from './components/VariableProximity';
import SlingButton from './components/SlingButton';
import Folder from './components/Folder';
import DitherVeil from './components/DitherVeil';
import DocumentReader from './components/DocumentReader';
import ProjectDeck from './components/ProjectDeck';
import SitePreloader from './components/SitePreloader';
import FoundationsArchive from './components/FoundationsArchive';
import ConnectLoop from './components/ConnectLoop';
import AiOrbTrigger from './components/AiOrbTrigger';
import AiChatDrawer from './components/AiChatDrawer';
import ThemeToggle from './components/ThemeToggle';
import { ArrowDown, ArrowUpRight, ArrowDownRight, X, Mail, FileText, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Navigation Order: Home -> About -> Work -> Connect
const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Connect', href: '#contact' }
];

const STATEMENT_HIGHLIGHTS = [
  { phrase: 'AI', style: 'spinner' },
  { phrase: 'black coffee', style: 'underline' },
  { phrase: 'problems', style: 'underline' }
];

const ABOUT_DOCS = [
  {
    badge: '01 / OVERVIEW',
    tag: 'FIRST PRINCIPLES // NARRATIVE',
    title: 'Engineering Intelligence From First Principles',
    subtitle: 'AI Systems & Model Evaluation Engineer • Delhi Technological University (DTU \'27)',
    sections: [
      {
        heading: 'The Engineering Narrative',
        text: 'I am an AI Systems & Model Evaluation Engineer and final-year Computer Science undergraduate at Delhi Technological University (DTU \'27).\n\nCurrently, I work as an AI Coding & Model Evaluator (Freelance) at Outlier AI (Scale AI), applying Reinforcement Learning from Human Feedback (RLHF) principles to align frontier LLMs, stress-testing complex Python and C++ reasoning paths, and crafting adversarial multi-turn evaluation suites to isolate failure modes.'
      },
      {
        heading: 'Algorithmic Rigor & System Design',
        text: 'My approach to AI architecture is grounded in fundamental computer science principles. As a LeetCode Knight (Rating 1900+, Top 3% globally with 1,200+ solved problems across LeetCode, CSES & GFG using C++), I treat system design, caching layers, and multi-agent loops with the same relentless focus on time/space complexity, edge-case resilience, and verifiable correctness.'
      },
      {
        heading: 'Applied Research & Open-Source Topologies',
        text: 'Author and maintainer of pip install decmas on PyPI — a Stanford DeLM-inspired decentralized peer-to-peer multi-agent framework resolving router bottlenecks. Deeply focused on speculative decoding (ICLR \'25 SpecuRAG), hybrid retrieval fusion, and sub-15ms semantic caching for production gateways.'
      },
      {
        heading: 'Beyond The Terminal',
        text: 'Outside model evaluation pipelines and distributed systems, I cultivate strategic perspective and creative expression — writing actively with the DTU Art & Poetry Society, and executing split-second tactical strategy as a championship In-Game Leader (IGL) in inter-college competitive esports.'
      }
    ],
    items: [
      'DTU \'27 (B.Tech CS)',
      'Outlier AI (Scale AI)',
      'RLHF & Alignment',
      'LeetCode Knight 1900+',
      '1200+ Solved',
      'PyPI decmas',
      'DTU Art & Poetry',
      'Esports IGL Champion',
      'New Delhi, India'
    ]
  },
  {
    badge: '02 / ARSENAL',
    tag: 'TECHNICAL SKILLS // SYSTEMS',
    title: 'Technical Arsenal & System Stack',
    subtitle: 'Production GenAI Frameworks, Distributed Backend, Infrastructure & Core CS',
    sections: [
      {
        heading: 'GenAI & Evaluation Frameworks',
        text: 'Production multi-agent orchestration, model evaluation rubrics, and hybrid retrieval engines.',
        chips: [
          'LangGraph',
          'LangChain',
          'DeepEval',
          'G-Eval',
          'RLHF Evals',
          'Corrective RAG (CRAG)',
          'Semantic Caching',
          'ChromaDB',
          'FAISS',
          'Ollama',
          'nomic-embed-text',
          'BGE Embeddings'
        ]
      },
      {
        heading: 'Languages & Core CS Fundamentals',
        text: 'Deep foundational rigor across systems programming, complexity analysis, and OS internals.',
        chips: [
          'Python',
          'C++',
          'SQL',
          'Data Structures & Algorithms',
          'DBMS',
          'Operating Systems',
          'Computer Networks',
          'Object-Oriented Programming (OOP)'
        ]
      },
      {
        heading: 'Backend & Distributed Systems',
        text: 'High-throughput reverse proxies, sliding-window rate limiters, and fault-tolerant failovers.',
        chips: [
          'FastAPI',
          'Redis (ZSET, Hashes, Pipelines)',
          'PostgreSQL',
          'Docker',
          'REST APIs',
          'Microservices Architecture',
          'Distributed Circuit Breakers',
          'Sliding-Window Rate Limiting'
        ]
      },
      {
        heading: 'Developer Tools & Observability',
        text: 'End-to-end distributed tracing, async concurrency, and rapid deployment toolchains.',
        chips: [
          'LangSmith',
          'Pydantic',
          'Git & GitHub',
          'AsyncIO',
          'Streamlit',
          'Supabase',
          'Scikit-learn',
          'BM25',
          'K-Means Clustering'
        ]
      }
    ]
  },
  {
    badge: '03 / RESUME',
    tag: 'CURRICULUM VITAE // GOLDI SONI',
    title: 'Curriculum Vitae & Verified Systems',
    subtitle: 'Delhi Technological University (DTU) • Outlier AI (Scale AI) • Flagship Systems & Impact',
    sections: [
      {
        heading: 'Education',
        bullets: [
          'Delhi Technological University (DTU) — B.Tech in Computer Science & Engineering (2023 – 2027) | CGPA: 7.65 (Roll: 23/CS/158)',
          'School Of Excellence, Khichripur, Delhi — CBSE Class XII: 93.4% | CBSE Class X: 91.6% (2021 – 2023)'
        ]
      },
      {
        heading: 'Work Experience — Outlier AI (Scale AI)',
        text: 'AI Coding & Model Evaluator (Freelance) | June 2026 – Present',
        bullets: [
          'Evaluated AI-generated code completions across Python and C++ for algorithmic correctness, time/space complexity, and edge-case resilience.',
          'Conducted rubric-based RLHF evaluations, benchmarking frontier model outputs against strict criteria for instruction compliance, logic soundness, and hallucination reduction.',
          'Authored detailed technical rationales and designed adversarial test inputs to isolate failure modes, optimize reasoning chains, and assist LLM fine-tuning pipelines.'
        ]
      },
      {
        heading: 'Flagship Systems & Open-Source Projects',
        bullets: [
          'AegisGateway — Resilient Distributed LLM Gateway (FastAPI, Redis, Docker, LangChain, BGE): Reverse proxy with Redis ZSET sliding-window rate limiter (~1ms overhead), 2-stage semantic cache (BGE-small + polarity guard, cutting p95 latency from 2140ms to 14ms / 99.3% drop), and distributed Redis Circuit Breaker for zero-downtime failover.',
          'SpecuRAG — Speculative RAG Engine (ICLR 2025) (Python, Ollama, ChromaDB, BM25, AsyncIO): Decoupled contextual drafting (Llama-3.2-3B) from verification (Llama-3.1-8B). BM25 + dense hybrid retrieval fused via RRF (k=60), Silhouette K-Means clustering, and ~85% prompt compression.',
          'AutoData — Adversarial QA Dataset Generator (LangGraph, DeepEval, Ollama, LangSmith): Meta FAIR Autodata-inspired multi-agent pipeline generating multi-hop reasoning datasets with Weak-Strong evaluation loop (Llama 3.1 8B vs Gemma 2 27B) and CRAG.',
          'pip install decmas (PyPI & GitHub) (Python, LangChain, Pydantic, Concurrency): Stanford DeLM-inspired decentralized peer-to-peer agent topology resolving router bottlenecks with async queues, eliminating redundant API calls by 50%.'
        ]
      },
      {
        heading: 'Competitive Programming & Campus Leadership',
        bullets: [
          'LeetCode Knight (Rating 1900+, Top 3% globally). Solved 1200+ problems across LeetCode, CSES & GeeksforGeeks using C++.',
          'Finalist at HACKJMI (Feb 2025) — Built accessible mental health assessment platform using full-stack web technologies.',
          'Active Member, DTU Art & Poetry Society; Championship In-Game Leader (IGL) at Inter-College Esports Tournament.'
        ]
      }
    ],
    link: {
      label: 'Download / View Full Resume (PDF)',
      href: '/resume.pdf'
    }
  }
];

export default function App() {
  const lenisRef = useRef(null);
  const statementRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const heroQuoteContainerRef = useRef(null);
  const wavesContainerRef = useRef(null);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const isClickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef(null);
  const [focusedDocIndex, setFocusedDocIndex] = useState(-1);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [isWorkInView, setIsWorkInView] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Prevent scroll during initial preloader sequence, when reading a document modal, or when AI drawer is open
  useEffect(() => {
    const isLocked = showPreloader || focusedDocIndex >= 0 || isAiOpen;
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (lenisRef.current) {
        lenisRef.current.start();
        ScrollTrigger.refresh();
      }
    }
  }, [showPreloader, focusedDocIndex, isAiOpen]);

  const launchCatapultToAbout = useCallback(() => {
    setIsFolderOpen(true);
    // Kinetic catapult recoil & particle shower plays for ~380ms before inertial camera glide
    setTimeout(() => {
      if (lenisRef.current && aboutRef.current) {
        lenisRef.current.scrollTo(aboutRef.current, { duration: 1.2, offset: 0 });
      } else {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 380);
  }, []);

  // Initialize Lenis Smooth Inertial Scroll + GSAP ScrollTrigger Integration
  useEffect(() => {
    // Reset scroll to top on fresh load / reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential decay
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Immediately ensure we are at top
    lenis.scrollTo(0, { immediate: true });

    // Freeze Lenis immediately on mount if preloader or document modal is active
    if (showPreloader || focusedDocIndex >= 0) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    const updateActiveSectionOnScroll = () => {
      if (isClickScrollingRef.current) return;

      const vh = window.innerHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;

      let nextIndex = 0;

      // When near bottom of page (within 80px), always highlight Contact (index 3)
      if (scrollY + vh >= docHeight - 80) {
        nextIndex = 3;
      } else if (contactRef.current && contactRef.current.getBoundingClientRect().top <= vh * 0.45) {
        nextIndex = 3;
      } else if (workRef.current && workRef.current.getBoundingClientRect().top <= vh * 0.45) {
        nextIndex = 2;
      } else if (aboutRef.current && aboutRef.current.getBoundingClientRect().top <= vh * 0.45) {
        nextIndex = 1;
      } else {
        nextIndex = 0;
      }

      setActiveNavIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
    };

    // Connect Lenis to ScrollTrigger so scrubs glide with inertial momentum
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      // When scrolled down > 45px, smoothly fade out the floating arrow
      setShowScrollPrompt(e.scroll < 45);
      updateActiveSectionOnScroll();
    });

    window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once fonts are fully ready
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
      updateActiveSectionOnScroll();
    });

    const aboutScrollTrigger = ScrollTrigger.create({
      trigger: aboutRef.current,
      start: 'top 70%',
      end: 'bottom 20%',
      onEnter: () => setIsFolderOpen(true),
      onLeave: () => setIsFolderOpen(false),
      onEnterBack: () => setIsFolderOpen(true),
      onLeaveBack: () => setIsFolderOpen(false)
    });

    const workScrollTrigger = ScrollTrigger.create({
      trigger: workRef.current,
      start: 'top 75%',
      onEnter: () => setIsWorkInView(true)
    });

    // Smooth cinematic wave fade: 1.0 in Home, smoothly fading to 0.22 as you scroll down past Home,
    // and staying completely faded for the entire rest of the site until you scroll back up to Home.
    const wavesHomeFadeTween = gsap.fromTo(
      wavesContainerRef.current,
      { opacity: 1.0 },
      {
        opacity: 0.22,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      }
    );

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      wavesHomeFadeTween.kill();
      aboutScrollTrigger.kill();
      workScrollTrigger.kill();
      window.removeEventListener('scroll', updateActiveSectionOnScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (clickScrollTimeoutRef.current) clearTimeout(clickScrollTimeoutRef.current);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Close DocumentReader on Escape key press if open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && focusedDocIndex >= 0) setFocusedDocIndex(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedDocIndex]);

  const handleNavChange = (index, item) => {
    setActiveNavIndex(index);
    isClickScrollingRef.current = true;
    if (clickScrollTimeoutRef.current) clearTimeout(clickScrollTimeoutRef.current);
    clickScrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1400);

    const onDone = () => {
      isClickScrollingRef.current = false;
    };

    if (item.label === 'Home') {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.2, onComplete: onDone });
      else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(onDone, 800);
      }
    } else if (item.label === 'About') {
      setIsFolderOpen(true);
      if (lenisRef.current && aboutRef.current) {
        lenisRef.current.scrollTo(aboutRef.current, { duration: 1.2, offset: 0, onComplete: onDone });
      } else {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(onDone, 800);
      }
    } else if (item.label === 'Work') {
      setIsWorkInView(true);
      if (lenisRef.current && workRef.current) {
        lenisRef.current.scrollTo(workRef.current, { duration: 1.2, offset: 0, onComplete: onDone });
      } else {
        workRef.current?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(onDone, 800);
      }
    } else if (item.label === 'Connect' || item.label === 'Contact') {
      if (lenisRef.current && contactRef.current) {
        lenisRef.current.scrollTo(contactRef.current, { duration: 1.2, offset: 0, onComplete: onDone });
      } else {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(onDone, 800);
      }
    }
  };

  const scrollToStatement = () => {
    if (lenisRef.current && statementRef.current) {
      lenisRef.current.scrollTo(statementRef.current, { duration: 1.4, offset: -20 });
    } else {
      statementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: theme === 'light' ? '#f8f8f9' : '#000000', transition: 'background-color 0.35s ease' }}>
      {/* 0. Neural Super-Resolution CNN Preloader */}
      {showPreloader && (
        <SitePreloader
          onFading={() => setHeroReady(true)}
          onFinish={() => {
            setHeroReady(true);
            setShowPreloader(false);
          }}
        />
      )}

      {/* High-Fidelity Dossier Document Reader Modal (Rendered at Root Level so no section stacking context can ever overlap it) */}
      {focusedDocIndex >= 0 && (
        <DocumentReader
          doc={ABOUT_DOCS[focusedDocIndex]}
          docIndex={focusedDocIndex}
          onClose={() => setFocusedDocIndex(-1)}
        />
      )}

      {/* Floating 3D Reactive Glass AI Orb Trigger (Loads only after CNN Preloader sequence completes) */}
      {!showPreloader && heroReady && (
        <AiOrbTrigger
          isOpen={isAiOpen}
          onToggle={() => setIsAiOpen(prev => !prev)}
        />
      )}

      {/* AI SpecuRAG Chat HUD / Drawer */}
      <AiChatDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onNavigateSection={(sec) => {
          if (sec === 'about') handleNavChange(1, NAV_ITEMS[1]);
          else if (sec === 'work') handleNavChange(2, NAV_ITEMS[2]);
          else if (sec === 'contact') handleNavChange(3, NAV_ITEMS[3]);
          else if (sec === 'home-statement') scrollToStatement();
          setIsAiOpen(false);
        }}
        onOpenDoc={(idx) => {
          setFocusedDocIndex(idx);
          setIsAiOpen(false);
        }}
      />

      {/* 1. Fixed Interactive Waves Background (1.0 in Hero, silkily fades down to 0.22 below Home and stays faded) */}
      <div
        ref={wavesContainerRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'auto',
          willChange: 'opacity'
        }}
      >
        <Waves
          lineColor={theme === 'light' ? '#18181b' : '#ffffff'}
          backgroundColor={theme === 'light' ? '#f8f8f9' : '#000000'}
          lightMode={theme === 'light'}
          amplitude={32}
          speed={1}
          spacing={10}
          lineWidth={theme === 'light' ? 0.75 : 1}
          mouseInteraction={true}
          mouseRadius={175}
          mouseStrength={1}
          clickRipple={true}
        />
      </div>

      {/* Floating Ceramic / Obsidian Theme Toggle */}
      <ThemeToggle
        theme={theme}
        onToggle={toggleTheme}
        ready={!showPreloader && heroReady}
      />

      {/* 2. Floating Navigation with Minimal Pastel Dot Toggle */}
      <div className={`nav-cinematic-enter nav-master-dock ${heroReady ? 'dock-enter' : 'dock-pending'}`}>
        {/* Abstract Minimal Pastel Dot Button */}
        <button
          onClick={() => setIsNavOpen(prev => !prev)}
          className={`nav-pastel-trigger ${isNavOpen ? 'is-open' : 'is-closed'}`}
          aria-label={isNavOpen ? 'Minimize navigation' : 'Expand navigation'}
          title={isNavOpen ? 'Click to minimize navigation' : 'Click to expand navigation'}
        >
          <span className="pastel-dot" />
        </button>

        {/* Expandable Navigation Bar */}
        <div className={`nav-bar-wrapper ${isNavOpen ? 'open' : 'closed'}`}>
          <GooeyNav
            items={NAV_ITEMS}
            activeIndex={activeNavIndex}
            initialActiveIndex={0}
            theme={theme}
            size="sm"
            color={theme === 'light' ? '#18181b' : '#faedf1'}
            frame={true}
            particleCount={32}
            spread={100}
            animationTime={600}
            timeVariance={300}
            gooeyness={1}
            wobble={0.5}
            hoverEffect={true}
            onChange={handleNavChange}
          />
        </div>
      </div>

      {/* 3. Floating Scroll Down Button (Smooth cinematic bloom on load, dynamic scroll fade) */}
      <div className={`hero-scroll-track ${showScrollPrompt && heroReady ? 'prompt-visible' : 'prompt-hidden'}`}>
        <div className="hero-scroll-enter">
          <button
            onClick={scrollToStatement}
            className="hero-scroll-btn"
            aria-label="Scroll to statement"
          >
            <ArrowDown size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* 4. Transparent Scroll Content Track */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        
        {/* Section 1: Hero Landing (100vh) */}
        <section
          id="home"
          className="hero-landing-section"
        >
          {/* Asymmetric Sarcastic Pull-Quote (Right, slightly above center) */}
          <div ref={heroQuoteContainerRef} className={`hero-quote-container ${heroReady ? 'quote-enter' : 'quote-pending'}`}>
            <p className="hero-quote-body">
              <VariableProximity
                label="“Hallucinating solutions to problems that didn't even exist before I wrote the code >_”"
                className="hero-quote-proximity"
                fromFontVariationSettings="'wght' 320, 'opsz' 14, 'wdth' 115"
                toFontVariationSettings="'wght' 1000, 'opsz' 40, 'wdth' 128"
                radius={130}
                scale={1.32}
                lift={0.16}
                falloff="gaussian"
                smoothing={0.16}
                containerRef={heroQuoteContainerRef}
              />
            </p>
            <div className="hero-quote-attribution">
              <span className="hero-quote-dash">—</span>
              <button
                onClick={scrollToStatement}
                className="hero-quote-author-clean"
                aria-label="Scroll to statement by Goldi Soni"
                title="Click to explore • Goldi Soni"
              >
                <VariableProximity
                  label="Goldi Soni"
                  className="hero-author-proximity"
                  fromFontVariationSettings="'wght' 550, 'opsz' 16, 'wdth' 115"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40, 'wdth' 128"
                  radius={110}
                  scale={1.3}
                  lift={0.16}
                  falloff="gaussian"
                  smoothing={0.16}
                  containerRef={heroQuoteContainerRef}
                />
                <span className="hero-author-arrow">
                  <ArrowDownRight size={15} strokeWidth={2.4} />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Home Statement Track (Part of Home, with slot-machine AI spinner & reveal) */}
        <section
          ref={statementRef}
          id="home-statement"
          style={{
            minHeight: '190vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '160px 32px',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1240px',
              pointerEvents: 'auto'
            }}
          >
            {/* Wider, Larger Statement with deliberate 2-3 scroll pacing & eye-catchy keyword highlights */}
            <ScrollReveal
              highlights={STATEMENT_HIGHLIGHTS}
              splitBy="words"
              effect="fade"
              mode="scrub"
              enableBlur={true}
              blurStrength={6}
              baseOpacity={theme === 'light' ? 0.22 : 0.12}
              stagger={0.06}
              highlightColor={theme === 'light' ? '#09090b' : '#faedf1'}
            >
              Sometimes I wonder how AI is going to make my morning black coffee... well, guess I should probably fine-tune a model for that too. Until then, I spend my hours taming loss curves, optimizing weights, and building intelligent systems that hallucinate a little less and solve real problems a little more.
            </ScrollReveal>

            {/* Slingshot Catapult Launcher */}
            <div className="statement-launcher-row">
              <div className="sling-launch-wrapper">
                <SlingButton
                  tapSends={false}
                  size={56}
                  onSend={launchCatapultToAbout}
                />
                <div className="sling-hint-block">
                  <span className="sling-hint-title">
                    Pull back & release to catapult
                  </span>
                  <span className="sling-hint-subtitle">
                    drag to aim trajectory • launch into dossier
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2.5: Interactive 3D About Section (Seamless On-Page Flow) */}
        <section
          ref={aboutRef}
          id="about"
          className="about-page-section"
        >
          <div className="about-content-wrapper">
            {/* Minimalist Engineered Section Heading */}
            <div className="about-header-group">
              <h3 className="about-section-title">
                Overfitting on first principles, underfitting on sleep.
              </h3>
              <p className="about-section-subtitle">
                0% buzzwords, 100% deterministic code. An unfiltered dossier on distributed systems, speculative inference, and algorithmic rigor.
              </p>
            </div>

            {/* Split Stage: Left Metallic Dithered Face + Right Interactive 3D Folder */}
            <div className="about-split-stage">
              {/* Left Column: Solo Metallic Stippled Face (Floating naturally without window/background) */}
              <div className="about-face-standalone">
                <img
                  src="/metallic-head-silhouette.png"
                  alt=""
                  className="about-face-silhouette-underlay"
                  aria-hidden="true"
                />
                <DitherVeil
                  src="/metallic-head.jpg"
                  fit="contain"
                  pattern="floyd"
                  palette="duotone"
                  pixelSize={1}
                  levels={4}
                  contrast={1.2}
                  brightness={0.02}
                  revealRadius={180}
                  softness={0.8}
                  linger={1}
                  rim={0}
                  reverse={false}
                  wander={false}
                  clickBurst={false}
                  inkColor="#000000"
                  paperColor="#f4f1ea"
                  rimColor="#a78bfa"
                />
              </div>

              {/* Right Column: 3D Interactive Folder + View Full Resume Link */}
              <div className="about-folder-column">
                <div className="about-folder-stage">
                  <Folder
                    label="GOLDI.SONI"
                    color={theme === 'light' ? '#18181b' : '#202025'}
                    theme={theme}
                    paperColor="#ffffff"
                    tabPosition="right"
                    mode="flap"
                    variant="solid"
                    layout="spread"
                    size={1.65}
                    expandedScale={2.2}
                    open={isFolderOpen}
                    onOpenChange={(next) => setIsFolderOpen(next)}
                    closeOnOutsideClick={false}
                    openOn="click"
                    speed={0.8}
                    bounce={0.2}
                    draggable={true}
                    zoomOnClick={false}
                    peek={true}
                    intro={false}
                    items={ABOUT_DOCS}
                    onItemClick={(item, index) => {
                      setFocusedDocIndex(index);
                    }}
                  />
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* Section 3: Engineered Systems & Research Deck */}
        <section
          ref={workRef}
          id="work"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
            textAlign: 'center',
            padding: 'clamp(84px, 10vh, 104px) 24px clamp(56px, 7vh, 80px) 24px'
          }}
        >
          <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto', width: '100%', maxWidth: '1340px' }}>
            <div className="work-header-block">
              <h3 className="work-header-title">
                Proof of Work
              </h3>
            </div>

            {/* Interactive 3D CardSwap Deck */}
            <ProjectDeck isInView={isWorkInView} />
          </div>
        </section>

        {/* Section 3.1: Foundations & Experiment Archive (Interactive 3-Column Shredder) */}
        <FoundationsArchive />

        {/* Section 4: Contact Section (Strands takes center stage as the King) */}
        <section
          ref={contactRef}
          id="contact"
          style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            textAlign: 'right',
            padding: 'clamp(90px, 12vh, 140px) 0 clamp(60px, 8vh, 100px) 0',
            overflow: 'visible',
            backgroundColor: 'transparent'
          }}
        >
          {/* Main Content Stage: Left Animated Paper Airplane + Right Apple Contact Typography */}
          <div className="contact-main-row">
            <div className="contact-airplane-col">
              <img
                src="/man-flying-paper-airplane.svg"
                alt="Man flying on paper airplane"
                className="contact-airplane-svg"
              />
            </div>

            <div className="apple-contact-wrap">
              <h3 className="apple-siri-heading">
                Talk to a human.
                <span className="apple-siri-subline">While you still can.</span>
              </h3>

              {/* Subtle Text Social Links */}
              <div className="contact-subtle-links">
                <a
                  href="https://github.com/Grimroze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-subtle-link"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={13} className="subtle-link-arrow" />
                </a>
                <span className="contact-subtle-sep">/</span>
                <a
                  href="https://www.linkedin.com/in/goldi-soni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-subtle-link"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} className="subtle-link-arrow" />
                </a>
                <span className="contact-subtle-sep">/</span>
                <a
                  href="https://leetcode.com/u/grimrose/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-subtle-link"
                >
                  <span>LeetCode</span>
                  <ArrowUpRight size={13} className="subtle-link-arrow" />
                </a>
                <span className="contact-subtle-sep">/</span>
                <a
                  href="mailto:grimissher@gmail.com"
                  className="contact-subtle-link"
                >
                  <span>Email</span>
                  <ArrowUpRight size={13} className="subtle-link-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Exact React Bits LogoLoop Positioned Lower Down With Full Span & Zero Clutter */}
          <ConnectLoop />
        </section>
      </div>
    </div>
  );
}
