/**
 * dynamicVariator.js - Anti-Redundancy Combinatorial Assembly Engine
 * Guarantees that asking the same question 3-5 times in a row yields
 * structurally different, freshly phrased responses without repetitive templates.
 */

// Memory fallback if sessionStorage is unavailable in iframe/sandbox
const localVariantRegistry = new Map();

function getStoredVariant(topicId) {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const val = window.sessionStorage.getItem(`variant_${topicId}`);
      return val !== null ? parseInt(val, 10) : 0;
    }
  } catch {
    // ignore
  }
  return localVariantRegistry.get(topicId) || 0;
}

function setStoredVariant(topicId, nextIdx) {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(`variant_${topicId}`, String(nextIdx));
    }
  } catch {
    // ignore
  }
  localVariantRegistry.set(topicId, nextIdx);
}

/**
 * Combines an intro, deep body variant, optional ASCII architecture diagram,
 * and distinct outro into a cohesive, un-canned response.
 */
export function assembleDynamicResponse(topic, rawQuery = '') {
  const { id, intros = [], variants = [], diagram = '', outros = [] } = topic;

  // 1. Advance cycle pointer to ensure different framing on repeated questions
  const prevIdx = getStoredVariant(id);
  const nextIdx = (prevIdx + 1) % Math.max(1, variants.length);
  setStoredVariant(id, nextIdx);

  // 2. Select distinct intro based on cycle
  const intro = intros.length ? intros[nextIdx % intros.length] : '';

  // 3. Select body variant
  const body = variants.length ? variants[nextIdx] : '';

  // 4. Select distinct outro
  const outro = outros.length ? outros[(nextIdx + 1) % outros.length] : '';

  // 5. Check if query explicitly asks for diagram or architecture
  const queryLower = rawQuery.toLowerCase();
  const wantsDiagram = queryLower.includes('diagram') ||
                       queryLower.includes('architecture') ||
                       queryLower.includes('flow') ||
                       queryLower.includes('how does it work') ||
                       queryLower.includes('explain') ||
                       nextIdx === 0; // Show diagram on primary variant

  // 6. Build the assembled response
  const parts = [];

  if (intro) {
    parts.push(intro);
  }

  if (body) {
    parts.push(body);
  }

  if (diagram && wantsDiagram) {
    parts.push(`\`\`\`diagram\n${diagram}\n\`\`\``);
  }

  if (outro) {
    parts.push(outro);
  }

  return parts.join('\n\n');
}
