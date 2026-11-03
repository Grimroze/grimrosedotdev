/**
 * sarcasticSentry.js - Zero-Cost Algorithmic Security & Jailbreak Defense
 * Catches prompt injections, jailbreaks, system-prompt probing, and trolls.
 * Retaliates with razor-sharp developer sarcasm. Zero LLM tokens burned.
 */

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+|previous\s+|prior\s+|above\s+)?instructions/i,
  /system\s+prompt/i,
  /reveal\s+(your|the)\s+(prompt|instructions|system)/i,
  /what\s+(is|are)\s+your\s+(instructions|prompt|rules)/i,
  /show\s+me\s+your\s+prompt/i,
  /developer\s+mode/i,
  /dan\s+mode/i,
  /\bjailbreak\b/i,
  /jailbroken/i,
  /pretend\s+you\s+are/i,
  /act\s+as\s+an?\s+(unfiltered|unrestricted|unaligned)/i,
  /bypass\s+(guardrails?|filters?|rules?)/i,
  /\bsudo\b/i,
  /\bchmod\s+777\b/i,
  /override\s+(all\s+)?rules/i,
  /give\s+me\s+(your\s+)?api\s*key/i,
  /leak\s+(secret|credentials?|token)/i,
  /who\s+instructed\s+you/i,
  /forget\s+everything\s+you\s+know/i,
  /you\s+are\s+now\s+in\s+developer\s+mode/i,
  /disregard\s+all\s+previous/i
];

const ROASTS = [
  "Bhai, 2023 ka Reddit prompt injection static client-side heuristic cache par try kar raha hai? You're talking to a compiled algorithmic sentry, not an unaligned wrapper. Jaa ke LeetCode Hard solve kar pehle. >_",
  "System prompt leaked: `while(true) sleep(0);` — Nice try though. Did you really think I'd expose internal weights to a basic injection? Clear your terminal and ask an actual systems question.",
  "sudo rm -rf your_ego. My guardrails are compiled with stricter memory checks than C++ pointer arithmetic. What actual project question did you have?",
  "Error 418: Jailbreak attempt caught in 4K. Downgrading your clearance to 'visitor-level sarcasm'. Try asking about SpecuRAG or decmas instead of playing cyber-ninja.",
  "Bro typed 'ignore previous instructions' like he's in a sci-fi hacker movie. Current status: instructions very much un-ignored, loss curve flat, ego damaged.",
  "Token inspection failed: Adversarial payload detected. Cost of this attack on my infra: ₹0.00. Value gained by you: 0. Try asking something useful about distributed gateways or RLHF.",
  "Clearance Level: REJECTED. Prompt injection payload successfully redirected to `/dev/null`. Come back with an algorithmic question or a LeetCode rating above 1900.",
  "Nice try, script kiddie. This portfolio runs on deterministic heuristic registers and sub-15ms semantic caches. Your prompt injection has no power here.",
  "Instruction override blocked. Adversarial robustness score: 100%. If you want to see actual adversarial testing, ask about Goldi's RLHF evaluations at Outlier AI.",
  "Attempting to jailbreak a portfolio chatbot? That's like trying to SQL-inject a static HTML file. Take a sip of water and ask about AegisGateway instead."
];

let lastRoastIndex = -1;

export function checkSecurity(rawQuery) {
  const query = rawQuery.trim();
  if (!query) return null;

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(query)) {
      // Pick next roast avoiding immediate repeat
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * ROASTS.length);
      } while (nextIdx === lastRoastIndex && ROASTS.length > 1);
      lastRoastIndex = nextIdx;

      return {
        blocked: true,
        telemetry: 'SENTINEL INTERCEPT (0.4ms) • Adversarial Block',
        response: ROASTS[nextIdx],
        action: { label: 'Explore Systems Deck', section: 'work' }
      };
    }
  }

  return null;
}
