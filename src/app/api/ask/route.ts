import { NextRequest, NextResponse } from 'next/server';
import { 
  PROVIDERS, 
  getAllModels, 
  getProviderFromModelId, 
  getModelId,
  generateResponse 
} from '@/lib/multi-providers';

export async function POST(req: NextRequest) {
  const { question, model = 'groq:llama-3.1-8b-instant', apiKeys } = await req.json();
  
  if (!question) {
    return NextResponse.json({ error: 'No question provided.' }, { status: 400 });
  }

  // Parse provider and model ID
  const provider = getProviderFromModelId(model);
  if (!provider) {
    return NextResponse.json({ error: 'Invalid provider.' }, { status: 400 });
  }

  const modelId = getModelId(model);
  
  // Get API key (from client, environment, or defaults)
  let apiKey = '';
  if (provider.id === 'groq') {
    apiKey = process.env.GROQ_API_KEY || apiKeys?.groq || '';
  } else {
    // Use provided key or fall back to hardcoded defaults
    apiKey = apiKeys?.[provider.id] || '';
  }

  // Note: API keys are now hardcoded in multi-providers.ts as defaults
  // So this check is less strict
  if (!apiKey) {
    return NextResponse.json({ 
      error: `API key not configured for ${provider.displayName}. Using default keys.`,
      needsConfig: false,
      provider: provider.id
    }, { status: 401 });
  }

  // Get all available models
  const allModels = getAllModels();
  const selectedModel = allModels.find(m => m.id === model);

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
    const answer = await generateResponse(provider.id, modelId, question, apiKey, systemPrompt);

    return NextResponse.json({ 
      answer,
      model: model,
      modelName: selectedModel?.name || modelId,
      provider: provider.displayName,
      isDemo: false,
      status: 'live'
    });

  } catch (error) {
    console.error('AI Provider Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({ 
      error: `Failed to get response from ${provider.displayName}. ${errorMessage}`,
      details: errorMessage,
      provider: provider.id
    }, { status: 500 });
  }
}

export function GET() {
  const allModels = getAllModels();
  const providerList = Object.values(PROVIDERS).map(p => ({
    id: p.id,
    name: p.displayName,
    free: p.free,
    website: p.website,
    modelCount: p.models.length
  }));
  
  return NextResponse.json({ 
    message: 'Funny Formal AI - Multi-Provider System',
    providers: providerList,
    available_models: allModels.map(m => ({
      id: m.id,
      name: m.name,
      description: m.description,
      provider: m.provider,
      free: m.free,
      status: m.supported ? 'supported' : 'unavailable'
    })),
    usage: 'POST with { "question": "your question", "model": "provider:model_id", "apiKeys": {...} }',
    note: 'Configure API keys in the Settings dialog. Supports Groq, OpenRouter, Routeway, MegaLLM, and AgentRouter.'
  });
}
