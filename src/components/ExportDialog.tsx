"use client";

import { ChatMessage } from "@/app/page";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatMessage[];
  darkMode: boolean;
}

export function ExportDialog({ isOpen, onClose, chatHistory, darkMode }: ExportDialogProps) {
  const exportAsJSON = () => {
    const dataStr = JSON.stringify(chatHistory, null, 2);
    downloadFile(dataStr, 'chat-history.json', 'application/json');
  };

  const exportAsMarkdown = () => {
    let markdown = '# Chat History\n\n';
    markdown += `*Exported: ${new Date().toLocaleString()}*\n\n---\n\n`;
    
    chatHistory.forEach((msg, index) => {
      const role = msg.role === 'user' ? '👤 You' : '🤖 AI';
      const model = msg.model ? ` (${msg.model})` : '';
      markdown += `## ${role}${model}\n\n`;
      markdown += `${msg.content}\n\n`;
      if (index < chatHistory.length - 1) markdown += '---\n\n';
    });
    
    downloadFile(markdown, 'chat-history.md', 'text/markdown');
  };

  const exportAsText = () => {
    let text = 'CHAT HISTORY\n';
    text += `Exported: ${new Date().toLocaleString()}\n`;
    text += '='.repeat(50) + '\n\n';
    
    chatHistory.forEach((msg) => {
      const role = msg.role === 'user' ? 'YOU' : 'AI';
      const model = msg.model ? ` [${msg.model}]` : '';
      text += `${role}${model}:\n`;
      text += `${msg.content}\n\n`;
      text += '-'.repeat(50) + '\n\n';
    });
    
    downloadFile(text, 'chat-history.txt', 'text/plain');
  };

  const exportAsHTML = () => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat History</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f5f5f5; }
    .message { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .user { border-left: 4px solid #3b82f6; }
    .assistant { border-left: 4px solid #a855f7; }
    .role { font-weight: bold; color: #333; margin-bottom: 10px; }
    .model { font-size: 12px; color: #666; }
    .content { line-height: 1.6; white-space: pre-wrap; }
    .header { text-align: center; margin-bottom: 40px; }
    .timestamp { color: #999; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🤖 Chat History</h1>
    <p class="timestamp">Exported: ${new Date().toLocaleString()}</p>
  </div>
`;
    
    chatHistory.forEach((msg) => {
      const roleClass = msg.role === 'user' ? 'user' : 'assistant';
      const roleText = msg.role === 'user' ? '👤 You' : '🤖 AI';
      const modelText = msg.model ? `<span class="model">${msg.model}</span>` : '';
      
      html += `
  <div class="message ${roleClass}">
    <div class="role">${roleText} ${modelText}</div>
    <div class="content">${escapeHtml(msg.content)}</div>
  </div>`;
    });
    
    html += `
</body>
</html>`;
    
    downloadFile(html, 'chat-history.html', 'text/html');
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
        darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
      }`}>
        <div className="p-6 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Export Chat History</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {chatHistory.length} messages
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

        <div className="p-6 space-y-3">
          <button
            onClick={exportAsMarkdown}
            className={`w-full p-4 rounded-lg text-left transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <div className="font-semibold">Markdown (.md)</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Perfect for documentation
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={exportAsHTML}
            className={`w-full p-4 rounded-lg text-left transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <div>
                <div className="font-semibold">HTML (.html)</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  View in any browser
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={exportAsJSON}
            className={`w-full p-4 rounded-lg text-left transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-semibold">JSON (.json)</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  For developers & data analysis
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={exportAsText}
            className={`w-full p-4 rounded-lg text-left transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <div>
                <div className="font-semibold">Plain Text (.txt)</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Simple and universal
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
          <p className={`text-xs text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your chat history will be downloaded to your device
          </p>
        </div>
      </div>
    </div>
  );
}
