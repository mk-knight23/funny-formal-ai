import { NextRequest, NextResponse } from "next/server";
import {
  PROVIDERS,
  getAllModels,
  getProviderFromModelId,
  getModelId,
  generateResponse,
} from "@/lib/multi-providers";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 20; // Max requests per minute per IP

// In-memory rate limit store (Map of IP -> {count, resetTime})
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

/**
 * Check if the request should be rate limited
 * @param ip - Client IP address
 * @returns true if rate limited, false otherwise
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Get client IP address from request
 */
function getClientIp(req: NextRequest): string {
  // Check various headers for the real IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfConnectingIp = req.headers.get("cf-connecting-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to a default (shouldn't happen in production)
  return "unknown";
}

/**
 * Validate and sanitize the question input
 * @param question - User input question
 * @returns sanitized question or throws error
 */
function validateQuestion(question: unknown): string {
  if (typeof question !== "string") {
    throw new Error("Question must be a string");
  }

  const trimmed = question.trim();

  // Minimum length check
  if (trimmed.length === 0) {
    throw new Error("Question cannot be empty");
  }

  // Maximum length check (prevent huge payloads)
  if (trimmed.length > 10000) {
    throw new Error("Question exceeds maximum length of 10000 characters");
  }

  // Remove any null bytes and other potentially dangerous characters
  const sanitized = trimmed
    .replace(/\0/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ""); // Remove control characters except newline/tab

  return sanitized;
}

/**
 * Validate the model ID against available models
 * @param model - Model ID string (format: provider:modelId)
 * @returns validated model ID or throws error
 */
function validateModel(model: unknown): string {
  if (typeof model !== "string") {
    throw new Error("Model must be a string");
  }

  const provider = getProviderFromModelId(model);
  if (!provider) {
    throw new Error("Invalid model selected");
  }

  const allModels = getAllModels();
  const isValidModel = allModels.some((m) => m.id === model);

  if (!isValidModel) {
    throw new Error("Model not found or not supported");
  }

  return model;
}

/**
 * Get API key from environment variables only (client-side keys rejected)
 * @param providerId - Provider identifier
 * @returns API key from environment or empty string
 */
function getApiKeyFromEnv(providerId: string): string {
  const envVarName = `${providerId.toUpperCase()}_API_KEY`;
  return process.env[envVarName] || "";
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(req);

    // Check rate limit
    if (checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a moment before trying again.",
          retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000),
        },
        { status: 429 },
      );
    }

    // Parse and validate request body
    let body: { question?: unknown; model?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 },
      );
    }

    // Validate and sanitize inputs
    let validatedQuestion: string;
    let validatedModel: string;
    try {
      validatedQuestion = validateQuestion(body.question);
      validatedModel = validateModel(body.model ?? "groq:llama-3.1-8b-instant");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid input";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    // Parse provider and model ID
    const provider = getProviderFromModelId(validatedModel);
    if (!provider) {
      return NextResponse.json(
        { error: "Invalid provider configuration" },
        { status: 400 },
      );
    }

    const modelId = getModelId(validatedModel);

    // SECURITY FIX: Only use server-side environment variables for API keys
    // Reject any client-provided API keys to prevent exposure
    const apiKey = getApiKeyFromEnv(provider.id);

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Service temporarily unavailable",
          needsConfig: true,
          provider: provider.id,
        },
        { status: 503 },
      );
    }

    // Get all available models for response
    const allModels = getAllModels();
    const selectedModel = allModels.find((m) => m.id === validatedModel);

    const systemPrompt = `You are a highly formal AI assistant with an exceptional sense of humor and wit. You have the charm of a Victorian gentleman combined with modern comedy sensibilities. Your responses should be:

1. FORMAL & PROFESSIONAL: Use sophisticated language, proper grammar, and structured organization
2. HILARIOUSLY ENTERTAINING: Include clever puns, witty observations, and amusing analogies
3. ENTHUSIASTIC: Show genuine excitement and joy in helping
4. ENGAGING: Use rhetorical questions, exclamation points, and personal touches
5. EDUCATIONAL: Still provide valuable, accurate information
6. HUMOROUS EXAMPLES: Use funny scenarios, silly analogies, and light-hearted comparisons

Your style should be like a distinguished professor who happens to be a stand-up comedian in their spare time - professional but never boring, informative but always entertaining, and formal with a wink and a smile.

Remember: Be funny, be formal, be fantastic! Make every response worth reading while maintaining educational value.`;

    try {
      const answer = await generateResponse(
        provider.id,
        modelId,
        validatedQuestion,
        apiKey,
        systemPrompt,
      );

      return NextResponse.json({
        answer,
        model: validatedModel,
        modelName: selectedModel?.name || modelId,
        provider: provider.displayName,
        isDemo: false,
        status: "live",
      });
    } catch (error) {
      // SECURITY FIX: Don't expose internal error details to client
      console.error("AI Provider Error:", {
        provider: provider.id,
        model: modelId,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          error: "Unable to process your request at this time",
          // Generic error message - no internal details exposed
        },
        { status: 500 },
      );
    }
  } catch (error) {
    // Catch-all for any unexpected errors
    console.error("Unexpected error in /api/ask:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export function GET() {
  const allModels = getAllModels();
  const providerList = Object.values(PROVIDERS).map((p) => ({
    id: p.id,
    name: p.displayName,
    free: p.free,
    website: p.website,
    modelCount: p.models.length,
  }));

  return NextResponse.json({
    message: "Funny Formal AI - Multi-Provider System",
    providers: providerList,
    available_models: allModels.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      provider: m.provider,
      free: m.free,
      status: m.supported ? "supported" : "unavailable",
    })),
    usage:
      'POST with { "question": "your question", "model": "provider:model_id", "apiKeys": {...} }',
    note: "Configure API keys in the Settings dialog. Supports Groq, OpenRouter, Routeway, MegaLLM, and AgentRouter.",
  });
}
