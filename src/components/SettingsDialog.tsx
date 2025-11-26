"use client";

import { useState, useEffect } from "react";
import { PROVIDERS, getStoredApiKeys, saveApiKeys, type APIKeyConfig } from "@/lib/multi-providers";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export function SettingsDialog({ isOpen, onClose, darkMode }: SettingsDialogProps) {
  const [apiKeys, setApiKeys] = useState<APIKeyConfig>({});
  const [activeTab, setActiveTab] = useState('groq');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setApiKeys(getStoredApiKeys());
    }
  }, [isOpen]);

  const handleSave = () => {
    saveApiKeys(apiKeys);
    onClose();
  };

  const handleKeyChange = (provider: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };

  const toggleShowKey = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden ${
        darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            <div>
              <h2 className="text-2xl font-bold">API Settings</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Configure your AI provider API keys
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            aria-label="Close settings"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex overflow-x-auto border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {Object.values(PROVIDERS).map(provider => (
            <button
              key={provider.id}
              onClick={() => setActiveTab(provider.id)}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === provider.id
                  ? darkMode
                    ? 'bg-fuchsia-900/30 text-fuchsia-400 border-b-2 border-fuchsia-400'
                    : 'bg-fuchsia-50 text-fuchsia-700 border-b-2 border-fuchsia-500'
                  : darkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {provider.displayName}
              {provider.free && <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">FREE</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {Object.values(PROVIDERS).map(provider => (
            activeTab === provider.id && (
              <div key={provider.id} className="space-y-4 animate-fadeIn">
                {/* Provider Info */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold">{provider.displayName}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {provider.description}
                      </p>
                    </div>
                    {provider.free ? (
                      <span className="px-3 py-1 text-xs font-bold bg-green-500 text-white rounded-full">
                        FREE
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-bold bg-yellow-500 text-white rounded-full">
                        PAID
                      </span>
                    )}
                  </div>
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm underline ${darkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'} hover:opacity-80`}
                  >
                    {provider.website} →
                  </a>
                </div>

                {/* API Key Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    API Key {provider.requiresApiKey && <span className="text-red-500">*</span>}
                    {apiKeys[provider.id as keyof APIKeyConfig] && (
                      <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                        ✓ Configured
                      </span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type={showKeys[provider.id] ? 'text' : 'password'}
                      value={apiKeys[provider.id as keyof APIKeyConfig] || ''}
                      onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                      placeholder={apiKeys[provider.id as keyof APIKeyConfig] ? 'Using default key' : `Enter your ${provider.displayName} API key`}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <button
                      onClick={() => toggleShowKey(provider.id)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      aria-label="Toggle key visibility"
                    >
                      {showKeys[provider.id] ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {apiKeys[provider.id as keyof APIKeyConfig] ? (
                    <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      ✓ API key is configured and ready to use
                    </p>
                  ) : (
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Get your API key from {provider.website}
                    </p>
                  )}
                </div>

                {/* Available Models */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Available Models ({provider.models.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {provider.models.map(model => (
                      <div
                        key={model.id}
                        className={`p-3 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-700/30 border-gray-600'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{model.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {model.description}
                            </p>
                            {model.contextWindow && (
                              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                Context: {(model.contextWindow / 1000).toFixed(0)}K tokens
                              </p>
                            )}
                          </div>
                          {model.free && (
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full ml-2">
                              FREE
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            API keys are stored locally in your browser
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white hover:scale-105 transition-transform"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
