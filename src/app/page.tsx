"use client";

import { useState, useEffect } from "react";

type APIResponse = {
  answer: string;
  model: string;
  modelName?: string;
  provider: string;
  isDemo: boolean;
  status: 'demo' | 'live';
} | {
  error: string;
  details?: unknown;
};

interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  supported: boolean;
}

interface APIStatusResponse {
  message: string;
  providers: string[];
  available_models: AIModel[];
  usage: string;
  note: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [selectedModel, setSelectedModel] = useState("llama-3.1-8b-instant");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usedModel, setUsedModel] = useState("");
  const [responseData, setResponseData] = useState<APIResponse | null>(null);
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);

  // Load available models from API on component mount
  useEffect(() => {
    fetch("/api/ask")
      .then(res => res.json())
      .then((data: APIStatusResponse) => {
        console.log("API Status:", data);
        if (data.available_models && data.available_models.length > 0) {
          setAvailableModels(data.available_models);
          // Set default model to the first available one
          setSelectedModel(data.available_models[0].id);
        }
      })
      .catch(err => {
        console.error("API check failed:", err);
        // Fallback to default models if API fails
        setAvailableModels([
          { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant (Meta)', description: 'Fast inference model', provider: 'Meta', supported: true }
        ]);
      })
      .finally(() => {
        setLoadingModels(false);
      });
  }, []);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    setUsedModel("");
    setResponseData(null);
    
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question, 
          model: selectedModel 
        }),
      });
      const data: APIResponse = await res.json();
      
      if (res.ok) {
        const successData = data as {
          answer: string;
          model: string;
          modelName?: string;
          provider: string;
          isDemo: boolean;
          status: 'demo' | 'live';
        };
        setAnswer(successData.answer);
        setUsedModel(successData.model);
        setResponseData(successData);
      } else {
        const errorData = data as { error: string; details?: unknown };
        setError(errorData.error || "An error occurred.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] w-full px-2">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-fuchsia-600 drop-shadow mb-2 animate-bounce">
        Welcome to Funny Formal AI! 🤖
      </h1>
      <p className="text-lg md:text-xl text-center text-blue-700 font-semibold mb-8">
        Ask anything, get a formal answer... with a twist of fun! 🎉
        <br />
        <span className="text-sm text-gray-600">
          Powered by {availableModels.length} Free AI Models via Groq API (Lightning Fast)
        </span>
      </p>

      {/* Groq Status Alert */}
      <div className="w-full max-w-xl mb-4">
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3">
          <div className="flex items-center gap-2 text-green-800 text-sm">
            <span className="text-lg">⚡</span>
            <div>
              <strong>Powered by Groq:</strong> Ultra-fast inference with free access to premium AI models. 
              Experience lightning-speed responses with Meta Llama, Qwen, and more.
            </div>
          </div>
        </div>
      </div>
      
      <form
        onSubmit={handleAsk}
        className="w-full max-w-xl flex flex-col gap-4 mb-6 bg-white/80 rounded-xl shadow-lg p-6 border-4 border-dashed border-yellow-300"
      >
        {/* Model Selection Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Select AI Model:
          </label>
          {loadingModels ? (
            <div className="w-full p-3 rounded border-2 border-fuchsia-300 bg-gray-100 text-gray-500 text-sm">
              Loading models...
            </div>
          ) : (
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-3 rounded border-2 border-fuchsia-300 bg-yellow-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-sm"
            >
              {availableModels.map((model: AIModel) => (
                <option key={model.id} value={model.id}>
                  {model.name} - {model.description}
                </option>
              ))}
            </select>
          )}
        </div>

        <textarea
          className="p-3 rounded border-2 border-fuchsia-300 bg-yellow-50 text-gray-900 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-lg font-mono"
          placeholder="Type your most burning question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-400 text-white font-bold py-2 px-6 rounded-full shadow hover:scale-105 transition-transform disabled:opacity-50 text-lg"
          disabled={loading || !question.trim()}
        >
          {loading ? "The AI is thinking... 🧠" : "Ask the AI!"}
        </button>
      </form>
      
      {answer && (
        <div className="w-full max-w-xl bg-cyan-50 border-2 border-fuchsia-300 rounded-xl p-4 shadow mb-4 animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-fuchsia-700 text-lg">
              Formal (and Funny) Answer:
            </h2>
            {responseData && 'modelName' in responseData && (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-fuchsia-100 text-fuchsia-800 px-2 py-1 rounded-full font-semibold">
                  {responseData.modelName || usedModel}
                </span>
                {responseData.isDemo ? (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                    Demo
                  </span>
                ) : (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                    Live ⚡
                  </span>
                )}
              </div>
            )}
          </div>
          <p className="whitespace-pre-line text-blue-900 text-lg">
            {answer}
          </p>
          {responseData && 'isDemo' in responseData && responseData.isDemo && (
            <div className="mt-3 pt-3 border-t border-fuchsia-200">
              <p className="text-xs text-yellow-700">
                ℹ️ This is a demo response. For full live functionality, ensure your Groq API key is properly configured.
              </p>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="w-full max-w-xl text-red-600 font-bold mb-4 bg-red-50 border-2 border-red-300 rounded-lg p-3">
          {error}
        </div>
      )}
      
      <footer className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400 pt-8">
        Powered by{" "}
        <span className="font-bold text-fuchsia-500">Next.js</span>,{" "}
        <span className="font-bold text-yellow-500">Tailwind CSS</span>, and{" "}
        <span className="font-bold text-cyan-500">Groq API</span>
        <br />
        <span className="italic">
          Lightning-fast inference with free access to premium AI models. No robots were harmed in the making of this app. 🤡
        </span>
        <br />
        <a 
          href="https://console.groq.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-fuchsia-600 hover:text-fuchsia-800 underline"
        >
          Get your free Groq API key
        </a>
      </footer>
    </main>
  );
}
