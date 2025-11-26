"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SettingsDialog } from "@/components/SettingsDialog";
import { ModelComparison } from "@/components/ModelComparison";
import { VoiceInput } from "@/components/VoiceInput";
import { ExportDialog } from "@/components/ExportDialog";
import { PromptLibrary } from "@/components/PromptLibrary";
import { getAllModels, getStoredApiKeys, type APIKeyConfig } from "@/lib/multi-providers";

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: number;
}

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
  free?: boolean;
  contextWindow?: number;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [selectedModel, setSelectedModel] = useState("groq:llama-3.1-8b-instant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [apiKeys, setApiKeys] = useState<APIKeyConfig>({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load available models and API keys on component mount
  useEffect(() => {
    // Load models from multi-provider system
    const models = getAllModels();
    setAvailableModels(models);
    setSelectedModel(models[0]?.id || 'groq:llama-3.1-8b-instant');
    setLoadingModels(false);

    // Load stored API keys
    setApiKeys(getStoredApiKeys());
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setChatHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, streamingText]);

  // Dark mode detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Copy to clipboard function
  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  // Clear chat history
  const clearHistory = useCallback(() => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      setChatHistory([]);
      localStorage.removeItem('chatHistory');
      setError("");
    }
  }, []);

  // Handle voice transcript
  const handleVoiceTranscript = useCallback((transcript: string) => {
    setQuestion(prev => prev ? `${prev} ${transcript}` : transcript);
    textareaRef.current?.focus();
  }, []);

  // Handle prompt selection
  const handlePromptSelect = useCallback((prompt: string) => {
    setQuestion(prompt);
    textareaRef.current?.focus();
  }, []);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setStreamingText("");

    // Add user message to history
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: Date.now()
    };
    setChatHistory(prev => [...prev, userMessage]);
    
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately
    
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question: currentQuestion, 
          model: selectedModel,
          apiKeys: apiKeys
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
        
        // Simulate streaming effect
        const words = successData.answer.split(' ');
        let currentText = '';
        
        for (let i = 0; i < words.length; i++) {
          currentText += (i > 0 ? ' ' : '') + words[i];
          setStreamingText(currentText);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        setStreamingText("");

        // Add assistant message to history
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: successData.answer,
          model: successData.modelName || successData.model,
          timestamp: Date.now()
        };
        setChatHistory(prev => [...prev, assistantMessage]);
      } else {
        const errorData = data as { error: string; details?: unknown; needsConfig?: boolean };
        setError(errorData.error || "An error occurred.");
        
        // If API key is missing, show settings dialog
        if (errorData.needsConfig) {
          setTimeout(() => setShowSettings(true), 1000);
        }
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  return (
    <main className={`flex flex-col items-center min-h-[80vh] w-full px-2 py-8 transition-colors ${darkMode ? 'bg-gray-900' : ''}`}>
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-fuchsia-600 drop-shadow animate-bounce flex-1">
            Welcome to Funny Formal AI! 🤖
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPromptLibrary(true)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label="Prompt library"
              title="Prompt Library"
            >
              <span className="text-xl">📚</span>
            </button>
            <button
              onClick={() => setShowComparison(true)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label="Compare models"
              title="Model Comparison"
            >
              <span className="text-xl">🔬</span>
            </button>
            {chatHistory.length > 0 && (
              <button
                onClick={() => setShowExport(true)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label="Export chat"
                title="Export Chat"
              >
                <span className="text-xl">💾</span>
              </button>
            )}
            <button
              onClick={() => setShowSettings(true)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label="Open settings"
              title="API Settings"
            >
              <span className="text-xl">⚙️</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
        <p className={`text-lg md:text-xl text-center font-semibold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          Ask anything, get a formal answer... with a twist of fun! 🎉
          <br />
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Powered by {availableModels.length} AI Models from 5 Providers (Many Free!)
          </span>
        </p>
      </div>

      {/* Multi-Provider Status Alert */}
      <div className="w-full max-w-4xl mb-4">
        <div className={`border-2 rounded-lg p-3 ${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-300'}`}>
          <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            <span className="text-lg">🌐</span>
            <div>
              <strong>Multi-Provider Support:</strong> Access models from Groq, OpenRouter, Routeway, MegaLLM, and AgentRouter. 
              Configure API keys in Settings (⚙️) to unlock all models!
            </div>
          </div>
        </div>
      </div>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div className={`w-full max-w-4xl mb-4 rounded-xl p-4 max-h-96 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`font-bold text-lg ${darkMode ? 'text-fuchsia-400' : 'text-fuchsia-700'}`}>
              Chat History
            </h2>
            <button
              onClick={clearHistory}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${darkMode ? 'bg-red-900/50 text-red-300 hover:bg-red-900' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
              aria-label="Clear chat history"
            >
              Clear
            </button>
          </div>
          <div className="space-y-3">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? darkMode ? 'bg-blue-900/30 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-400'
                    : darkMode ? 'bg-fuchsia-900/30 border-l-4 border-fuchsia-500' : 'bg-fuchsia-50 border-l-4 border-fuchsia-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {msg.role === 'user' ? '👤 You' : '🤖 AI'}
                      {msg.model && ` • ${msg.model}`}
                    </div>
                    <p className={`whitespace-pre-line ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {msg.content}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      copiedId === msg.id
                        ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-200 text-green-800'
                        : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-label="Copy message"
                  >
                    {copiedId === msg.id ? '✓' : '📋'}
                  </button>
                </div>
              </div>
            ))}
            {streamingText && (
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-fuchsia-900/30 border-l-4 border-fuchsia-500' : 'bg-fuchsia-50 border-l-4 border-fuchsia-400'}`}>
                <div className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  🤖 AI • Typing...
                </div>
                <p className={`whitespace-pre-line ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {streamingText}
                  <span className="animate-pulse">▋</span>
                </p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}
      
      <form
        onSubmit={handleAsk}
        className={`w-full max-w-4xl flex flex-col gap-4 mb-6 rounded-xl shadow-lg p-6 border-4 border-dashed ${
          darkMode ? 'bg-gray-800 border-yellow-600' : 'bg-white/80 border-yellow-300'
        }`}
      >
        {/* Model Selection Dropdown */}
        <div className="space-y-2">
          <label className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Select AI Model:
          </label>
          {loadingModels ? (
            <div className={`w-full p-3 rounded border-2 text-sm animate-pulse ${
              darkMode ? 'border-fuchsia-600 bg-gray-700 text-gray-400' : 'border-fuchsia-300 bg-gray-100 text-gray-500'
            }`}>
              Loading models...
            </div>
          ) : (
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={loading}
              className={`w-full p-3 rounded border-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-sm transition-colors ${
                darkMode 
                  ? 'border-fuchsia-600 bg-gray-700 text-gray-200' 
                  : 'border-fuchsia-300 bg-yellow-50 text-gray-900'
              }`}
              aria-label="Select AI model"
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.free && '🆓 '}{model.name} - {model.description}
                </option>
              ))}
            </select>
          )}
        </div>

        <textarea
          ref={textareaRef}
          className={`p-3 rounded border-2 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-lg font-mono transition-colors ${
            darkMode 
              ? 'border-fuchsia-600 bg-gray-700 text-gray-200 placeholder-gray-500' 
              : 'border-fuchsia-300 bg-yellow-50 text-gray-900 placeholder-gray-600'
          }`}
          placeholder="Type your most burning question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleAsk(e);
            }
          }}
          disabled={loading}
          required
          aria-label="Question input"
        />
        <div className="flex gap-2">
          <VoiceInput onTranscript={handleVoiceTranscript} darkMode={darkMode} />
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-400 text-white font-bold py-3 px-6 rounded-full shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            disabled={loading || !question.trim()}
            aria-label="Submit question"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🧠</span>
                The AI is thinking...
              </span>
            ) : (
              "Ask the AI!"
            )}
          </button>
          {question && (
            <button
              type="button"
              onClick={() => setQuestion("")}
              className={`px-4 py-3 rounded-full font-bold transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Clear input"
            >
              ✕
            </button>
          )}
        </div>
      </form>
      
      {error && (
        <div className={`w-full max-w-4xl font-bold mb-4 border-2 rounded-lg p-3 ${
          darkMode ? 'text-red-300 bg-red-900/30 border-red-700' : 'text-red-600 bg-red-50 border-red-300'
        }`} role="alert">
          ⚠️ {error}
        </div>
      )}
      
      <footer className={`mt-10 text-center text-xs pt-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Powered by{" "}
        <span className="font-bold text-fuchsia-500">Next.js 15</span>,{" "}
        <span className="font-bold text-yellow-500">Tailwind CSS 4</span>,{" "}
        <span className="font-bold text-cyan-500">React 19</span>
        <br />
        <span className="font-bold text-green-500">Multi-Provider AI</span>:{" "}
        Groq • OpenRouter • Routeway • MegaLLM • AgentRouter
        <br />
        <span className="italic">
          Access 30+ AI models from 5 providers. Many free options available! No robots were harmed. 🤡
        </span>
      </footer>

      {/* Dialogs */}
      <SettingsDialog 
        isOpen={showSettings} 
        onClose={() => {
          setShowSettings(false);
          setApiKeys(getStoredApiKeys());
        }} 
        darkMode={darkMode}
      />
      
      <ModelComparison
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        availableModels={availableModels}
        darkMode={darkMode}
      />

      <ExportDialog
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        chatHistory={chatHistory}
        darkMode={darkMode}
      />

      <PromptLibrary
        isOpen={showPromptLibrary}
        onClose={() => setShowPromptLibrary(false)}
        onSelectPrompt={handlePromptSelect}
        darkMode={darkMode}
      />
    </main>
  );
}
