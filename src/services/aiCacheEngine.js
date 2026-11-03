/**
 * aiCacheEngine.js - High-Performance Client-Side Semantic Cache Engine
 * Tier 0: Sarcastic Sentry (Jailbreak & Prompt Injection Defense)
 * Tier 1: Multi-Dimensional Semantic Intent Graph
 * Tier 2: Dynamic Variation Engine (Anti-Redundancy Combinatorics)
 * Tier 3: Sub-Intent Decomposition & Architecture Diagram Dispatch
 */

import { checkSecurity } from './sarcasticSentry.js';
import { KNOWLEDGE_CORPUS } from './knowledgeCorpus.js';
import { assembleDynamicResponse } from './dynamicVariator.js';

/**
 * Fast string tokenizer and stop-word stripper
 */
function tokenize(text) {
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'and', 'or', 'of',
    'for', 'to', 'with', 'about', 'can', 'you', 'tell', 'me', 'what',
    'your', 'how', 'does', 'do', 'i', 'my', 'are', 'was', 'were', 'it', 'its'
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !stopWords.has(t));
}

/**
 * Client-Side Semantic & Fuzzy Query Matcher
 */
export function querySemanticCache(rawQuery, sectionFilter = 'all') {
  const query = rawQuery.trim();

  if (!query) {
    return {
      hit: false,
      telemetry: 'CACHE MISS • Empty Input',
      response: "Please enter a question about Goldi's projects (SpecuRAG, AegisGateway, decmas, AutoData), algorithmic rigor, or technical stack."
    };
  }

  // ==========================================
  // TIER 0: Sarcastic Sentry (Security & Jailbreak Defense)
  // ==========================================
  const securityCheck = checkSecurity(query);
  if (securityCheck) {
    return securityCheck;
  }

  const queryLower = query.toLowerCase();
  const queryTokens = tokenize(queryLower);

  // ==========================================
  // TIER 1: Match Against Knowledge Corpus
  // ==========================================
  let scoredMatches = [];

  for (const entry of KNOWLEDGE_CORPUS) {
    let score = 0;

    // 1. Direct intent exact or strong substring match
    for (const intent of entry.intents) {
      if (queryLower.includes(intent) || intent.includes(queryLower)) {
        score += 0.90;
        break;
      }
    }

    // 2. Keyword token overlap (Jaccard-weighted)
    const entryKeywords = new Set(entry.keywords);
    let matchedCount = 0;

    for (const token of queryTokens) {
      if (entryKeywords.has(token)) {
        matchedCount += 1.0;
      } else {
        // Partial prefix or stem match
        for (const kw of entryKeywords) {
          if (kw.startsWith(token) || token.startsWith(kw)) {
            matchedCount += 0.75;
            break;
          }
        }
      }
    }

    const tokenScore = matchedCount / Math.max(1, queryTokens.length);
    score += tokenScore * 1.0;

    // 3. Direct identifier boost (exact project / core terms)
    if (entry.keywords.some(kw => queryLower.includes(kw))) {
      score += 0.35;
    }

    // 4. Section filter bonus
    if (sectionFilter !== 'all' && entry.category === sectionFilter) {
      score *= 1.30;
    }

    if (score >= 0.28) {
      scoredMatches.push({ entry, score });
    }
  }

  // Sort by highest score
  scoredMatches.sort((a, b) => b.score - a.score);

  // ==========================================
  // TIER 2 & 3: Match Resolution & Dynamic Assembly
  // ==========================================
  if (scoredMatches.length > 0) {
    const primary = scoredMatches[0].entry;
    const dynamicBody = assembleDynamicResponse(primary, query);

    // If query mentions two distinct topics (e.g., SpecuRAG + AegisGateway or decmas + LeetCode)
    if (scoredMatches.length > 1 && scoredMatches[1].score >= 0.55 && scoredMatches[1].entry.id !== primary.id) {
      const secondary = scoredMatches[1].entry;
      const secondaryBody = assembleDynamicResponse(secondary, query);

      return {
        hit: true,
        telemetry: `${primary.telemetry} + ${secondary.id.toUpperCase()}`,
        score: scoredMatches[0].score.toFixed(2),
        action: primary.action || secondary.action,
        response: `${dynamicBody}\n\n---\n\n### Cross-Referenced Architecture:\n\n${secondaryBody}`
      };
    }

    return {
      hit: true,
      telemetry: primary.telemetry,
      score: scoredMatches[0].score.toFixed(2),
      action: primary.action,
      response: dynamicBody
    };
  }

  // ==========================================
  // TIER 4: Smart Semantic Fallback (Grounded & Sarcastic)
  // ==========================================
  return generateIntelligentFallback(query);
}

/**
 * Generates an intelligent, context-aware fallback response
 * when a query doesn't match an exact knowledge node.
 */
function generateIntelligentFallback(rawQuery) {
  const q = rawQuery.toLowerCase();

  // If question is asking about coding/programming in general
  if (q.includes('code') || q.includes('python') || q.includes('c++') || q.includes('program')) {
    return {
      hit: false,
      telemetry: 'SPECULATIVE SYNTHESIS • Engineering Logic',
      action: { label: 'Explore Systems Deck', section: 'work' },
      response: `From Goldi's engineering philosophy:\n\n*“Code is not about how many lines you write; it's about algorithmic complexity and memory bounds.”*\n\nGoldi builds distributed systems primarily in **Python & AsyncIO** (for multi-agent topologies and RAG pipelines) and **C++** (for high-performance algorithms, LeetCode 1900+ Knight rating, and memory-critical caching).\n\nTo see this in action, ask about **AegisGateway's** Redis ZSET sliding-window rate limiter or **SpecuRAG's** decoupled drafting architecture!`
    };
  }

  // If question is asking about hiring or opportunities
  if (q.includes('hire') || q.includes('job') || q.includes('opportunity') || q.includes('work with') || q.includes('freelance')) {
    return {
      hit: true,
      telemetry: 'CACHE HIT (1.0ms) • Opportunity Router',
      action: { label: 'Get in Touch', section: 'contact' },
      response: `Goldi is actively interested in high-impact roles across **AI Systems, Model Evaluation (RLHF), and Distributed Backend Infrastructure**.\n\n• **Current Role**: AI Coding & Model Evaluator (Freelance) at **Outlier AI (Scale AI)**.\n• **Education**: B.Tech CS, **Delhi Technological University (DTU '27)**.\n• **Direct Signal**: [grimissher@gmail.com](mailto:grimissher@gmail.com) • [LinkedIn](https://www.linkedin.com/in/goldi-soni/).\n\nClick the action button below to jump straight to the connect section!`
    };
  }

  // Default intelligent portfolio grounding
  return {
    hit: false,
    telemetry: 'SPECULATIVE DRAFT (ICLR \'25) • Fallback Grounding',
    action: { label: 'Explore Systems Deck', section: 'work' },
    response: `Based on Goldi Soni's verified engineering dossier:\n\nGoldi Soni is an **AI Systems & Model Evaluation Engineer (DTU '27)** focused on:\n• **SpecuRAG**: ICLR '25 speculative RAG engine with 85% prompt compression.\n• **AegisGateway**: Distributed LLM reverse proxy with 99.3% cache latency reduction.\n• **AutoData**: Adversarial multi-agent QA dataset generator with CRAG.\n• **pip install decmas**: Decentralized multi-agent system on PyPI.\n• **LeetCode Knight (1900+)**: Top 3% globally with 1,200+ solved problems.\n\nFor questions about **"${rawQuery}"**, try asking about specific architecture details (e.g. *"Show SpecuRAG architecture"*, *"How does AegisGateway prevent negation hallucinations?"*, or *"Explain decmas task queue"*).`
  };
}
