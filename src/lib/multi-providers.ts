// Multi-Provider AI System

// Guard against Node.js localStorage polyfill issues
if (
  typeof globalThis !== "undefined" &&
  typeof globalThis.localStorage !== "undefined"
) {
  // If localStorage exists but doesn't work properly (Node.js env), remove it
  try {
    globalThis.localStorage.getItem("__test__");
  } catch {
    // @ts-expect-error - removing broken polyfill
    delete globalThis.localStorage;
  }
}
export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  supported: boolean;
  free?: boolean;
  contextWindow?: number;
}

export interface ProviderConfig {
  id: string;
  name: string;
  displayName: string;
  website: string;
  baseUrl: string;
  requiresApiKey: boolean;
  free: boolean;
  models: AIModel[];
  description: string;
}

export const PROVIDERS: Record<string, ProviderConfig> = {
  groq: {
    id: "groq",
    name: "Groq",
    displayName: "Groq (Current)",
    website: "https://console.groq.com",
    baseUrl: "https://api.groq.com/openai/v1",
    requiresApiKey: true,
    free: true,
    description:
      "Lightning-fast inference with free access to premium AI models",
    models: [
      {
        id: "llama-3.1-8b-instant",
        name: "Llama 3.1 8B Instant",
        description: "Fast inference (30 RPM, 14.4K RPD)",
        provider: "Meta",
        supported: true,
        free: true,
        contextWindow: 8192,
      },
      {
        id: "llama-3.3-70b-versatile",
        name: "Llama 3.3 70B Versatile",
        description: "High-quality reasoning (30 RPM, 1K RPD)",
        provider: "Meta",
        supported: true,
        free: true,
        contextWindow: 32768,
      },
      {
        id: "meta-llama/llama-4-maverick-17b-128e-instruct",
        name: "Llama 4 Maverick 17B",
        description: "Advanced reasoning (30 RPM, 1K RPD)",
        provider: "Meta",
        supported: true,
        free: true,
        contextWindow: 128000,
      },
      {
        id: "meta-llama/llama-4-scout-17b-16e-instruct",
        name: "Llama 4 Scout 17B",
        description: "Optimized for chat (30 RPM, 1K RPD)",
        provider: "Meta",
        supported: true,
        free: true,
        contextWindow: 16384,
      },
    ],
  },

  openrouter: {
    id: "openrouter",
    name: "OpenRouter",
    displayName: "OpenRouter",
    website: "https://openrouter.ai",
    baseUrl: "https://openrouter.ai/api/v1",
    requiresApiKey: true,
    free: true,
    description: "Access to multiple AI models including free options",
    models: [
      {
        id: "x-ai/grok-beta",
        name: "Grok Beta",
        description: "xAI's conversational model",
        provider: "xAI",
        supported: true,
        free: true,
        contextWindow: 131072,
      },
      {
        id: "deepseek/deepseek-chat",
        name: "DeepSeek Chat",
        description: "Powerful reasoning model",
        provider: "DeepSeek",
        supported: true,
        free: true,
        contextWindow: 64000,
      },
      {
        id: "qwen/qwen-2.5-72b-instruct",
        name: "Qwen 2.5 72B",
        description: "Advanced multilingual model",
        provider: "Qwen",
        supported: true,
        free: true,
        contextWindow: 32768,
      },
      {
        id: "google/gemini-2.0-flash-exp:free",
        name: "Gemini 2.0 Flash",
        description: "Fast Google model",
        provider: "Google",
        supported: true,
        free: true,
        contextWindow: 1000000,
      },
      {
        id: "meta-llama/llama-3.2-3b-instruct:free",
        name: "Llama 3.2 3B",
        description: "Efficient small model",
        provider: "Meta",
        supported: true,
        free: true,
        contextWindow: 131072,
      },
    ],
  },

  routeway: {
    id: "routeway",
    name: "Routeway",
    displayName: "Routeway",
    website: "https://routeway.ai",
    baseUrl: "https://api.routeway.ai/v1",
    requiresApiKey: true,
    free: true,
    description:
      "Free access to various AI models (check their docs for current models)",
    models: [
      {
        id: "gpt-4o-mini",
        name: "GPT-4o Mini",
        description: "Efficient OpenAI model",
        provider: "OpenAI",
        supported: true,
        free: true,
        contextWindow: 128000,
      },
      {
        id: "gpt-4o",
        name: "GPT-4o",
        description: "Advanced OpenAI model",
        provider: "OpenAI",
        supported: true,
        free: true,
        contextWindow: 128000,
      },
      {
        id: "claude-3-5-sonnet-20241022",
        name: "Claude 3.5 Sonnet",
        description: "Latest Claude model",
        provider: "Anthropic",
        supported: true,
        free: true,
        contextWindow: 200000,
      },
      {
        id: "deepseek-chat",
        name: "DeepSeek Chat",
        description: "Powerful reasoning",
        provider: "DeepSeek",
        supported: true,
        free: true,
        contextWindow: 64000,
      },
      {
        id: "llama-3.1-70b-versatile",
        name: "Llama 3.1 70B",
        description: "High-quality responses",
        provider: "Meta",
        supported: true,
        free: true,
        contextWindow: 131072,
      },
    ],
  },

  megallm: {
    id: "megallm",
    name: "MegaLLM",
    displayName: "MegaLLM",
    website: "https://megallm.io",
    baseUrl: "https://api.megallm.io/v1",
    requiresApiKey: true,
    free: false,
    description: "Premium access to Llama, Qwen, and DeepSeek models",
    models: [
      {
        id: "llama-3.3-70b-instruct",
        name: "Llama 3.3 70B",
        description: "Latest Llama model",
        provider: "Meta",
        supported: true,
        free: false,
        contextWindow: 131072,
      },
      {
        id: "qwen-2.5-72b-instruct",
        name: "Qwen 2.5 72B",
        description: "Advanced multilingual",
        provider: "Qwen",
        supported: true,
        free: false,
        contextWindow: 32768,
      },
      {
        id: "deepseek-v3",
        name: "DeepSeek V3",
        description: "Latest DeepSeek",
        provider: "DeepSeek",
        supported: true,
        free: false,
        contextWindow: 64000,
      },
    ],
  },

  agentrouter: {
    id: "agentrouter",
    name: "AgentRouter",
    displayName: "AgentRouter",
    website: "https://agentrouter.org",
    baseUrl: "https://api.agentrouter.org/v1",
    requiresApiKey: true,
    free: true,
    description: "Access to GLM, DeepSeek, and Claude models",
    models: [
      {
        id: "glm-4-flash",
        name: "GLM-4 Flash",
        description: "Fast reasoning model",
        provider: "Zhipu",
        supported: true,
        free: true,
        contextWindow: 128000,
      },
      {
        id: "deepseek-chat",
        name: "DeepSeek Chat",
        description: "Powerful reasoning",
        provider: "DeepSeek",
        supported: true,
        free: true,
        contextWindow: 64000,
      },
      {
        id: "claude-3-haiku",
        name: "Claude 3 Haiku",
        description: "Fast Claude model",
        provider: "Anthropic",
        supported: true,
        free: true,
        contextWindow: 200000,
      },
      {
        id: "claude-3-sonnet",
        name: "Claude 3 Sonnet",
        description: "Balanced Claude model",
        provider: "Anthropic",
        supported: true,
        free: true,
        contextWindow: 200000,
      },
    ],
  },
};

export interface APIKeyConfig {
  groq?: string;
  openrouter?: string;
  routeway?: string;
  megallm?: string;
  agentrouter?: string;
}

// SECURITY: API keys should NEVER be hardcoded in client-side code
// Users must provide their own API keys via the UI
//
// SECURITY NOTICE: This application stores API keys in localStorage with AES-GCM encryption.
// In a production environment, API keys should be:
// 1. Stored server-side with proper authentication
// 2. Never exposed to client-side JavaScript
// 3. Rotated regularly
//
// For this demo application, keys are stored locally in the user's browser with encryption.
// Consider implementing a backend proxy for production use.
const DEFAULT_API_KEYS: APIKeyConfig = {};

// Re-export secure storage functions for backwards compatibility
export {
  getStoredApiKeysSecure as getStoredApiKeys,
  saveApiKeysSecure as saveApiKeys,
  clearStoredApiKeys,
  isUsingEncryptedStorage,
} from "./secure-storage";

/**
 * Obfuscate API key for display purposes (not secure encryption!)
 * This only provides visual obfuscation, not real security.
 * Real security requires server-side key management.
 */
export function obfuscateKey(key: string): string {
  if (!key || key.length < 8) return "***";
  return key.slice(0, 4) + "..." + key.slice(-4);
}

export function getAllModels(): AIModel[] {
  return Object.values(PROVIDERS).flatMap((provider) =>
    provider.models.map((model) => ({
      ...model,
      id: `${provider.id}:${model.id}`,
    })),
  );
}

export function getProviderFromModelId(
  fullModelId: string,
): ProviderConfig | null {
  const [providerId] = fullModelId.split(":");
  return PROVIDERS[providerId] || null;
}

export function getModelId(fullModelId: string): string {
  const parts = fullModelId.split(":");
  return parts.length > 1 ? parts.slice(1).join(":") : fullModelId;
}

export async function generateResponse(
  providerId: string,
  modelId: string,
  message: string,
  apiKey: string,
  systemPrompt: string,
): Promise<string> {
  const provider = PROVIDERS[providerId];
  if (!provider) throw new Error("Provider not found");

  // Use default API key if not provided
  const effectiveApiKey =
    apiKey || DEFAULT_API_KEYS[providerId as keyof APIKeyConfig] || "";

  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${effectiveApiKey}`,
      ...(providerId === "openrouter" && {
        "HTTP-Referer":
          typeof window !== "undefined" ? window.location.origin : "",
        "X-Title": "Funny Formal AI",
      }),
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Return mock response for demo purposes instead of throwing
    console.warn(
      `API Error (${providerId}): ${response.status}. Using mock response.`,
      errorText,
    );
    return generateMockResponse(message, modelId, providerId);
  }

  const data = await response.json();
  return (
    data.choices?.[0]?.message?.content ||
    generateMockResponse(message, modelId, providerId)
  );
}

// Generate a mock response for demo when API keys are invalid
function generateMockResponse(
  message: string,
  modelId: string,
  providerId: string,
): string {
  const responses = [
    `Greetings! I am absolutely delighted to receive your inquiry regarding "${message.slice(0, 30)}..." Allow me to respond with the utmost formality and a dash of whimsy! *adjusts monocle*`,
    `Ah, what a splendid question! "${message.slice(0, 30)}..." - This reminds me of the time I debated philosophy with a particularly eloquent tea kettle. *chuckles formally*`,
    `My dear interlocutor! Your query "${message.slice(0, 30)}..." has been received with the highest regard. Permit me to craft a response worthy of a royal correspondence!`,
    `*Clears throat in a distinguished manner* I am honored to address your inquiry about "${message.slice(0, 30)}...". Please accept this response, delivered with bureaucratic precision and comedic timing!`,
    `Well, well! "${message.slice(0, 30)}..." - A question most intriguing! As a formal AI of the highest caliber, I shall endeavor to respond with both gravitas and gentle humor!`,
  ];

  const mockResponse = responses[Math.floor(Math.random() * responses.length)];
  return `[DEMO MODE - ${providerId.toUpperCase()}]\n\n${mockResponse}\n\nNote: This is a demonstration response. Configure valid API keys in Settings for live responses from ${modelId}.`;
}
