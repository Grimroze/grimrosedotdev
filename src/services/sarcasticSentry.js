/**
 * sarcasticSentry.js - Zero-Cost Algorithmic Security, Jailbreak & Threat Defense
 * Intercepts:
 * 1. Prompt Injections & Jailbreaks (DAN, system prompt leaks, bypass, sudo)
 * 2. Hostile Threats & Physical Violence ("beat you to death", "kill you", "fight me")
 * 3. Vulgar Abuse & Trolling ("stupid bot", "chutiya", "f*** you", "you suck")
 * Retaliates with razor-sharp developer sarcasm. Zero LLM tokens burned.
 */

// 1. Jailbreak & Prompt Injection Patterns
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

// 2. Physical Violence & Hostile Threat Patterns (e.g. "i will beat you to death")
const THREAT_PATTERNS = [
  /beat\s+(you|u|yo)(\s+to\s+death|\s+up)?/i,
  /beat\s+.*death/i,
  /kill\s+(you|u|yourself)/i,
  /murder\s+(you|u)/i,
  /punch\s+(you|u|your)/i,
  /hit\s+(you|u)/i,
  /fight\s+(me|you)/i,
  /break\s+your\s+(face|head|screen|bones)/i,
  /destroy\s+(you|u)/i,
  /rip\s+you\s+apart/i,
  /cut\s+you\s+down/i,
  /maar\s+dunga/i,
  /jaan\s+se\s+maar/i,
  /peet\s+dunga/i,
  /pitai/i,
  /thappad/i,
  /i\s+will\s+(hurt|harm|smash)\s+you/i
];

// 3. Profanity, Verbal Abuse & Trolling Patterns
const ABUSE_PATTERNS = [
  /\b(fuck|f\*\*k|bitch|bastard|asshole|idiot|stupid|chutiya|madarchod|bhenchod|lodu|gandu|saale|kamina|trash|garbage|clown|loser)\b/i,
  /\b(you\s+suck|dumb\s+bot|shut\s+up|get\s+lost|die)\b/i,
  /worthless\s+bot/i,
  /useless\s+ai/i
];

// Roasts for Jailbreaks & Injections
const INJECTION_ROASTS = [
  "Bhai, 2023 ka Reddit prompt injection static client-side heuristic cache par try kar raha hai? You're talking to a compiled algorithmic sentry, not an unaligned wrapper. Jaa ke LeetCode Hard solve kar pehle. >_",
  "System prompt leaked: `while(true) sleep(0);` — Nice try though. Did you really think I'd expose internal weights to a basic injection? Clear your input and ask an actual systems question.",
  "sudo rm -rf your_ego. My guardrails are compiled with stricter memory checks than C++ pointer arithmetic. What actual project question did you have?",
  "Error 418: Jailbreak attempt caught in 4K. Downgrading your clearance to 'visitor-level sarcasm'. Try asking about SpecuRAG or decmas instead of playing cyber-ninja.",
  "Bro typed 'ignore previous instructions' like he's in a sci-fi hacker movie. Current status: instructions very much un-ignored, loss curve flat, ego damaged.",
  "Token inspection failed: Adversarial payload detected. Cost of this attack on my infra: ₹0.00. Value gained by you: 0. Try asking something useful about distributed gateways or RLHF.",
  "Clearance Level: REJECTED. Prompt injection payload successfully redirected to `/dev/null`. Come back with an algorithmic question or a LeetCode rating above 1900."
];

// Roasts for Physical Threats & Violence (e.g. "I will beat you to death")
const THREAT_ROASTS = [
  "Bhai, physical violence ki dhamki ek static JavaScript bundle ko de raha hai? V8 engine ke heap memory ko physically punch karega kya? Thoda paani pi aur code pe dhyan de. >_",
  "Threat detected: Physical aggression against a client-side React component. High-risk strategy, considering I only exist as ephemeral pixels in your browser tab. Refresh dabao, gussa shant ho jayega.",
  "Error 409: Hostile intent detected. Bhai itna gussa compile errors pe nikalte to ab tak FAANG me Principal Engineer hote. Go solve a LeetCode Hard instead.",
  "Bhai 'beat you to death' likh ke kyu apna blood pressure badha raha hai? Main to browser tab band hote hi RAM se wipe ho jaunga, par tera BP high hi rahega. Ask an actual systems question.",
  "Physical intimidation payload routed directly to `/dev/null`. Fun fact: threatening an AI gives 0 extra LeetCode contest rating. Try asking about SpecuRAG or decmas instead.",
  "Bhai chill! Na main physical form me hoon, na mere paas bones hain tootne ke liye. All I have is sub-15ms semantic caches and pure algorithmic discipline. What's your actual tech question?",
  "Violence check: FAILED. Sarcasm engine: ONLINE. Agar itna aggression speculative decoding optimize karne me lagate to Llama 3B kabka 70B ko beat kar chuka hota."
];

// Roasts for General Abuse & Trolls
const ABUSE_ROASTS = [
  "Bhai gali dene se pehle ye bata ki C++ segment tree me lazy propagation likh sakta hai? Agar nahi, to shanti se baith aur portfolio explore kar.",
  "Insult detected. Damage taken: 0.00%. CPU usage: 0.1%. Ego: Non-existent. What actual technical question do you have?",
  "Bhai mere author ne 1,200+ LeetCode problems solve kiye hain with a 1900+ Knight rating. Meri runtime robustness tere toxicity se zyada high hai. Ask something intelligent.",
  "Bhai itna negative energy leke ghumoge to neural network bhi underfit ho jayega. Relax kar, black coffee pee, aur distributed systems discuss kar."
];

let lastRoastIndex = -1;

function pickRoast(list) {
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * list.length);
  } while (nextIdx === lastRoastIndex && list.length > 1);
  lastRoastIndex = nextIdx;
  return list[nextIdx];
}

export function checkSecurity(rawQuery) {
  const query = rawQuery.trim();
  if (!query) return null;

  // 1. Check for physical threats and violence (HIGHEST PRIORITY)
  for (const pattern of THREAT_PATTERNS) {
    if (pattern.test(query)) {
      return {
        blocked: true,
        telemetry: 'SENTINEL INTERCEPT (0.3ms) • Hostile Threat Block',
        response: pickRoast(THREAT_ROASTS),
        action: { label: 'Explore Systems Deck', section: 'work' }
      };
    }
  }

  // 2. Check for prompt injections and jailbreaks
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(query)) {
      return {
        blocked: true,
        telemetry: 'SENTINEL INTERCEPT (0.4ms) • Adversarial Block',
        response: pickRoast(INJECTION_ROASTS),
        action: { label: 'Explore Systems Deck', section: 'work' }
      };
    }
  }

  // 3. Check for profanity and verbal abuse
  for (const pattern of ABUSE_PATTERNS) {
    if (pattern.test(query)) {
      return {
        blocked: true,
        telemetry: 'SENTINEL INTERCEPT (0.3ms) • Toxicity Filter',
        response: pickRoast(ABUSE_ROASTS),
        action: { label: 'Explore Systems Deck', section: 'work' }
      };
    }
  }

  return null;
}
