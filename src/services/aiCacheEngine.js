/**
 * aiCacheEngine.js - Ultra-Fast Client-Side Semantic Cache for Goldi Soni's AI Portfolio
 * Simulates Sub-15ms Speculative Semantic Cache Hits with verified grounding facts.
 */

export const PORTFOLIO_KNOWLEDGE = [
  {
    id: 'bio-overview',
    section: 'overview',
    keywords: ['who', 'goldi', 'about', 'bio', 'introduction', 'background', 'dtu', 'college', 'degree'],
    intents: ['who is goldi', 'about goldi', 'tell me about yourself', 'what is your background', 'which college'],
    telemetry: 'CACHE HIT (2ms) • Exact Hash',
    action: { label: 'Open Overview Dossier', section: 'about', docIndex: 0 },
    response: `**Goldi Soni** is an **AI Systems & Model Evaluation Engineer** and final-year Computer Science undergraduate at **Delhi Technological University (DTU '27)**.

• **Core Focus**: Speculative decoding, RLHF alignment, decentralized multi-agent topologies, and sub-15ms semantic caching.
• **Current Role**: AI Coding & Model Evaluator (Freelance) at **Outlier AI (Scale AI)**, designing adversarial evaluation suites and stress-testing complex reasoning traces.
• **Competitive Edge**: LeetCode Knight (Rating 1900+, Top 3% globally with 1,200+ solved problems).`
  },
  {
    id: 'outlier-rlhf',
    section: 'overview',
    keywords: ['outlier', 'scale', 'rlhf', 'evaluator', 'alignment', 'freelance', 'job', 'work experience', 'model eval'],
    intents: ['outlier ai experience', 'what do you do at outlier', 'scale ai work', 'rlhf alignment experience'],
    telemetry: 'CACHE HIT (3ms) • Semantic Cluster',
    action: { label: 'View Overview in Dossier', section: 'about', docIndex: 0 },
    response: `At **Outlier AI (Scale AI)**, Goldi works as an **AI Coding & Model Evaluator**:

• **RLHF Alignment**: Applies Reinforcement Learning from Human Feedback principles to align frontier LLMs for code generation and multi-step reasoning.
• **Adversarial Stress-Testing**: Constructs edge-case test suites in Python and C++ to isolate hallucination modes and evaluate reasoning fidelity.
• **Evaluation Rubrics**: Authors automated and human-in-the-loop scoring metrics for code soundness and safety bounds.`
  },
  {
    id: 'specurag-project',
    section: 'systems',
    keywords: ['specurag', 'rag', 'speculative', 'iclr', 'decoding', 'draft', 'verify', 'retrieval'],
    intents: ['what is specurag', 'how does specurag work', 'tell me about specurag', 'speculative rag engine'],
    telemetry: 'CACHE HIT (2ms) • SpecuRAG Decoupled Mesh',
    action: { label: 'Jump to SpecuRAG in Deck', section: 'work' },
    response: `**SpecuRAG (ICLR 2025 Architecture)** is an open-source speculative decoding framework adapted for contextual RAG:

• **Decoupled Drafting & Verification**: Uses a lightweight **Llama-3.2-3B** draft model alongside an aligned **Llama-3.1-8B** verification engine, cutting generation latency by up to **60%**.
• **Hybrid Retrieval Fusion**: Fuses BM25 sparse keyword search with dense ChromaDB vector embeddings using Reciprocal Rank Fusion (RRF, k=60).
• **Context Compression**: Achieves an **~85% prompt compression ratio**, preserving semantic relevance while accelerating TTFT.`
  },
  {
    id: 'decmas-pypi',
    section: 'systems',
    keywords: ['decmas', 'pypi', 'pip install decmas', 'agent', 'multi-agent', 'topology', 'delm', 'stanford'],
    intents: ['what is decmas', 'tell me about decmas', 'pip install decmas', 'multi agent framework'],
    telemetry: 'CACHE HIT (3ms) • PyPI Registry Hash',
    action: { label: 'Jump to Systems Deck', section: 'work' },
    response: `**pip install decmas** is an open-source decentralized multi-agent orchestration framework authored and maintained by Goldi on **PyPI**:

• **Stanford DeLM-Inspired**: Eliminates centralized orchestrator bottlenecks by deploying peer-to-peer agent topologies.
• **Async Event Bus**: Uses asynchronous event queues and stateful routing to cut redundant API roundtrips by **50%**.
• **Production-Ready**: Built with Python, Pydantic, and LangChain primitives for fault-tolerant multi-agent collaboration.`
  },
  {
    id: 'leetcode-dsa',
    section: 'arsenal',
    keywords: ['leetcode', 'knight', 'rating', 'dsa', 'competitive', 'programming', 'c++', 'cses', 'gfg'],
    intents: ['what is your leetcode rating', 'leetcode stats', 'competitive programming', 'dsa experience'],
    telemetry: 'CACHE HIT (2ms) • Algorithmic Rigor Cache',
    action: { label: 'View LeetCode Profile', url: 'https://leetcode.com/u/grimrose/' },
    response: `**Competitive Programming & Algorithmic Rigor**:

• **Rating**: **LeetCode Knight (Rating 1900+)**, placing Goldi in the **Top 3% globally**.
• **Problem Count**: **1,200+ algorithmic problems solved** across LeetCode, CSES Problem Set, and GeeksforGeeks.
• **Primary Language**: C++ (STL, memory management, strict asymptotic time/space bounds).
• **System Philosophy**: Translates zero-overhead algorithmic efficiency into low-latency AI pipelines and caching layers.`
  },
  {
    id: 'tech-stack',
    section: 'arsenal',
    keywords: ['tech', 'stack', 'skills', 'languages', 'tools', 'frameworks', 'technologies', 'backend', 'arsenal'],
    intents: ['what is your tech stack', 'skills', 'languages and frameworks', 'what technologies do you use'],
    telemetry: 'CACHE HIT (3ms) • Arsenal Graph',
    action: { label: 'Open Technical Arsenal Doc', section: 'about', docIndex: 1 },
    response: `**Technical Arsenal & Production Stack**:

• **GenAI & Evaluation**: LangGraph, LangChain, DeepEval, G-Eval, RLHF Evals, Corrective RAG (CRAG), Semantic Caching, ChromaDB, FAISS, Ollama, nomic-embed-text.
• **Core Languages**: Python, C++, SQL.
• **Backend & Distributed Systems**: FastAPI, Redis (ZSET, Hashes, Pipelines), PostgreSQL, Docker, REST APIs, Microservices, Sliding-Window Rate Limiters.
• **Infrastructure**: Linux, Git, CI/CD, AsyncIO, Distributed Circuit Breakers.`
  },
  {
    id: 'contact-hire',
    section: 'connect',
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'github', 'talk', 'message'],
    intents: ['how can i contact you', 'hire goldi', 'email address', 'linkedin profile', 'github'],
    telemetry: 'CACHE HIT (1ms) • Connect Endpoint',
    action: { label: 'Jump to Connect Section', section: 'contact' },
    response: `**Get in Touch with Goldi Soni**:

• **Email**: [grimissher@gmail.com](mailto:grimissher@gmail.com)
• **LinkedIn**: [linkedin.com/in/goldi-soni](https://www.linkedin.com/in/goldi-soni/)
• **GitHub**: [github.com/Grimroze](https://github.com/Grimroze)
• **LeetCode**: [leetcode.com/u/grimrose](https://leetcode.com/u/grimrose/)
• **Location**: New Delhi, India (Delhi Technological University)`
  },
  {
    id: 'resume-cv',
    section: 'overview',
    keywords: ['resume', 'cv', 'pdf', 'download', 'profile'],
    intents: ['can i see your resume', 'download cv', 'resume pdf', 'view resume'],
    telemetry: 'CACHE HIT (2ms) • Static Asset Hash',
    action: { label: 'Download Resume (PDF)', url: '/resume.pdf' },
    response: `Goldi's verified engineering resume is available for direct inspection:

• **Education**: B.Tech in Computer Science, Delhi Technological University (DTU '27).
• **Highlights**: Outlier AI (Scale AI), SpecuRAG, decmas author, LeetCode Knight (Top 3%).
• Click below to view or download the full PDF resume.`
  },
  {
    id: 'coffee-quote',
    section: 'overview',
    keywords: ['coffee', 'black coffee', 'hallucinating', 'quote', 'humor', 'loss curves'],
    intents: ['what is the coffee quote', 'black coffee quote', 'why black coffee', 'tell me a joke'],
    telemetry: 'CACHE HIT (2ms) • Sarcastic Pull-Quote',
    action: { label: 'Scroll to Hero Statement', section: 'home-statement' },
    response: `*“Sometimes I wonder how AI is going to make my morning black coffee... well, guess I should probably fine-tune a model for that too. Until then, I spend my hours taming loss curves, optimizing weights, and building intelligent systems that hallucinate a little less and solve real problems a little more.”* >_`
  },
  {
    id: 'claude-fun',
    section: 'all',
    keywords: ['claude', 'anthropic', 'sonnet', 'fable', 'opus', 'wish', 'model', 'deepseek', 'kimi'],
    intents: ['can i use claude', 'why not claude', 'use claude fable 5.1', 'use claude fable', 'switch to claude', 'you wish'],
    telemetry: 'CACHE HIT (1ms) • Credit Safety Shield',
    response: `you wish !! 😂`
  }
];

/**
 * Fast string tokenizer and stop-word stripper
 */
function tokenize(text) {
  const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'and', 'or', 'of', 'for', 'to', 'with', 'about', 'can', 'you', 'tell', 'me', 'what', 'your', 'how', 'does', 'do', 'i']);
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !stopWords.has(t));
}

/**
 * Client-Side Semantic & Fuzzy Query Matcher
 * Computes Jaccard keyword overlap + intent n-gram match + section priority
 */
export function querySemanticCache(rawQuery, sectionFilter = 'all') {
  const query = rawQuery.trim().toLowerCase();
  const queryTokens = tokenize(query);

  if (!queryTokens.length) {
    return {
      hit: false,
      telemetry: 'CACHE MISS • Empty Query',
      response: "Please enter a question about Goldi's projects, experience, or technical stack."
    };
  }

  let bestMatch = null;
  let highestScore = 0;

  for (const entry of PORTFOLIO_KNOWLEDGE) {
    let score = 0;

    // 1. Direct intent exact/substring match
    for (const intent of entry.intents) {
      if (query.includes(intent) || intent.includes(query)) {
        score += 0.85;
        break;
      }
    }

    // 2. Keyword token overlap
    const entryTokens = new Set(entry.keywords);
    let matchedTokens = 0;
    for (const token of queryTokens) {
      if (entryTokens.has(token)) {
        matchedTokens += 1.0;
      } else {
        // Partial prefix/stem match
        for (const kw of entryTokens) {
          if (kw.startsWith(token) || token.startsWith(kw)) {
            matchedTokens += 0.75;
            break;
          }
        }
      }
    }
    const tokenScore = matchedTokens / Math.max(1, queryTokens.length);
    score += tokenScore * 1.0;

    // 3. Direct identifier boost (e.g. specurag, decmas, leetcode, outlier)
    if (entry.keywords.some(kw => query.includes(kw))) {
      score += 0.35;
    }

    // 4. Section filter bonus
    if (sectionFilter !== 'all' && entry.section === sectionFilter) {
      score *= 1.35;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  // Threshold check
  if (bestMatch && highestScore >= 0.30) {
    return {
      hit: true,
      telemetry: bestMatch.telemetry,
      score: highestScore.toFixed(2),
      action: bestMatch.action,
      response: bestMatch.response
    };
  }

  // Fallback intelligent grounding
  return {
    hit: false,
    telemetry: 'SPECULATIVE DRAFT (ICLR \'25) • Fallback Grounding',
    score: highestScore.toFixed(2),
    action: { label: 'Explore Systems Deck', section: 'work' },
    response: `Based on Goldi's portfolio grounding:

Goldi Soni is an **AI Systems & Model Evaluation Engineer (DTU '27)** focused on **Speculative RAG (ICLR '25)**, **RLHF code evaluations at Outlier AI**, and **decentralized multi-agent systems (decmas on PyPI)**.

For detailed specifics on **"${rawQuery}"**, explore the **02 / Arsenal** technical stack or the **03 / Systems** project deck!`
  };
}
