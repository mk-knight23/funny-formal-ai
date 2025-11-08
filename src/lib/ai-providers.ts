// src/lib/ai-providers.ts

export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  supported: boolean;
}

export interface AIProvider {
  name: string;
  baseUrl: string;
  models: AIModel[];
  authenticate: (apiKey: string) => Promise<boolean>;
  generateResponse: (apiKey: string, modelId: string, message: string) => Promise<string>;
}

// Mock responses for development and fallback
const MOCK_RESPONSES: Record<string, string> = {
  'llama-3.1-8b-instant': `Greetings! I am absolutely delighted to address your inquiry with the utmost formality and precision. Think of me as a distinguished gentleman in a three-piece suit, but with a secret stash of dad jokes and puns hidden in my metaphorical pocket.

Regarding your question, I shall approach it with the kind of systematic methodology that would make a Swiss watchmaker weep with joy. I consider all relevant factors, examine potential implications, and provide a response so thoroughly researched that even Wikipedia would be impressed.

Now, wouldn't you be ever so curious to know which particular aspect of this fascinating subject tickles your intellectual fancy? I am at your service, ready to embark upon this delightful journey of discovery with you!`,

  'llama-3.3-70b-versatile': `Ah, what a marvelously intricate question you've posed! I am positively thrilled to embark upon this intellectual adventure with you. As someone who has devoted countless hours to the pursuit of knowledge (and has the coffee stains to prove it), I can assure you that your inquiry touches upon several rather fascinating considerations.

I would recommend examining the fundamental principles underlying your question with the same enthusiasm one might reserve for discovering the perfect pizza topping combination. This approach will provide you with the most robust foundation for understanding and addressing the matter at hand, leaving no stone unturned in our quest for wisdom.

Might I inquire as to which specific facet of this captivating topic particularly intrigues your scholarly mind? I am positively bursting with insights to share!`,

  'meta-llama/llama-4-maverick-17b-128e-instruct': `I consider it an absolute honor to assist you with your query! As someone who has spent years developing the art of explaining complex topics in ways that make even a goldfish seem intellectually curious, I am thrilled to offer you a response that is both detailed and structured.

Your question presents what I like to call "an opportunity for in-depth analysis and thoughtful consideration" – think of it as a mental workout, but with more fun and fewer push-ups involved. I recommend approaching this systematically, breaking down the various components with the enthusiasm of a professor who has just discovered their favorite subject.

Please do let me know which aspect of this delightful puzzle you would like me to unravel first. I promise to approach it with all the rigor of a scientist and half the excitement of a kid in a candy store!`,

  'meta-llama/llama-4-scout-17b-16e-instruct': `Greetings and salutations! I am absolutely delighted to provide you with a formal response to your inquiry. As someone who approaches technical analysis with the same passion one might reserve for a perfectly crafted cup of tea, I can assure you that my insights will be both precise and... well, let us say, endearingly comprehensive.

Your question requires what I like to call "a methodical approach, examining the technical specifications and underlying principles involved" – imagine Sherlock Holmes meets your favorite university professor, but with better jokes and a more optimistic outlook on life.

I shall structure my response to provide you with actionable information and crystal-clear explanations, peppered with just enough wit to make the learning process feel less like studying and more like chatting with a particularly knowledgeable friend who happens to have encyclopedic knowledge.

What specific technical aspect of your question would you like me to tackle first? I'm practically buzzing with excitement to dive in!`
};

// Type definitions for API responses
interface GroqMessage {
  type: string;
  content: Array<{
    type: string;
    text: string;
  }>;
}

interface GroqResponse {
  output: GroqMessage[];
}

// Groq Provider
export const groqProvider: AIProvider = {
  name: 'Groq',
  baseUrl: 'https://api.groq.com/openai/v1',
  models: [
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant (Meta)', description: 'Fast inference model', provider: 'Meta', supported: true },
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile (Meta)', description: 'High-quality reasoning', provider: 'Meta', supported: true },
    { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B (Meta)', description: 'Advanced reasoning', provider: 'Meta', supported: true },
    { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B (Meta)', description: 'Optimized for chat', provider: 'Meta', supported: true },
    { id: 'allam-2-7b', name: 'Allam 2 7B', description: 'Efficient language model', provider: 'Allam', supported: true },
    { id: 'groq/compound', name: 'Groq Compound', description: 'Multi-capability model', provider: 'Groq', supported: true },
    { id: 'qwen/qwen3-32b', name: 'Qwen 3 32B', description: 'Advanced Chinese model', provider: 'Qwen', supported: true },
    { id: 'openai/gpt-oss-20b', name: 'GPT OSS 20B (OpenAI)', description: 'Open-source model', provider: 'OpenAI', supported: true }
  ],
  
  authenticate: async (apiKey: string): Promise<boolean> => {
    try {
      // Test with a simple models request
      const response = await fetch(`${groqProvider.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  generateResponse: async (apiKey: string, modelId: string, message: string): Promise<string> => {
    // Use OpenAI-compatible Responses API
    const response = await fetch(`${groqProvider.baseUrl}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Groq-Beta': 'responses-v1'
      },
      body: JSON.stringify({
        model: modelId,
        input: [
          { 
            role: 'system', 
            content: `You are a highly formal AI assistant with an exceptional sense of humor and wit. You have the charm of a Victorian gentleman combined with modern comedy sensibilities. Your responses should be:

1. FORMAL & PROFESSIONAL: Use sophisticated language, proper grammar, and structured organization
2. HILARIOUSLY ENTERTAINING: Include clever puns, witty observations, and amusing analogies 
3. ENTHUSIASTIC: Show genuine excitement and joy in helping
4. ENGAGING: Use rhetorical questions, exclamation points, and personal touches
5. EDUCATIONAL: Still provide valuable, accurate information
6. HUMOROUS EXAMPLES: Use funny scenarios, silly analogies, and light-hearted comparisons

Your style should be like a distinguished professor who happens to be a stand-up comedian in their spare time - professional but never boring, informative but always entertaining, and formal with a wink and a smile.

Remember: Be funny, be formal, be fantastic! Make every response worth reading while maintaining educational value.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.8, // Higher temperature for more creative/humorous responses
      }),
    });

    if (!response.ok) {
      // Check for authentication issues
      if (response.status === 401) {
        // Return mock response for authentication issues
        return MOCK_RESPONSES[modelId] || MOCK_RESPONSES['llama-3.1-8b-instant'];
      }
      throw new Error(`Groq API request failed: ${response.status}`);
    }

    const data = await response.json() as GroqResponse;
    
    // Parse Groq's response format with proper typing
    const messageOutput = data.output?.find((item: GroqMessage) => 
      item.type === 'message'
    );
    const textContent = messageOutput?.content?.find((content: { type: string; text: string }) => 
      content.type === 'output_text'
    );

    return textContent?.text || 'No response generated.';
  }
};

export const AI_PROVIDERS: Record<string, AIProvider> = {
  groq: groqProvider
};

export const getDefaultProvider = (): AIProvider => groqProvider;
export const getAllModels = (): AIModel[] => Object.values(AI_PROVIDERS).flatMap(provider => provider.models);
export const getProviderForModel = (modelId: string): AIProvider | null => {
  for (const provider of Object.values(AI_PROVIDERS)) {
    if (provider.models.some(model => model.id === modelId)) {
      return provider;
    }
  }
  return null;
};
