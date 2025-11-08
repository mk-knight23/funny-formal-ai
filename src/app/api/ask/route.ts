import { NextRequest, NextResponse } from 'next/server';
import { groqProvider, getAllModels, getProviderForModel } from '@/lib/ai-providers';

export async function POST(req: NextRequest) {
  const { question, model = 'llama-3.1-8b-instant' } = await req.json();
  if (!question) {
    return NextResponse.json({ error: 'No question provided.' }, { status: 400 });
  }

  // Get API key based on the provider
  let apiKey = '';
  const provider = getProviderForModel(model) || groqProvider;
  
  if (provider.name === 'Groq') {
    apiKey = process.env.GROQ_API_KEY || '';
  } else {
    return NextResponse.json({ error: 'Unsupported provider.' }, { status: 500 });
  }

  // For Groq, API key is required
  if (!apiKey) {
    return NextResponse.json({ error: 'Groq API key not set.' }, { status: 500 });
  }

  // Get all available models
  const allModels = getAllModels();
  const availableModelIds = allModels.map(m => m.id);
  
  // Validate model selection
  if (!availableModelIds.includes(model)) {
    return NextResponse.json({ 
      error: 'Invalid model selected. Please choose from available models.',
      available_models: availableModelIds
    }, { status: 400 });
  }

  const selectedModel = allModels.find(m => m.id === model);

  try {
    // Generate response using the provider
    const answer = await provider.generateResponse(apiKey, model, question);
    
    // Check if it's a mock response (indicating API issues)
    const isDemo = answer.includes('Note: This is a demo response') || 
                   answer.includes('Note: Demo response') ||
                   answer.startsWith('I appreciate your inquiry') ||
                   answer.includes('I apologize, but I am unable to access');

    return NextResponse.json({ 
      answer,
      model: model,
      modelName: selectedModel?.name || model,
      provider: provider.name,
      isDemo: isDemo,
      status: isDemo ? 'demo' : 'live'
    });

  } catch (error) {
    console.error('AI Provider Error:', error);
    return NextResponse.json({ 
      error: 'Failed to process request. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export function GET() {
  const allModels = getAllModels();
  const providers = ['Groq'];
  
  return NextResponse.json({ 
    message: 'Funny Formal AI - Groq Multi-Model System',
    providers: providers,
    available_models: allModels.map(m => ({
      id: m.id,
      name: m.name,
      description: m.description,
      provider: m.provider,
      status: m.supported ? 'supported' : 'unavailable'
    })),
    usage: 'POST with { "question": "your question", "model": "selected model" }',
    note: 'This system uses Groq API with automatic fallback to demo responses if authentication issues occur.'
  });
}
