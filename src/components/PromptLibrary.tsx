"use client";

import { useState } from "react";

interface PromptLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
  darkMode: boolean;
}

interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  icon: string;
}

const PROMPTS: Prompt[] = [
  // Creative Writing
  { id: '1', title: 'Story Generator', prompt: 'Write a creative short story about [topic]. Make it engaging and include vivid descriptions.', category: 'Creative', icon: '✍️' },
  { id: '2', title: 'Poem Creator', prompt: 'Write a beautiful poem about [topic]. Use metaphors and emotional language.', category: 'Creative', icon: '🎭' },
  { id: '3', title: 'Character Development', prompt: 'Create a detailed character profile for a [type] character in a [genre] story.', category: 'Creative', icon: '👤' },
  
  // Coding
  { id: '4', title: 'Code Explainer', prompt: 'Explain this code in simple terms: [paste code here]', category: 'Coding', icon: '💻' },
  { id: '5', title: 'Bug Finder', prompt: 'Find and fix bugs in this code: [paste code here]', category: 'Coding', icon: '🐛' },
  { id: '6', title: 'Code Optimizer', prompt: 'Optimize this code for better performance: [paste code here]', category: 'Coding', icon: '⚡' },
  
  // Learning
  { id: '7', title: 'ELI5 Explainer', prompt: 'Explain [complex topic] like I\'m 5 years old.', category: 'Learning', icon: '🎓' },
  { id: '8', title: 'Study Guide', prompt: 'Create a comprehensive study guide for [topic] with key points and examples.', category: 'Learning', icon: '📚' },
  { id: '9', title: 'Quiz Generator', prompt: 'Create 10 quiz questions about [topic] with answers.', category: 'Learning', icon: '❓' },
  
  // Business
  { id: '10', title: 'Email Writer', prompt: 'Write a professional email about [topic] to [recipient].', category: 'Business', icon: '📧' },
  { id: '11', title: 'Meeting Summary', prompt: 'Summarize this meeting transcript: [paste transcript]', category: 'Business', icon: '📊' },
  { id: '12', title: 'Business Plan', prompt: 'Create a business plan outline for [business idea].', category: 'Business', icon: '💼' },
  
  // Fun
  { id: '13', title: 'Joke Generator', prompt: 'Tell me a funny joke about [topic].', category: 'Fun', icon: '😄' },
  { id: '14', title: 'Riddle Creator', prompt: 'Create a clever riddle about [topic].', category: 'Fun', icon: '🤔' },
  { id: '15', title: 'Fun Facts', prompt: 'Tell me 5 interesting fun facts about [topic].', category: 'Fun', icon: '🎉' },
];

const CATEGORIES = ['All', 'Creative', 'Coding', 'Learning', 'Business', 'Fun'];

export function PromptLibrary({ isOpen, onClose, onSelectPrompt, darkMode }: PromptLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrompts = PROMPTS.filter(prompt => {
    const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectPrompt = (prompt: string) => {
    onSelectPrompt(prompt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className={`w-full max-w-4xl rounded-2xl shadow-2xl my-8 ${
        darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
      }`}>
        <div className="p-6 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">📚 Prompt Library</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Quick-start prompts for common tasks
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

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts..."
            className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-gray-200'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        {/* Categories */}
        <div className={`flex gap-2 p-4 overflow-x-auto border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-fuchsia-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Prompts Grid */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredPrompts.map(prompt => (
              <button
                key={prompt.id}
                onClick={() => handleSelectPrompt(prompt.prompt)}
                className={`p-4 rounded-lg text-left transition-all hover:scale-105 ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{prompt.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{prompt.title}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {prompt.prompt.substring(0, 80)}...
                    </div>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        {prompt.category}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No prompts found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
