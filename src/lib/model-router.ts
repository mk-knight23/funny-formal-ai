// model-router.ts — Smart model selection based on query analysis
// AI-VIBE-CHAT-V3 v2.0 | Kazi Musharraf | mkazi.live

export interface ModelSelection {
  provider: 'anthropic' | 'openai' | 'groq'
  model: string
  reason: string
  estimatedLatency: 'fast' | 'medium' | 'slow'
}

const CODE_PATTERN = /\b(code|function|class|implement|debug|bug|error|typescript|javascript|python|refactor|test|lint|compile)\b/i
const REASONING_PATTERN = /\b(why|explain|analyze|compare|evaluate|think|reason|philosophy|ethics|strategy|plan|design)\b/i
const CREATIVE_PATTERN = /\b(write|story|poem|creative|imagine|generate|draft|compose|narrative)\b/i
const FAST_PATTERN = /^.{0,80}$/ // Short queries

export function selectOptimalModel(query: string): ModelSelection {
  const isCode = CODE_PATTERN.test(query)
  const isReasoning = REASONING_PATTERN.test(query)
  const isCreative = CREATIVE_PATTERN.test(query)
  const isShort = FAST_PATTERN.test(query)

  if (isCode) {
    return {
      provider: 'groq',
      model: 'llama-3.3-70b-versatile',
      reason: 'Code tasks benefit from Llama 3.3\'s strong coding capabilities at high speed',
      estimatedLatency: 'fast'
    }
  }

  if (isReasoning) {
    return {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      reason: 'Complex reasoning tasks are where Claude Sonnet excels',
      estimatedLatency: 'medium'
    }
  }

  if (isCreative) {
    return {
      provider: 'anthropic',
      model: 'claude-opus-4-6',
      reason: 'Creative tasks benefit from Claude Opus\'s nuanced understanding',
      estimatedLatency: 'slow'
    }
  }

  if (isShort) {
    return {
      provider: 'groq',
      model: 'llama-3.1-8b-instant',
      reason: 'Short queries are fast with Llama 3.1 8B Instant',
      estimatedLatency: 'fast'
    }
  }

  return {
    provider: 'openai',
    model: 'gpt-4o',
    reason: 'General queries balanced with GPT-4o capability',
    estimatedLatency: 'medium'
  }
}

export function tokenCount(text: string): number {
  // Rough approximation: ~4 chars per token
  return Math.ceil(text.length / 4)
}
