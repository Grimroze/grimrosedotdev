/**
 * knowledgeCorpus.js - High-Density Technical Knowledge Corpus
 * Grounded on Goldi Soni's verified Resume, Project READMEs, and Interview Architecture Notes.
 */

export const KNOWLEDGE_CORPUS = [
  // ==========================================
  // 1. SPECUEAG (ICLR 2025 Architecture)
  // ==========================================
  {
    id: 'specurag',
    category: 'projects',
    keywords: ['specurag', 'speculative', 'rag', 'iclr', 'draft', 'verify', 'drafter', 'verifier', 'rrf', 'lost in the middle'],
    intents: [
      'what is specurag', 'how does specurag work', 'explain specurag architecture',
      'speculative rag pipeline', 'tell me about specurag', 'why decoupled drafting'
    ],
    telemetry: 'CACHE HIT (1.8ms) • SpecuRAG Decoupled Mesh',
    action: { label: 'Jump to SpecuRAG in Deck', section: 'work' },
    diagram: `┌─────────────────────────────────────────────────────────────┐
│ SpecuRAG Architecture (ICLR 2025 Research Implementation)   │
│                                                             │
│ [Query Q] ──> [Dual-Channel Search: BM25 + nomic-embed]     │
│                         │                                   │
│                         ▼                                   │
│            [Reciprocal Rank Fusion (k=60)]                  │
│                         │                                   │
│                         ▼                                   │
│          [Dynamic Silhouette K-Means (k ∈ {2, 3})]          │
│                         │                                   │
│                         ▼                                   │
│         [Inverted Modulo Snake Allocation]                  │
│             ┌───────────┴───────────┐                       │
│             ▼                       ▼                       │
│     [Drafter 1: Llama 3B]   [Drafter 2: Llama 3B]           │
│             │                       │                       │
│             └───────────┬───────────┘                       │
│                         ▼ Passes (α, β) [~85% Compression]  │
│             [Verifier Judge: Llama-3.1-8B]                  │
│                         │                                   │
│                         ▼                                   │
│            [Joint Composite Scoring: ρ = Draft × SC × SR]   │
└─────────────────────────────────────────────────────────────┘`,
    intros: [
      "Here is the architectural breakdown of **SpecuRAG** straight from the ICLR 2025 research specs:",
      "Diving into **SpecuRAG** from first principles — where we decouple drafting from verification:",
      "TL;DR on **SpecuRAG**: Standard RAG has quadratic attention overhead and lost-in-the-middle bias; here is how we solved it:",
      "Pulling the verified telemetry from Goldi's **SpecuRAG** implementation:"
    ],
    variants: [
      `**SpecuRAG (Speculative RAG Engine)** is an asynchronous speculative decoding framework adapted for contextual RAG:

• **Decoupled Drafting & Verification**: Uses lightweight parallel **Llama-3.2-3B** instances to draft intermediate rationale $(\\beta)$ and answers $(\\alpha)$, while a central **Llama-3.1-8B** acts as a context-free verification judge.
• **Prompt Compression & Bias Removal**: By evaluating answer-rationale pairs without re-reading raw chunks, the verifier prompt shrinks by **~85%**, eliminating long-context attention degradation and *“lost-in-the-middle”* position bias.
• **Dual-Channel Retrieval Fusion**: Merges BM25 keyword matching with dense embeddings (\`nomic-embed-text\` in ChromaDB) fused via Reciprocal Rank Fusion (RRF, $k=60$).
• **Dynamic Semantic Partitioning**: K-Means clustering with unsupervised Silhouette-score $k$-selection ($k \\in \\{2, 3\\}$) and inverted modulo snake pairing balances evidence quality across drafters.`,

      `**Why SpecuRAG Beats Standard RAG**:

Standard RAG crams 10-15 raw document chunks into one massive prompt, causing quadratic self-attention cost and memory bloat. SpecuRAG splits execution into 5 clean phases:
1. **Hybrid Retrieval**: BM25 + dense ChromaDB lookup fused with scale-invariant RRF ($k=60$).
2. **Cluster & Snake Allocation**: K-Means groups chunks, snake pairing ($A[i] + B[m - 1 - i]$) ensures no single drafter gets starved of quality evidence.
3. **Async Parallel Drafting**: 3B drafters generate rationale before answer concurrently via \`asyncio.gather()\`.
4. **Context-Free Verification**: 8B judge evaluates candidate pairs via joint probability: $\\rho = \\rho_{\\text{Draft}} \\times \\rho_{\\text{SC}} \\times \\rho_{\\text{SR}}$ (Self-Consistency × Self-Reflection).
5. **Adaptive Gating**: Selects top draft if score delta $\\Delta \\rho \\ge 0.15$ and delivers polished conversational output.`,

      `**SpecuRAG Core Metrics & Grounding**:

• **Latency Reduction**: Cuts end-to-end token generation latency by up to **60%** compared to standard naive 8B RAG.
• **Context Compression Ratio**: **~85% compression** achieved on the verifier input.
• **Stack**: Python, Ollama, ChromaDB, BM25Okapi, Scikit-learn, AsyncIO, Streamlit.
• **Key File**: \`src/pipeline.py\` orchestrating Phase 1 through Phase 5 with millisecond phase telemetry.`
    ],
    outros: [
      "You can inspect the interactive sliding cards in the **03 / Systems** deck or view the source on GitHub.",
      "Goldi designed this to prove that smart algorithmic partitioning beats throwing raw context at giant models.",
      "Ask me about the snake pairing logic or how RRF $k=60$ was chosen if you want to go deeper."
    ]
  },

  // ==========================================
  // 2. AEGISGATEWAY (NomNom)
  // ==========================================
  {
    id: 'aegisgateway',
    category: 'projects',
    keywords: ['aegis', 'aegisgateway', 'nomnom', 'gateway', 'proxy', 'rate limiter', 'semantic cache', 'bge', 'polarity', 'circuit breaker'],
    intents: [
      'what is aegisgateway', 'explain aegisgateway', 'what is nomnom', 'tell me about aegis gateway',
      'how does the semantic cache work', 'sliding window rate limiter', 'lexical polarity guard'
    ],
    telemetry: 'CACHE HIT (1.4ms) • Aegis Polarity Guard',
    action: { label: 'Explore Systems Deck', section: 'work' },
    diagram: `┌─────────────────────────────────────────────────────────────┐
│ AegisGateway Architecture: Resilient Distributed LLM Gateway│
│                                                             │
│ [Client Request] ──> [FastAPI Reverse Proxy]                │
│                            │                                │
│                            ▼                                │
│     [Sliding-Window Log Rate Limiter (Redis ZSET, ~1ms)]    │
│                            │ (If Quota OK)                  │
│                            ▼                                │
│     [Two-Stage Semantic Cache: BGE-small (384-dim)]         │
│                            │                                │
│             ┌──────────────┴──────────────┐                 │
│             ▼                             ▼                 │
│    [Cache Hit: ~14ms]            [Lexical Polarity Guard]   │
│    (99.3% p95 Latency Drop)      (O(1) Negation Filter)     │
│                                           │                 │
│                                           ▼ (On Miss)       │
│                  [Distributed Circuit Breaker in Redis]     │
│                         ┌─────────────────┴───────────────┐ │
│                         ▼                                 ▼ │
│              [Primary: Llama 3.1 Local]       [Backup: Gemma]│
└─────────────────────────────────────────────────────────────┘`,
    intros: [
      "Here is the architecture behind **AegisGateway (NomNom)**, engineered for resilient distributed LLM traffic:",
      "Diving into **AegisGateway** — designed to solve upstream LLM outages, rate burst spikes, and negation hallucinations:",
      "Pulling the verified telemetry from the **AegisGateway** distributed proxy:"
    ],
    variants: [
      `**AegisGateway (Resilient Distributed LLM Gateway)** is a high-throughput LLM reverse proxy in **FastAPI and Redis**:

• **Sliding-Window Log Rate Limiter**: Uses Redis Sorted Sets (\`ZSET\`) inside atomic pipelines to eliminate boundary burst spikes with **~1ms pipeline execution overhead**.
• **Two-Stage Polarity-Safe Semantic Caching**: Employs \`BGE-small-en-v1.5\` (384-dimensional normalized embeddings) with an **$O(1)$ Lexical Polarity Guard** (set intersection of negation tokens like *not, no, never*) to stop negation false-positives.
• **99.3% Latency Drop**: Slashes cache-hit p95 latency from **2140ms down to 14ms** by bypassing upstream model inference entirely.
• **Zero-Downtime Circuit Breaker**: Distributed circuit breaker in Redis monitors error thresholds, automatically failing over from degraded local endpoints (Llama 3.1) to backup cloud models (Gemma).`,

      `**The Technical Breakthrough in AegisGateway**:

1. **Why Bi-Encoders Fail on Negation**: Embedding models assign low weight to negation tokens, so *"how to install docker"* and *"how to NOT install docker"* score >0.88 cosine similarity. AegisGateway's $O(1)$ Polarity Guard inspects query sets and rejects mismatched negations before serving cached payloads.
2. **Atomic Rate Limiting**: Unlike fixed windows that allow 2x bursts at boundaries, AegisGateway uses Redis Sorted Sets with timestamps as score and member, running \`ZREMRANGEBYSCORE\` + \`ZCARD\` atomically.
3. **Cache Expiration**: Responses stored in Redis Hashes with a 3600-second TTL and sub-10ms embedding generation.`,

      `**AegisGateway Benchmarks & Specs**:

• **Stack**: FastAPI, Redis (ZSET, Hashes), Docker, LangChain, BGE-small-en-v1.5, Llama 3.1, Gemma.
• **Cache Hit Latency**: **14ms p95** (vs 2140ms baseline cold inference).
• **Pipeline Overhead**: **~1ms** Redis pipeline execution for rate checking.
• **Resilience**: Zero-downtime failover with automated state tracking across distributed nodes.`
    ],
    outros: [
      "Goldi architected this to prove low-latency infrastructure requires clean algorithmic data structures, not just API wrappers.",
      "Check out the Systems section to see how AegisGateway fits into Goldi's distributed backend focus."
    ]
  },

  // ==========================================
  // 3. AUTODATA (Adversarial QA Generator)
  // ==========================================
  {
    id: 'autodata',
    category: 'projects',
    keywords: ['autodata', 'adversarial', 'meta fair', 'weak strong', 'challenger', 'judge', 'crag', 'dataset', 'synthetic'],
    intents: [
      'what is autodata', 'explain autodata', 'tell me about autodata', 'adversarial dataset generator',
      'weak strong evaluation', 'challenger solver judge'
    ],
    telemetry: 'CACHE HIT (2.2ms) • Adversarial Graph State',
    action: { label: 'Explore Systems Deck', section: 'work' },
    diagram: `┌─────────────────────────────────────────────────────────────┐
│ AutoData Architecture: Adversarial QA Dataset Generator     │
│ (Inspired by Meta FAIR Autodata Research)                   │
│                                                             │
│ [Raw Docs] ──> [ChromaDB FastEmbed] ──> [Topic Extractor]   │
│                                                │            │
│                                                ▼            │
│      [Corrective RAG (CRAG) Evaluator + Query Rewriter]     │
│                                                │            │
│                                                ▼            │
│                     [Challenger Agent Node]                 │
│              (Generates Multi-Hop Question + Rubric)        │
│                                │                            │
│                 ┌──────────────┴──────────────┐             │
│                 ▼                             ▼             │
│   [Weak Solver: Llama 3.1 8B]   [Strong Solver: Gemma 31B]  │
│                 │                             │             │
│                 └──────────────┬──────────────┘             │
│                                ▼                            │
│                     [Judge Agent Node]                      │
│             (Rubric-Based Scoring across Criteria)          │
│                                │                            │
│                 ┌──────────────┴──────────────┐             │
│                 ▼                             ▼             │
│       [Loop Refinement (≤5)]      [Verified JSON Dataset]   │
│       (If Weak >50% or Strong <70%)(Weak ≤50% & Strong ≥70%)│
└─────────────────────────────────────────────────────────────┘`,
    intros: [
      "Here is the architecture behind **AutoData**, Goldi's adversarial multi-agent synthetic data generator:",
      "Breaking down **AutoData** (inspired by Meta FAIR's research on autonomous dataset synthesis):",
      "Pulling the verified telemetry from the **AutoData** Challenger-Solver-Judge loop:"
    ],
    variants: [
      `**AutoData (Adversarial QA Dataset Generator)** is an autonomous multi-agent pipeline built on **LangGraph, DeepEval, and ChromaDB**:

• **Meta FAIR-Inspired**: Autonomously produces multi-hop reasoning QA datasets for fine-tuning without manual human authoring.
• **Weak-Strong Evaluation Loop**: Pits a Weak Solver (**Llama-3.1-8B**) against a Strong Solver (**Gemma-31B**), enforcing a strict **20+ point benchmark gap** (\`Weak ≤ 50%\` and \`Strong ≥ 70%\`). If the weak model solves it, the question is too easy; if the strong model fails, it's ungrounded.
• **Corrective RAG (CRAG)**: Evaluates retrieval depth dynamically and rewrites queries up to 4 times if initial document context is shallow.
• **Cyclic Difficulty Scaling**: Features up to **5 automated refinement loops** with end-to-end **LangSmith distributed tracing** across a Challenger-Solver-Judge topology.`,

      `**How the AutoData LangGraph State Machine Works**:

1. **Topic Extraction**: Samples raw text chunks from ChromaDB and isolates core non-trivial themes.
2. **CRAG Retrieval**: Queries candidate chunks; if reasoning depth is insufficient, the evaluator rewrites the query and loops back.
3. **Challenger Agent**: Synthesizes a multi-hop question, reference answer, and weighted rubric criteria (-5 to +5).
4. **Parallel Solvers**: Llama 3.1 8B and Gemma 31B execute the question concurrently under strict context bounds.
5. **Judge Evaluation**: Grades both solvers. If the gap condition fails, diagnostic feedback loops back to Challenger for difficulty scaling.
6. **Dataset Persistence**: Validated multi-hop pairs export directly to \`output/synthetic_dataset.json\`.`,

      `**AutoData Engineering Specs**:

• **Stack**: LangGraph, DeepEval, Ollama, ChromaDB, FastEmbed, LangSmith Tracing.
• **Core Loop**: Challenger -> Parallel Solvers (Weak/Strong) -> Judge -> Conditional Router.
• **Max Retries**: 5 difficulty-scaling cycles per dataset point.
• **Observability**: \`@traceable\` spans on all agent nodes for token and latency inspection.`
    ],
    outros: [
      "This architecture guarantees synthetic fine-tuning datasets are never trivial or hallucinatory.",
      "Ask me about how the CRAG query rewriting works if you want to explore the graph nodes."
    ]
  },

  // ==========================================
  // 4. DECMAS (pip install decmas)
  // ==========================================
  {
    id: 'decmas',
    category: 'projects',
    keywords: ['decmas', 'demas', 'pypi', 'pip install decmas', 'agent', 'multi-agent', 'topology', 'delm', 'stanford', 'p2p'],
    intents: [
      'what is decmas', 'tell me about decmas', 'pip install decmas', 'explain decmas architecture',
      'multi agent framework', 'stanford delm'
    ],
    telemetry: 'CACHE HIT (1.9ms) • PyPI Registry Hash',
    action: { label: 'View decmas on PyPI', url: 'https://pypi.org/project/decmas/' },
    diagram: `┌─────────────────────────────────────────────────────────────┐
│ DeMAS Architecture: pip install decmas (PyPI Package)       │
│ (Inspired by Stanford DeLM Research)                        │
│                                                             │
│ [User Goal] ──> [DemasOrchestrator] ──> [LLM Planner]       │
│                                                │            │
│                                                ▼            │
│        [Thread-Safe TaskQueue with Concurrency Lock]        │
│              (Topological Dependency Resolver)              │
│                                │                            │
│                 ┌──────────────┼──────────────┐             │
│                 ▼              ▼              ▼             │
│            [Worker 1]     [Worker 2]     [Worker 3]         │
│           (Thread OS)    (Thread OS)    (Thread OS)         │
│                 │              │              │             │
│                 └──────────────┼──────────────┘             │
│                                ▼                            │
│       [Admission Gate: LLM-as-a-Verifier Layer]             │
│      (Checks strict entailment before state write)          │
│                                │                            │
│                                ▼                            │
│           [VerifiedSharedContext (Blackboard Memory)]       │
└─────────────────────────────────────────────────────────────┘`,
    intros: [
      "Here is the breakdown of **decmas**, Goldi's published multi-agent package on PyPI:",
      "Diving into **pip install decmas** — decentralized multi-agent orchestration without router bottlenecks:",
      "Pulling the architecture telemetry from **decmas v0.1.1** on PyPI:"
    ],
    variants: [
      `**pip install decmas (DeMAS)** is an open-source decentralized multi-agent orchestration framework authored and maintained by Goldi on **PyPI**:

• **Stanford DeLM-Inspired**: Resolves synchronous *"Router-Agent bottlenecks"* by replacing per-step centralized dispatch with an autonomous pull-based task queue.
• **LLM-as-a-Verifier Layer**: Enforces admission-time validation on all incoming agent claims against raw evidence, preventing cascading hallucinations where corrupted outputs mislead downstream agents.
• **Asynchronous Concurrency**: Built with thread-safe task queues under \`threading.Lock()\` with topological dependency resolution, cutting redundant roundtrips by **50%**.
• **Production Package**: Published on PyPI with modular abstractions, Pydantic type validation (\`Task\`, \`ContextUpdate\`), and blackboard memory patterns.`,

      `**How decmas Works Internally**:

1. **Goal Breakdown**: Orchestrator queries planner LLM to decompose high-level goals into a Directed Acyclic Graph (DAG) of tasks.
2. **Task Queue**: In-memory thread-safe queue evaluates task dependencies via \`get_ready_task()\`.
3. **Autonomous Worker Nodes**: Worker OS threads pull ready tasks independently, query local models, and produce a claim with supporting evidence.
4. **Admission Gate**: \`VerifiedSharedContext.propose_update()\` validates that the evidence strictly entails the claim before appending it to shared memory.
5. **State Convergence**: Tasks mark completed, unblocking dependencies until the final goal state evaluates to true.`,

      `**decmas Package Specs**:

• **Installation**: \`pip install decmas\`
• **Current Version**: 0.1.1 on PyPI
• **Core Files**: \`models.py\` (Pydantic contracts), \`task_queue.py\` (mutex-locked queue), \`shared_context.py\` (verified blackboard memory), \`worker_node.py\` (autonomous threads).`
    ],
    outros: [
      "You can install it right now using `pip install decmas` or inspect the repo on GitHub.",
      "Ask me about how the LLM-as-a-Verifier prevents cascading hallucinations if you want the details."
    ]
  },

  // ==========================================
  // 5. RESUME & BACKGROUND (DTU & Outlier AI)
  // ==========================================
  {
    id: 'bio-overview',
    category: 'bio',
    keywords: ['who', 'goldi', 'about', 'bio', 'introduction', 'background', 'dtu', 'college', 'degree', 'cgpa', 'education'],
    intents: [
      'who is goldi', 'about goldi', 'tell me about yourself', 'what is your background',
      'which college', 'dtu degree', 'education details', 'resume overview'
    ],
    telemetry: 'CACHE HIT (1.2ms) • Verified Dossier Hash',
    action: { label: 'Open Overview Dossier', section: 'about', docIndex: 0 },
    intros: [
      "Here is the verified dossier profile on **Goldi Soni**:",
      "Compiling runtime telemetry for **Goldi Soni**:",
      "TL;DR on Goldi's background and engineering rigor:"
    ],
    variants: [
      `**Goldi Soni** is an **AI Systems & Model Evaluation Engineer** and final-year Computer Science undergraduate at **Delhi Technological University (DTU '27)**.

• **Academic Rigor**: B.Tech in CS at DTU (CGPA 7.65, Roll: 23/CS/158). School of Excellence Khichripur (Class XII: 93.4%, Class X: 91.6%).
• **Current Role**: AI Coding & Model Evaluator (Freelance) at **Outlier AI (Scale AI)**, benchmarking frontier LLMs and authoring adversarial test suites.
• **Core Systems**: Author of **SpecuRAG** (ICLR '25 speculative RAG), **AegisGateway** (FastAPI/Redis reverse proxy), **AutoData** (adversarial multi-agent dataset generator), and **decmas** on PyPI.
• **Algorithmic Rank**: **LeetCode Knight (Rating 1900+, Top 3% globally)** with **1,200+ solved problems** in C++.`,

      `**Goldi Soni — Profile Summary**:

• **Identity**: Systems thinker, competitive programmer, and model evaluation specialist based in New Delhi, India.
• **Education**: Delhi Technological University (DTU '27) — Computer Science.
• **Philosophy**: *“Overfitting on first principles, underfitting on sleep.”* Translates low-level algorithmic discipline into sub-15ms AI inference pipelines and resilient caching systems.
• **Contact**: [grimissher@gmail.com](mailto:grimissher@gmail.com) • [LinkedIn](https://www.linkedin.com/in/goldi-soni/) • [GitHub](https://github.com/Grimroze)`
    ],
    outros: [
      "Feel free to click below to open the complete academic dossier or download the resume PDF.",
      "Ask me about any specific project or LeetCode stats for deeper technical verification."
    ]
  },

  // ==========================================
  // 6. OUTLIER AI & RLHF WORK
  // ==========================================
  {
    id: 'outlier-rlhf',
    category: 'experience',
    keywords: ['outlier', 'scale', 'scale ai', 'rlhf', 'evaluator', 'alignment', 'freelance', 'job', 'work experience', 'model eval', 'adversarial'],
    intents: [
      'outlier ai experience', 'what do you do at outlier', 'scale ai work',
      'rlhf alignment experience', 'model evaluation role'
    ],
    telemetry: 'CACHE HIT (1.5ms) • RLHF Evaluation Cluster',
    action: { label: 'View Overview in Dossier', section: 'about', docIndex: 0 },
    intros: [
      "Here is the breakdown of Goldi's model evaluation and RLHF work at **Outlier AI (Scale AI)**:",
      "Pulling verified experience records from **Outlier AI** (June 2026 - Present):",
      "Diving into the RLHF alignment and adversarial benchmarking work:"
    ],
    variants: [
      `At **Outlier AI (Scale AI)**, Goldi works as an **AI Coding & Model Evaluator (Freelance)**:

• **Algorithmic Evaluation**: Evaluates AI-generated code completions across **Python and C++** for time/space complexity, algorithmic correctness, and edge-case resilience.
• **Rubric-Based RLHF Alignment**: Benchmarks multi-model outputs against strict criteria for instruction compliance, logic soundness, and hallucination reduction.
• **Adversarial Stress-Testing**: Authors detailed technical rationales and designs adversarial test inputs to isolate failure modes, optimize reasoning chains, and assist LLM fine-tuning pipelines.`,

      `**Key Highlights from Outlier AI (Scale AI)**:

• **Focus**: Reinforcement Learning from Human Feedback (RLHF), reasoning chain optimization, and code soundness.
• **Technologies Tested**: Multi-model frontier LLMs, Python, C++, custom evaluation rubrics.
• **Impact**: Helps training and alignment teams identify deceptive completions, subtle memory leaks, and edge-case algorithmic bugs before model deployment.`
    ],
    outros: [
      "This practical alignment work directly influenced the weak-strong judge loop in AutoData and the verifier in SpecuRAG.",
      "Ask me about how Goldi tests for edge-case resilience if you're curious about the evaluation methodology."
    ]
  },

  // ==========================================
  // 7. LEETCODE & COMPETITIVE PROGRAMMING
  // ==========================================
  {
    id: 'leetcode-dsa',
    category: 'arsenal',
    keywords: ['leetcode', 'knight', 'rating', 'dsa', 'competitive', 'programming', 'c++', 'cses', 'gfg', 'algorithms', 'solved'],
    intents: [
      'what is your leetcode rating', 'leetcode stats', 'competitive programming',
      'dsa experience', 'how many problems solved', 'knight badge'
    ],
    telemetry: 'CACHE HIT (1.3ms) • Algorithmic Rigor Cache',
    action: { label: 'View LeetCode Profile', url: 'https://leetcode.com/u/grimrose/' },
    intros: [
      "Here are the verified algorithmic competitive programming credentials:",
      "Accessing Goldi's algorithmic telemetry & contest history:",
      "TL;DR on the algorithmic rigor behind the code:"
    ],
    variants: [
      `**LeetCode & Algorithmic Rigor**:

• **Knight Badge**: **LeetCode Knight (Rating 1900+)**, placing Goldi in the **Top 3% globally**.
• **1,200+ Solved Problems**: Across LeetCode, CSES Problem Set, and GeeksforGeeks.
• **Core Language**: **C++** (STL, explicit memory management, strict $O(N)$ and $O(\\log N)$ time/space bounds).
• **Core Domains**: Dynamic Programming, Segment Trees, Graph Algorithms (Dijkstra, Tarjan's SCC, Bipartite), Trie structures, and sliding-window mechanics.
• **Systems Philosophy**: This zero-overhead algorithmic foundation directly powers Goldi's low-latency semantic caching and distributed rate limiters.`,

      `**Why Competitive Programming Matters for AI Systems**:

Goldi doesn't treat LeetCode as interview prep; it's the foundation for high-throughput AI engineering:
• The **sliding-window rate limiter in AegisGateway** is built on Redis Sorted Sets using exact $O(\\log N)$ time window math.
• The **K-Means snake allocation in SpecuRAG** uses an inverted modulo pairing technique inspired by classic competitive programming load-balancing problems.
• 1,200+ problems solved in C++ ensures every system is written with strict respect for cache locality and memory allocations.`
    ],
    outros: [
      "You can verify the live Knight badge directly on LeetCode: leetcode.com/u/grimrose/",
      "Ask me about any specific algorithm (DP, graphs, segment trees) if you want to test the depth."
    ]
  },

  // ==========================================
  // 8. TECHNICAL ARSENAL & SKILLS
  // ==========================================
  {
    id: 'tech-stack',
    category: 'arsenal',
    keywords: ['tech', 'stack', 'skills', 'languages', 'tools', 'frameworks', 'technologies', 'backend', 'arsenal', 'database'],
    intents: [
      'what is your tech stack', 'skills', 'languages and frameworks',
      'what technologies do you use', 'backend skills', 'ai tools'
    ],
    telemetry: 'CACHE HIT (1.6ms) • Arsenal Graph',
    action: { label: 'Open Technical Arsenal Doc', section: 'about', docIndex: 1 },
    intros: [
      "Here is Goldi's verified production technology stack:",
      "Compiling the technical arsenal from the engineering dossier:",
      "Diving into the languages, systems, and AI tools in Goldi's workflow:"
    ],
    variants: [
      `**Technical Arsenal & Production Stack**:

• **Core Languages**: Python, C++, SQL.
• **GenAI & Evaluation**: LangGraph, LangChain, DeepEval, G-Eval, RAG / Corrective RAG (CRAG), Semantic Caching, ChromaDB, FAISS, Ollama, nomic-embed-text, BGE-small.
• **Backend & Distributed Systems**: FastAPI, Redis (ZSET, Hashes, Pipelines), PostgreSQL, Docker, REST APIs, Microservices Architecture.
• **Developer Tools & Observability**: Git, GitHub, LangSmith, Pydantic, Streamlit, Supabase.
• **Core CS Fundamentals**: Operating Systems, Database Management Systems (DBMS), Computer Networks, Object-Oriented Programming (OOP).`,

      `**How Goldi Uses His Stack in Production**:

• **Python & AsyncIO**: For building asynchronous multi-agent topologies (decmas), RAG pipelines (SpecuRAG), and LangGraph state machines (AutoData).
• **C++**: For low-level competitive programming (1900+ LeetCode rating) and performance-critical algorithms.
• **FastAPI + Redis**: For microservices, distributed rate-limiting (ZSET sliding window), and sub-15ms semantic caching layers (AegisGateway).`
    ],
    outros: [
      "Click below to inspect the interactive Technical Arsenal document in the dossier.",
      "Notice there are no buzzword filler libraries here — every tool is grounded in actual project repositories."
    ]
  },

  // ==========================================
  // 9. RESUME DOWNLOAD & CONTACT
  // ==========================================
  {
    id: 'contact-hire',
    category: 'connect',
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'github', 'talk', 'message', 'phone', 'location'],
    intents: [
      'how can i contact you', 'hire goldi', 'email address', 'linkedin profile',
      'github', 'phone number', 'where are you located'
    ],
    telemetry: 'CACHE HIT (0.8ms) • Connect Endpoint',
    action: { label: 'Jump to Connect Section', section: 'contact' },
    intros: [
      "Here are the direct signals and contact coordinates for Goldi Soni:",
      "Connecting you with Goldi's verified channels:",
      "Ready to collaborate? Here is how to reach out directly:"
    ],
    variants: [
      `**Direct Signals & Contact Information**:

• **Email**: [grimissher@gmail.com](mailto:grimissher@gmail.com)
• **Phone**: +91-8527302147
• **LinkedIn**: [linkedin.com/in/goldi-soni](https://www.linkedin.com/in/goldi-soni/)
• **GitHub**: [github.com/Grimroze](https://github.com/Grimroze)
• **LeetCode**: [leetcode.com/u/grimrose](https://leetcode.com/u/grimrose/)
• **Portfolio**: [grimdotdev.vercel.app](https://grimdotdev.vercel.app/)
• **Base**: New Delhi, India (Delhi Technological University)`
    ],
    outros: [
      "Feel free to drop an email or reach out on LinkedIn for AI systems or model evaluation opportunities.",
      "Response time is usually fast — unless he's currently deep in a contest or debugging loss curves."
    ]
  },

  {
    id: 'resume-cv',
    category: 'bio',
    keywords: ['resume', 'cv', 'pdf', 'download', 'profile', 'paper'],
    intents: ['can i see your resume', 'download cv', 'resume pdf', 'view resume'],
    telemetry: 'CACHE HIT (1.1ms) • Verified PDF Hash',
    action: { label: 'Download Resume (PDF)', url: '/resume.pdf' },
    intros: [
      "Here is Goldi's verified engineering resume:",
      "Accessing the official 2026 engineering resume PDF:"
    ],
    variants: [
      `**Goldi Soni — Verified Engineering Resume**:

• **Institution**: Delhi Technological University (DTU '27), B.Tech in Computer Science.
• **Experience**: Outlier AI (Scale AI) — AI Coding & Model Evaluator (June 2026 - Present).
• **Projects**: AegisGateway (FastAPI/Redis), SpecuRAG (ICLR '25), AutoData (LangGraph), decmas (PyPI).
• **Achievements**: LeetCode Knight (Top 3%), 1200+ solved problems, HACKJMI Finalist.
• Click the action pill below to inspect or download the complete PDF.`
    ],
    outros: [
      "The resume contains full metric justifications for all four major systems."
    ]
  },

  // ==========================================
  // 10. GENERAL AI & SYSTEMS CONCEPTS
  // ==========================================
  {
    id: 'speculative-decoding-concept',
    category: 'concepts',
    keywords: ['speculative decoding', 'how does speculative decoding work', 'draft model', 'verification model', 'speedup', 'speculative'],
    intents: ['what is speculative decoding', 'explain speculative decoding', 'how does draft and verify work'],
    telemetry: 'CACHE HIT (1.7ms) • Systems Theory Node',
    action: { label: 'Explore SpecuRAG in Deck', section: 'work' },
    intros: [
      "Here is an intuitive, first-principles explanation of **Speculative Decoding**:",
      "Breaking down the math and mechanics behind Speculative Decoding:"
    ],
    variants: [
      `**Speculative Decoding Explained from First Principles**:

Standard autoregressive LLM generation predicts one token at a time: to generate 50 tokens, an 8B or 70B model must run 50 sequential forward passes, creating a massive memory-bandwidth bottleneck.

**The Speculative Solution**:
1. **Drafting (Fast & Cheap)**: A small, lightweight model (e.g. \`Llama-3.2-3B\`) speculatively drafts $K$ tokens in parallel at very high speed.
2. **Verification (Parallel & Exact)**: The large, aligned model (e.g. \`Llama-3.1-8B\`) evaluates all $K$ candidate tokens simultaneously in a **single forward pass**.
3. **Acceptance Criterion**: Any tokens accepted by the verifier are kept; the first rejected token triggers a correction.

**Why it matters**: Because verification of $K$ tokens takes roughly the same GPU memory-bandwidth time as generating a single token, you achieve **2x to 3x speedups** with mathematical equivalence to sampling from the large model directly. In **SpecuRAG**, Goldi adapted this concept for contextual RAG!`
    ],
    outros: [
      "Ask me how SpecuRAG applies this to document chunks without re-reading raw text!"
    ]
  },

  {
    id: 'why-cpp-concept',
    category: 'concepts',
    keywords: ['why c++', 'why not python', 'c++ in ai', 'c++ vs python', 'memory management', 'cache locality'],
    intents: ['why do you use c++', 'why c++ for ai', 'why c++ over python'],
    telemetry: 'CACHE HIT (1.4ms) • Low-Level Systems Node',
    action: { label: 'View LeetCode Profile', url: 'https://leetcode.com/u/grimrose/' },
    intros: [
      "Here is why Goldi writes performance-critical code in **C++**:",
      "Diving into the C++ vs Python trade-off in modern AI engineering:"
    ],
    variants: [
      `**Why C++ Matters in Modern AI Infrastructure**:

Python is great for orchestration (LangChain, FastAPI, training scripts), but when latency drops to sub-15ms:
1. **Zero-Overhead Memory Layout**: C++ gives exact control over stack vs heap allocations, cache locality, and pointer arithmetic without Python's GIL or garbage collector pauses.
2. **Inference Runtimes**: Production inference engines (vLLM, llama.cpp, TensorRT-LLM) are compiled in C++ and CUDA kernels.
3. **Algorithmic Discipline**: Solving 1,200+ problems in C++ forces you to design systems with strict $O(1)$ or $O(\\log N)$ spatial and temporal guarantees, directly inspiring the sliding-window ZSET rate limiter in AegisGateway.`
    ],
    outros: [
      "As the saying goes: *Python drafts the prototype, C++ runs the high-frequency cluster.*"
    ]
  },

  {
    id: 'rag-vs-finetuning',
    category: 'concepts',
    keywords: ['rag vs fine tuning', 'rag vs finetune', 'when to rag', 'when to fine tune', 'retrieval vs training'],
    intents: ['rag vs fine tuning', 'when should i use rag vs fine-tuning', 'difference between rag and fine tuning'],
    telemetry: 'CACHE HIT (1.9ms) • AI Architecture Node',
    action: { label: 'Explore Systems Deck', section: 'work' },
    intros: [
      "Here is the practical, production perspective on **RAG vs Fine-Tuning**:"
    ],
    variants: [
      `**RAG vs Fine-Tuning: The Systems Engineering Reality**:

• **RAG (Dynamic Knowledge & Grounding)**:
  - Best for: Real-time dynamic knowledge, private enterprise docs, citeable facts, and zero retraining cost.
  - Failure Mode: Retrieval noise, lost-in-the-middle context bloat, and latency overhead.
  - Solution: Speculative RAG (like **SpecuRAG**) to decouple retrieval from verification.

• **Fine-Tuning (Style, Form & Reasoning)**:
  - Best for: Teaching a model a specific output syntax (e.g. JSON schema, Pydantic models), domain-specific jargon, or reasoning step patterns.
  - Failure Mode: Catastrophic forgetting, high training cost, and hallucinations when treated as a knowledge base.
  - Solution: Adversarial QA generation (like **AutoData**) to train smaller models on multi-hop reasoning.

• **The Gold Standard**: Use **Fine-Tuning** for behavior and formatting, and **RAG** for fresh factual retrieval!`
    ],
    outros: [
      "Both SpecuRAG and AutoData exist because Goldi tested both sides of this equation in production."
    ]
  },

  // ==========================================
  // 11. PERSONALITY & HUMOR
  // ==========================================
  {
    id: 'coffee-quote',
    category: 'personality',
    keywords: ['coffee', 'black coffee', 'morning', 'quote', 'humor', 'loss curves', 'sleep'],
    intents: ['what is the coffee quote', 'black coffee quote', 'why black coffee', 'tell me a joke'],
    telemetry: 'CACHE HIT (1.1ms) • Sarcastic Pull-Quote',
    action: { label: 'Scroll to Hero Statement', section: 'home-statement' },
    intros: [
      "Direct from the hero pull-quote on the homepage:"
    ],
    variants: [
      `*“Sometimes I wonder how AI is going to make my morning black coffee... well, guess I should probably fine-tune a model for that too. Until then, I spend my hours taming loss curves, optimizing weights, and building intelligent systems that hallucinate a little less and solve real problems a little more.”* >_`
    ],
    outros: [
      "Fuel: Black espresso. Status: Overfitting on first principles, underfitting on sleep."
    ]
  },

  {
    id: 'claude-fun',
    category: 'personality',
    keywords: ['claude', 'anthropic', 'sonnet', 'opus', 'wish', 'deepseek', 'gpt-5'],
    intents: ['can i use claude', 'switch to claude', 'use claude 3.7', 'you wish'],
    telemetry: 'CACHE HIT (0.6ms) • Credit Safety Shield',
    intros: [
      "Token budget audit result:"
    ],
    variants: [
      `you wish !! 😂\n\nBro, this client cache runs at literal ₹0.00 cost with sub-15ms response latency. You're not burning Claude Opus tokens on a portfolio chat drawer!`
    ],
    outros: [
      "Try asking about SpecuRAG, decmas, or AegisGateway instead!"
    ]
  }
];
