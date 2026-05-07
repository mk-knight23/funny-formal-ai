<div align="center">

# 🤖 AI-VIBE-CHAT-V3

### **The Multi-Agent Formal AI Interface**
*Built with Next.js 15 · React 19 · Multi-Provider LLM Routing · TypeScript*

[![Next.js](https://img.shields.io/badge/Next.js-15.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**[🚀 Live Demo](https://ai-vibe-chat-v3.vercel.app)** · **[📖 Docs](./Docs)** · **[⭐ Star](https://github.com/mk-knight23/AI-VIBE-CHAT-V3)**

</div>

---

## 🎯 What Makes V3 Special?

AI-VIBE-CHAT-V3 is the **agent-powered** entry — a delightfully formal yet witty AI interface that routes messages to the best model automatically, supports **voice input**, **conversation export**, **model comparison**, and a curated **prompt library** — all in a Next.js 15 App Router architecture with React 19 concurrent features.

> **Pillar 1, Iteration 3** — The one with opinions about which model to use.

---

## ✨ Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🧠 **Smart Model Router** | ✅ | Auto-selects best model based on query type |
| 🎭 **Multi-Provider** | ✅ | OpenAI, Groq, Anthropic, Llama 4 |
| 🎙️ **Voice Input** | ✅ | Real-time speech-to-text with waveform |
| 📚 **Prompt Library** | ✅ | 50+ curated system prompts |
| ⚖️ **Model Comparison** | ✅ | Side-by-side response comparison |
| 📤 **Export Dialog** | ✅ | JSON, Markdown, PDF, share link |
| ⚙️ **Settings Panel** | ✅ | Temperature, max tokens, system prompt |
| 🔄 **Streaming** | ✅ | Token-by-token SSE streaming |
| 🛡️ **Error Boundary** | ✅ | Graceful error handling with retry |
| 💀 **Loading Skeletons** | ✅ | Smooth skeleton loaders |

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── ask/route.ts          # Unified streaming API
│   │   └── models/route.ts       # Available models endpoint
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main chat interface
│   └── not-found.tsx             # 404 with AI humor
├── components/
│   ├── ChatInterface.tsx          # Main container with React 19 transitions
│   ├── MessageList.tsx            # Virtualized message list
│   ├── VoiceInput.tsx             # Web Speech API component
│   ├── ModelComparison.tsx        # Side-by-side A/B comparison
│   ├── PromptLibrary.tsx          # Curated prompt browser
│   ├── ExportDialog.tsx           # Multi-format export
│   ├── SettingsDialog.tsx         # Temperature, tokens, persona
│   ├── LoadingSkeleton.tsx        # Animated skeletons
│   └── ErrorBoundary.tsx          # React error boundary
└── lib/
    ├── ai-providers.ts            # Provider interface definitions
    ├── multi-providers.ts         # Smart routing logic
    ├── prompt-library.ts          # 50+ curated prompts
    └── model-router.ts            # Auto-selection algorithm
```

---

## 🧠 Smart Model Routing

The auto-router selects the optimal model based on query analysis:

```typescript
// lib/model-router.ts
export const selectOptimalModel = (query: string): ModelSelection => {
  const tokens = tokenCount(query)
  const isCode = /\bcode\b|function|class|implement|debug/i.test(query)
  const isReasoning = /\bwhy\b|explain|analyze|compare|evaluate/i.test(query)
  const needsSpeed = tokens < 100 && !isReasoning

  if (isCode) return { provider: 'groq', model: 'llama-3.3-70b-versatile' }
  if (isReasoning) return { provider: 'anthropic', model: 'claude-sonnet-4-6' }
  if (needsSpeed) return { provider: 'groq', model: 'llama-3.1-8b-instant' }
  return { provider: 'openai', model: 'gpt-4o' }
}
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/mk-knight23/AI-VIBE-CHAT-V3.git
cd AI-VIBE-CHAT-V3
npm install
cp .env.local.example .env.local
npm run dev  # → http://localhost:3000
```

### Environment Variables

```env
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🌊 Streaming API

```typescript
// app/api/ask/route.ts — Next.js 15 Route Handler
import { StreamingTextResponse } from 'ai'
import { selectOptimalModel } from '@/lib/model-router'

export async function POST(req: Request) {
  const { messages, model: requestedModel } = await req.json()
  const { provider, model } = requestedModel ?? selectOptimalModel(messages.at(-1)?.content)
  
  const stream = await createProviderStream(provider, model, messages)
  return new StreamingTextResponse(stream)
}
```

---

## 📦 Commands

```bash
npm run dev          # Next.js dev with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
npm run test         # Jest + React Testing Library
npm run test:e2e     # Playwright
```

---

<div align="center">

**Built with 🤖 by [Kazi Musharraf](https://mkazi.live)**

*Part of the [AI-VIBE Ecosystem](https://github.com/mk-knight23/AI-VIBE-ECOSYSTEM)*

</div>
