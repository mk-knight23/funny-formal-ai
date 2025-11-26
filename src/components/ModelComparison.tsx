"use client";

import { useState } from "react";
import { AIModel, getStoredApiKeys } from "@/lib/multi-providers";

interface ModelComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  availableModels: AIModel[];
  darkMode: boolean;
}

interface ComparisonResult {
  modelId: string;
  modelName: string;
  response: string;
  time: number;
  error?: string;
}

export function ModelComparison({ isOpen, onClose, availableModels, darkMode }: ModelComparisonProps) {
  const [question, setQuestion] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleModel = (modelId: string) => {
    setSelectedModels(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : prev.length < 4
          ? [...prev, modelId]
          : prev
    );
  };

  const runComparison = async () => {
    if (!question.trim() || selectedModels.length === 0) return;

    setLoading(true);
    setResults([]);
    const apiKeys = getStoredApiKeys();

    const promises = selectedModels.map(async (modelId) => {
      const model = availableModels.find(m => m.id === modelId);
      const startTime = Date.now();

      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question,
            model: modelId,
            apiKeys
          })
        });

        const data = await res.json();
        const time = Date.now() - startTime;

        return {
          modelId,
          modelName: model?.name || modelId,
          response: data.answer || data.error,
          time,
          error: res.ok ? undefined : data.error
        };
      } catch (error) {
        return {
          modelId,
          modelName: model?.name || modelId,
          response: '',
          time: Date.now() - startTime,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });

    const comparisonResults = await Promise.all(promises);
    setResults(comparisonResults);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className={`w-full max-w-6xl rounded-2xl shadow-2xl my-8 ${
        darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
      }`}>
        <div className="p-6 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">🔬 Model Comparison</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Compare up to 4 models side-by-side
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              aria-label="Close"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Question Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a question to compare models..."
              className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              rows={3}
            />
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Select Models ({selectedModels.length}/4)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2">
              {availableModels.slice(0, 12).map((model) => (
                <button
                  key={model.id}
                  onClick={() => toggleModel(model.id)}
                  disabled={!selectedModels.includes(model.id) && selectedModels.length >= 4}
                  className={`p-3 rounded-lg text-left text-sm transition-colors ${
                    selectedModels.includes(model.id)
                      ? 'bg-fuchsia-500 text-white'
                      : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="font-semibold truncate">{model.name}</div>
                  {model.free && <span className="text-xs">🆓 Free</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Run Button */}
          <button
            onClick={runComparison}
            disabled={loading || !question.trim() || selectedModels.length === 0}
            className="w-full py-3 px-6 rounded-lg font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Comparing...' : '🚀 Run Comparison'}
          </button>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-bold">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result) => (
                  <div
                    key={result.modelId}
                    className={`p-4 rounded-lg border-2 ${
                      result.error
                        ? darkMode
                          ? 'border-red-700 bg-red-900/20'
                          : 'border-red-300 bg-red-50'
                        : darkMode
                          ? 'border-gray-600 bg-gray-700'
                          : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-sm">{result.modelName}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        {result.time}ms
                      </div>
                    </div>
                    {result.error ? (
                      <p className="text-sm text-red-500">❌ {result.error}</p>
                    ) : (
                      <p className={`text-sm whitespace-pre-wrap max-h-48 overflow-y-auto ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {result.response}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Winner */}
              {results.filter(r => !r.error).length > 0 && (
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-green-900/30 border-2 border-green-700' : 'bg-green-50 border-2 border-green-300'
                }`}>
                  <div className="font-bold text-green-600 dark:text-green-400 mb-2">
                    ⚡ Fastest: {results.filter(r => !r.error).sort((a, b) => a.time - b.time)[0]?.modelName}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Response time: {results.filter(r => !r.error).sort((a, b) => a.time - b.time)[0]?.time}ms
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
